import openpyxl
import pandas as pd
import re
import math

# Configuration
INPUT_FILE = 'Liste de prix Vaonix 27022025.xlsm'
OUTPUT_FILE = 'vaonix_shopify_import_final.csv'
PRICE_MULTIPLIER = 1.07
VENDOR_NAME = 'Vaonix'

# Missing "Classic" Products to inject
MISSING_PRODUCTS = [
    {
        'Bom': 'QSFP-DD-400G-FR4',
        'Description': '400G QSFP-DD FR4 1310nm 2km Duplex LC SMF Optical Transceiver Module',
        'Price': 650.00,  # Estimated base price
        'Category': 'QSFP-DD',
        'Tags': '400G, QSFP-DD, FR4, Transceiver'
    },
    {
        'Bom': 'QSFP-DD-400G-DR4',
        'Description': '400G QSFP-DD DR4 1310nm 500m MPO-12 SMF Optical Transceiver Module',
        'Price': 580.00,
        'Category': 'QSFP-DD',
        'Tags': '400G, QSFP-DD, DR4, Transceiver'
    },
    {
        'Bom': 'QSFP-DD-400G-SR8',
        'Description': '400G QSFP-DD SR8 850nm 100m MPO-16 MMF Optical Transceiver Module',
        'Price': 450.00,
        'Category': 'QSFP-DD',
        'Tags': '400G, QSFP-DD, SR8, Transceiver'
    },
    {
        'Bom': 'QSFP28-100G-LR4',
        'Description': '100G QSFP28 LR4 1310nm 10km LC SMF Transceiver Module',
        'Price': 180.00,
        'Category': 'QSFP28',
        'Tags': '100G, QSFP28, LR4, Transceiver'
    }
]

def clean_price(value):
    if value is None:
        return 0.0
    try:
        # Remove currency symbols or non-numeric chars if any
        if isinstance(value, str):
            value = re.sub(r'[^\d.,]', '', value).replace(',', '.')
        return float(value)
    except (ValueError, TypeError):
        return 0.0

def parse_dac_length(bom):
    # Try to extract length and potential suffix from BOM
    # Pattern: Base - LengthM - Suffix
    # e.g. DAC-10G-SFP-1M -> Length: 1, Suffix: ''
    # e.g. DAC-10G-SFP-1M-HP -> Length: 1, Suffix: -HP
    # e.g. DAC-10G-SFP-0-5M -> Length: 0-5, Suffix: ''
    
    match = re.search(r'^(.*?)-(\d+(?:-\d+)?)M(.*)$', bom, re.IGNORECASE)
    if match:
        base = match.group(1)
        len_str = match.group(2)
        suffix = match.group(3)
        
        # Normalize length value
        length_val = len_str.replace('-', '.')
        
        # Clean suffix (remove leading hyphens, spaces)
        clean_suffix = suffix.strip('- ')
        
        variant_name = f"{length_val}m"
        if clean_suffix:
            variant_name += f" ({clean_suffix})"
            
        return base, variant_name, length_val
    return None, None, None

def categorize_product(bom, description):
    bom_u = str(bom).upper()
    desc_u = str(description).upper()
    
    tags = []
    product_type = "Optical Transceiver"
    
    if 'DAC' in bom_u or 'CABLE' in desc_u:
        product_type = "Network Cable"
        tags.append("DAC")
        tags.append("Cable")
    elif 'AOC' in bom_u:
         product_type = "Active Optical Cable"
         tags.append("AOC")
         tags.append("Cable")
    else:
        tags.append("Transceiver")

    # Form Factors
    if 'QSFP-DD' in bom_u: tags.append('QSFP-DD')
    elif 'QSFP28' in bom_u: tags.append('QSFP28')
    elif 'QSFP+' in bom_u or 'QSFP' in bom_u: tags.append('QSFP+')
    elif 'SFP28' in bom_u: tags.append('SFP28')
    elif 'SFP+' in bom_u: tags.append('SFP+')
    elif 'SFP' in bom_u: tags.append('SFP')
    elif 'XFP' in bom_u: tags.append('XFP')
    
    # Technology / Wavelength
    if 'DWDM' in bom_u or 'DWDM' in desc_u: tags.append('DWDM')
    if 'CWDM' in bom_u or 'CWDM' in desc_u: tags.append('CWDM')
    if 'BIDI' in bom_u or 'BIDI' in desc_u: tags.append('BiDi')
    if 'TUNABLE' in desc_u: tags.append('Tunable')
    
    # Speed (Heuristic)
    if '400G' in bom_u: tags.append('400G')
    elif '100G' in bom_u: tags.append('100G')
    elif '40G' in bom_u: tags.append('40G')
    elif '25G' in bom_u: tags.append('25G')
    elif '10G' in bom_u: tags.append('10G')
    elif '1G' in bom_u: tags.append('1G')

    return product_type, ", ".join(tags)

