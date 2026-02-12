from PIL import Image, ImageDraw
import os

# Paths
base_dir = r"c:\VAONIXSHOP\public\images"
products_dir = os.path.join(base_dir, "products")
logo_path = os.path.join(base_dir, "vaonix-logo.png")

# Load logo
logo = Image.open(logo_path).convert("RGBA")

# Product configurations (image path, label position and transform)
products = [
    {
        "name": "vaonix-sfp.png",
        "base": "sfp-base.png",
        "label": {
            "top": 0.282,
            "left": 0.479,
            "width": 0.359,
            "height": 0.115,
            "rotation": -31.1,
            "skew_x": 28.1
        }
    },
    {
        "name": "vaonix-sfp28.png",
        "base": "sfp-base.png",  # Using same base as SFP
        "label": {
            "top": 0.282,
            "left": 0.479,
            "width": 0.359,
            "height": 0.115,
            "rotation": -31.1,
            "skew_x": 28.1
        }
    },
    {
        "name": "vaonix-qsfp28.png",
        "base": "qsfp-base-purple.png",
        "label": {
            "top": 0.38,
            "left": 0.48,
            "width": 0.28,
            "height": 0.12,
            "rotation": -37,
            "skew_x": 20
        }
    },
    {
        "name": "vaonix-qsfp-dd.png",
        "base": "qsfp-base-purple.png",  # Using same base as QSFP28
        "label": {
            "top": 0.38,
            "left": 0.48,
            "width": 0.28,
            "height": 0.12,
            "rotation": -37,
            "skew_x": 20
        }
    },
    {
        "name": "vaonix-osfp.png",
        "base": "qsfp-base-purple.png",  # Using same base as QSFP
        "label": {
            "top": 0.38,
            "left": 0.48,
            "width": 0.28,
            "height": 0.12,
            "rotation": -37,
            "skew_x": 20
        }
    }
]

def create_label_with_logo(base_img, logo_img, label_config):
    """Create a white label with logo and overlay it on the base image"""
    base = base_img.copy()
    w, h = base.size
    
    # Calculate label dimensions
    label_w = int(w * label_config["width"])
    label_h = int(h * label_config["height"])
    label_x = int(w * label_config["left"])
    label_y = int(h * label_config["top"])
    
    # Create white background for label
    label = Image.new("RGBA", (label_w, label_h), (255, 255, 255, 255))
    
    # Resize logo to fit label (with padding)
    logo_resized = logo_img.copy()
    logo_resized.thumbnail((int(label_w * 0.8), int(label_h * 0.8)), Image.Resampling.LANCZOS)
    
    # Center logo on label
    logo_x = (label_w - logo_resized.width) // 2
    logo_y = (label_h - logo_resized.height) // 2
    label.paste(logo_resized, (logo_x, logo_y), logo_resized)
    
    # Rotate label
    label = label.rotate(label_config["rotation"], expand=True, resample=Image.Resampling.BICUBIC)
    
    # Paste label onto base image
    # Note: Skew transform is complex in PIL, we'll approximate with rotation
    base.paste(label, (label_x, label_y), label)
    
    return base

# Process each product
for product in products:
    print(f"Processing {product['name']}...")
    
    # Load base image
    base_path = os.path.join(products_dir, product["base"])
    base_img = Image.open(base_path).convert("RGBA")
    
    # Create image with logo
    result = create_label_with_logo(base_img, logo, product["label"])
    
    # Save result
    output_path = os.path.join(products_dir, product["name"])
    result.save(output_path, "PNG")
    print(f"  Saved to {output_path}")

print("\nAll images created successfully!")
