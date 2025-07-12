import json
from typing import List
import os

def get_exercises(filename="../data/exercises.json") -> List[str]:
    """Load exercises from a JSON file and return them as a list."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    text_path = os.path.join(base_dir, '../data/exercises.json')
    try:
        with open(text_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading exercises: {e}")
        return []