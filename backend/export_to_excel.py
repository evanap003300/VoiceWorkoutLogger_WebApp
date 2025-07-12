import json
import pandas as pd
from datetime import datetime
import os

def export_workout_to_excel():
    # Read the JSON data
    base_dir = os.path.dirname(os.path.abspath(__file__))
    text_path = os.path.join(base_dir, '../data/workout_data.json')
    # json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'workout_data.json')
    with open(text_path, 'r') as f:
        workout_data = json.load(f)

    # Create lists to store flattened data
    rows = []
    
    for exercise_entry in (workout_data):
        exercise_name = exercise_entry['exercise']
        
        # If no sets, add a single row with just the exercise name
        if not exercise_entry['sets']:
            rows.append({
                'Exercise': exercise_name,
                'Set #': '',
                'Reps': '',
                'Weight': ''
            })
            continue
            
        # Add a row for each set
        for set_idx, set_data in enumerate(exercise_entry['sets'], 1):
            rows.append({
                'Exercise': exercise_name,
                'Set #': set_idx,
                'Reps': set_data['reps'],
                'Weight': f"{set_data['weight']}"  # Assuming weight is in pounds
            })
    
    # Create DataFrame
    df = pd.DataFrame(rows)
    
    # Create Excel writer with datetime in filename
    # timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    # output_path = os.path.join(os.path.dirname(__file__), '..', 'output', f'workout_log_{timestamp}.xlsx')
    output_path = os.path.join(os.path.dirname(__file__), '..', 'output', 'latest_workout_log.xlsx')
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Create a writer object
    with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
        # Write the DataFrame
        df.to_excel(writer, sheet_name='Workout Log', index=False)
        
        # Get the workbook and the worksheet
        workbook = writer.book
        worksheet = writer.sheets['Workout Log']
        
        # Auto-adjust columns width
        for column in worksheet.columns:
            max_length = 0
            column = [cell for cell in column]
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = (max_length + 2)
            worksheet.column_dimensions[column[0].column_letter].width = adjusted_width

    return output_path

if __name__ == "__main__":
    output_file = export_workout_to_excel()
    print(f"Excel file created successfully at: {output_file}")
