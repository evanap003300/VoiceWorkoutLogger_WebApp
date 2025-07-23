import spacy
from spacy.matcher import Matcher, PhraseMatcher
from word2number import w2n
import os
import sys
import re
sys.path.append('..')
from loading_exercises import get_exercises

nlp = spacy.load("en_core_web_sm")

# Load exercise names
exercise_terms = get_exercises("data/exercises.json") # old path: ../data/exercises.json
exercise_variations = []
for term in exercise_terms:
    term = term.lower()
    exercise_variations.append(term)
    if ' ' not in term and not term.endswith('s'):
        exercise_variations.append(term + 's')

# Matchers
matcher = Matcher(nlp.vocab)
exercise_matcher = PhraseMatcher(nlp.vocab, attr="LOWER")

# Patterns for sets
pattern_sets = [
    [{"LIKE_NUM": True}, {"IS_PUNCT": False, "OP": "*"}, {"LOWER": {"IN": ["set", "sets"]}}],
    [{"LOWER": {"IN": ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]}}, 
     {"IS_PUNCT": False, "OP": "*"}, {"LOWER": {"IN": ["set", "sets"]}}]
]

# Patterns for weight and reps
pattern_weight_reps = [
    [{"LIKE_NUM": True}, {"IS_PUNCT": False, "OP": "*"}, {"LOWER": {"IN": ["for", "or"]}}, {"IS_PUNCT": False, "OP": "*"}, {"LIKE_NUM": True}],
    [{"LIKE_NUM": True}, {"IS_PUNCT": False, "OP": "*"}, {"LOWER": {"IN": ["pounds", "lbs"]}}, 
     {"IS_PUNCT": False, "OP": "*"}, {"LOWER": {"IN": ["for", "or"]}}, {"IS_PUNCT": False, "OP": "*"}, {"LIKE_NUM": True}]
]

# Add patterns to matcher
for p in pattern_sets:
    matcher.add("SETS_PATTERN", [p])
for p in pattern_weight_reps:
    matcher.add("WEIGHT_REPS_PATTERN", [p])

# Exercise matcher
exercise_patterns = [nlp(text) for text in exercise_variations]
exercise_matcher.add("EXERCISE", exercise_patterns)

def extract_number(token):
    """Extract number from token, handling both numeric and word formats."""
    try:
        return int(token.text)
    except ValueError:
        try:
            return w2n.word_to_num(token.text.lower())
        except ValueError:
            return None

def extract_workout_info():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    text_path = os.path.join(base_dir, 'data/text.txt')
    
    try:
        with open(text_path, 'r') as file:
            text = re.sub(r'\s+', ' ', file.read()).strip()
            
        if not text:
            print("Warning: No text found in the transcription file.")
            return [], [], [], []
    except Exception as e:
        print(f"Error reading text file: {e}")
        return [], [], [], []

    doc = nlp(text)
    timeline = []

    # Find exercises
    for match_id, start, end in exercise_matcher(doc):
        span = doc[start:end]
        timeline.append((start, "EXERCISE", span.text.lower()))

    # Find sets, weights, and reps
    for match_id, start, end in matcher(doc):
        label = nlp.vocab.strings[match_id]
        span = doc[start:end]

        if label == "SETS_PATTERN":
            num = extract_number(span[0])
            if num:
                timeline.append((start, "SETS_PATTERN", num))

        elif label == "WEIGHT_REPS_PATTERN":
            # Handle "X for Y" pattern
            weight = extract_number(span[0])
            reps = extract_number(span[-1])
            
            if weight and reps:
                timeline.append((start, "WEIGHT_PATTERN", weight))
                timeline.append((start, "REPS_PATTERN", reps))

    # Sort timeline
    timeline.sort(key=lambda x: x[0])

    # Reconstruct final lists
    exercise_list = []
    sets_list = []
    reps_list = []
    weight_list = []

    for _, label, value in timeline:
        if label == "EXERCISE":
            exercise_list.append(value)
        elif label == "SETS_PATTERN":
            sets_list.append(value)
        elif label == "REPS_PATTERN":
            reps_list.append(value)
        elif label == "WEIGHT_PATTERN":
            weight_list.append(value)

    return exercise_list, sets_list, reps_list, weight_list

# Testing
if __name__ == "__main__":
    e, s, r, w = extract_workout_info()
    print("Exercises:", e)
    print("Sets:", s)
    print("Reps:", r)
    print("Weights:", w)
