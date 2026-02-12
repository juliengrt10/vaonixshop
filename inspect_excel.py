
import pandas as pd
import os

files = [
    "Liste de prix Vaonix 27022025.xlsm",
    "boms-selling-prices-20260115-163935.xlsx"
]

for file in files:
    if os.path.exists(file):
        print(f"--- Inspecting {file} ---")
        try:
            xl = pd.ExcelFile(file)
            print(f"Sheets: {xl.sheet_names}")
            
            # Read first sheet briefly to see columns
            for sheet in xl.sheet_names:
                print(f"\nSheet: {sheet}")
                df = pd.read_excel(file, sheet_name=sheet, nrows=3)
                print(df.columns.tolist())
                print(df.head(2))
        except Exception as e:
            print(f"Error reading {file}: {e}")
    else:
        print(f"File {file} not found")
