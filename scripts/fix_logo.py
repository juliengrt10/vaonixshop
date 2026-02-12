from PIL import Image
import os

def remove_white_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Saved transparent image to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

input_file = r"C:\Users\GUER_JUL\.gemini\antigravity\brain\d1e1bc3d-2bfb-4cf4-9306-e0255e2aa7c3\uploaded_media_1770131039388.png"
output_file = r"c:\VAONIXSHOP\public\images\vaonix-logo-transparent.png"

remove_white_background(input_file, output_file)