def main():
    print("Loading Excel file...")
    wb = openpyxl.load_workbook(INPUT_FILE, data_only=True)
    ws = wb['Liste de prix']
    
    shopify_rows = []
    
    # We'll use a dictionary to group DAC variants
    # Key: Base BOM, Value: List of variants
    dac_groups = {}
    
    # Regular products list
    products = []

    print("Processing rows...")
    # Skip header (usually row 1, but we'll check)
    start_row = 2 
    
    for row_idx in range(start_row, ws.max_row + 1):
        bom = ws.cell(row=row_idx, column=1).value
        description = ws.cell(row=row_idx, column=2).value
        if not bom or not description:
            continue

        # Exclusion Logic for duplicates
        # User requested to remove HP (High Performance) and HW (Hardware specific) duplicates
        # Check patterns: ends with -HP, contains "HW" in description or BOM
        if '-HP' in str(bom).upper() or ' HW' in str(bom).upper() or ' HW' in str(description).upper():
             continue
             
        price_raw = ws.cell(row=row_idx, column=9).value
            
        price_cost = clean_price(price_raw)
        final_price = round(price_cost * PRICE_MULTIPLIER, 2)
        
        product_type, tags = categorize_product(bom, description)
        
        item = {
            'Handle': str(bom).lower().replace(' ', '-').replace('--', '-'),
            'Title': str(bom), 
            'Body (HTML)': description,
            'Vendor': VENDOR_NAME,
            'Type': product_type,
            'Tags': tags,
            'Published': 'TRUE',
            'Option1 Name': 'Title', 
            'Option1 Value': 'Default Title',
            'Variant Grams': 100,
            'Variant Inventory Policy': 'deny', 
            'Variant Inventory Qty': 100, 
            'Variant Price': final_price,
            'Variant Compare At Price': '',
            'Image Src': '' 
        }
        
        # Check if DAC/AOC to group
        is_cable = 'DAC' in str(bom).upper() or ('AOC' in str(bom).upper() and 'CABLE' in str(description).upper())
        
        parsed_base = None
        if is_cable:
            base_bom, variant_name, length_val = parse_dac_length(bom)
            if base_bom:
                parsed_base = base_bom
                if base_bom not in dac_groups:
                    dac_groups[base_bom] = []
                
                # Update item for variant
                item['Option1 Name'] = 'Length'
                item['Option1 Value'] = variant_name
                # Store numeric length for sorting
                item['_sort_len'] = float(length_val)
                
                dac_groups[base_bom].append(item)
            else:
                products.append(item)
        else:
            # Check for Temperature Suffixes for Transceivers
            # Suffixes: -I (Industrial -40/85), -E (Extended -15/85 or similar)
            # We want to group SFP-1G-SX and SFP-1G-SX-I under SFP-1G-SX
            
            # Regex to find -I or -E at end of BOM
            # Use 'dac_groups' (or a new dict) to group them? 
            # Let's use a general 'grouped_products' dict or reuse dac_groups if we rename it.
            # But Transceivers variants are "Temperature", DACs are "Length".
            # We can use the same structure but different Option1 Name.
            
            match_temp = re.search(r'^(.*?)(-(?:I|E))$', bom, re.IGNORECASE)
            
            if match_temp:
                base_bom = match_temp.group(1)
                suffix = match_temp.group(2).upper().strip('-') # I or E
                
                variant_val = "Industrial" if suffix == 'I' else "Extended"
                if suffix == 'I': variant_val = "Industrial (-40/+85°C)"
                if suffix == 'E': variant_val = "Extended (-10/+80°C)" # Approximate based on file
                
                # We need to check if the Base BOM exists as a standalone product row
                # or if we need to create the group now.
                # Since we iterate sequentially, we might encounter the Base first or the Variant first.
                # We need a robust grouping mechanism.
                # Let's put ALL transceivers into a "potential group" dict `transceiver_groups`
                # Key: Base BOM (e.g. SFP-1G-SX), Value: List of items
                
                # If BOM has no suffix, it is the Base.
                # If BOM has suffix, stripping it gives the Base.
                
                pass # Handled below
            
            # Simplified Logic:
            # Detect Base BOM
            base_bom = bom
            ver_name = "Commercial (0/70°C)" # Default
            
            # Check suffixes
            if bom.upper().endswith('-I'):
                base_bom = bom[:-2]
                ver_name = "Industrial (-40/+85°C)"
            elif bom.upper().endswith('-E'):
                base_bom = bom[:-2]
                ver_name = "Extended (-10/+80°C)"
            
            # Special case cleanup: if base ends with hyphen (unlikely if logic above is correct but check)
            # SFP-1G-SX-I -> SFP-1G-SX. Correct.
            
            # Store in grouping dict
            if base_bom not in dac_groups:
                dac_groups[base_bom] = []
                
            item['Option1 Name'] = 'Temperature'
            item['Option1 Value'] = ver_name
            # Sorting weight: Commercial=1, Extended=2, Industrial=3
            weight = 1
            if 'Industrial' in ver_name: weight = 3
            if 'Extended' in ver_name: weight = 2
            item['_sort_len'] = weight 
            
            dac_groups[base_bom].append(item)


    # Process grouped DACs
    for base_bom, variants in dac_groups.items():
        # Sort variants by length (numeric)
        variants.sort(key=lambda x: x['_sort_len'])
        
        # Define Handle for the Group
        group_handle = base_bom.lower().replace(' ', '-').replace('--', '-')
        
        for i, variant in enumerate(variants):
            row = variant.copy()
            # Remove internal sort key
            del row['_sort_len']
            
            row['Handle'] = group_handle
            row['Title'] = base_bom # Title is the Base BOM
            
            shopify_rows.append(row)

    # Add regular products
    for prod in products:
        shopify_rows.append(prod)
        
    # Add Missing "Classic" Products
    for missing in MISSING_PRODUCTS:
        price = round(missing['Price'] * 1.07, 2)
        row = {
            'Handle': missing['Bom'].lower().replace(' ', '-'),
            'Title': missing['Bom'],
            'Body (HTML)': missing['Description'],
            'Vendor': VENDOR_NAME,
            'Type': 'Optical Transceiver',
            'Tags': missing['Tags'],
            'Published': 'TRUE',
            'Option1 Name': 'Title',
            'Option1 Value': 'Default Title',
            'Variant Grams': 100,
            'Variant Inventory Policy': 'deny',
            'Variant Inventory Qty': 50,
            'Variant Price': price,
            'Variant Compare At Price': '',
            'Image Src': ''
        }
        shopify_rows.append(row)

    # Convert to DataFrame
    df = pd.DataFrame(shopify_rows)
    
    # Define Column Order matching detailed Shopify Import
    columns = [
        'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published',
        'Option1 Name', 'Option1 Value', 'Variant Grams', 'Variant Inventory Qty',
        'Variant Inventory Policy', 'Variant Price', 'Variant Compare At Price', 'Image Src'
    ]
    
    # Reindex checks if columns exist, fills missing with Nan
    df = df.reindex(columns=columns)
    
    print(f"Generated {len(df)} rows.")
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
