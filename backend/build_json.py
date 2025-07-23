from extract_workout_info import extract_workout_info
import json
import os

def build_json():
    # These must now be ordered properly
    exercise_list, sets_list, reps_list, weight_list = extract_workout_info()
    
    workout_log = []
    current_idx = 0  # Pointer into reps and weight lists

    for i, exercise in enumerate(exercise_list):
        exercise_data = {
            "exercise": exercise,
            "sets": []
        }

        # Default to 1 set if none provided
        num_sets = sets_list[i] if i < len(sets_list) else 1

        for _ in range(num_sets):
            if current_idx < len(reps_list) and current_idx < len(weight_list):
                set_data = {
                    "reps": reps_list[current_idx],
                    "weight": weight_list[current_idx]
                }
                exercise_data["sets"].append(set_data)
                current_idx += 1

        workout_log.append(exercise_data)

    # Save the JSON
    #current_dir = os.path.dirname(os.path.abspath(__file__))
    #project_root = os.path.dirname(current_dir)
    #json_path = os.path.join(project_root, 'data', 'workout_data.json')

    # current_dir is already the directory where the current script (e.g., main.py) is located
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # The 'data' folder will now be created directly inside current_dir
    data_dir = os.path.join(current_dir, 'data')
    json_path = os.path.join(data_dir, 'workout_data.json')

    # Ensure the data directory exists
    os.makedirs(data_dir, exist_ok=True)
    
    with open(json_path, 'w') as f:
        json.dump(workout_log, f, indent=2)

    return workout_log
