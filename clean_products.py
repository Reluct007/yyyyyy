#!/usr/bin/env python3
"""
Clean product.js file by removing entries with invalid images
"""
import json
import re

def is_invalid_image(image_path):
    """Check if an image path is invalid (Amazon-style filenames or invalid format)"""
    if not image_path:
        return True
    
    # Check for Amazon-style filenames
    invalid_patterns = [
        r'\.SS40_BG85',
        r'\._SX38_SY50_CR',
        r'\.SX38_SY50_CR',
        r'^/product/\d+$',  # Just numbers like /product/0, /product/38
        r'^/product/85$',
        r'_BR-120_PKdp-play-icon-overlay__',
    ]
    
    for pattern in invalid_patterns:
        if re.search(pattern, image_path):
            return True
    
    # Check if it's just a number or very short invalid name
    filename = image_path.split('/')[-1]
    if filename.isdigit() or len(filename) < 3:
        return True
    
    return False

def clean_product_entry(product):
    """Clean a single product entry by removing invalid images"""
    if not product:
        return None
    
    # Check main image
    if 'image' in product and is_invalid_image(product['image']):
        return None  # Remove entire product if main image is invalid
    
    # Clean images array
    if 'images' in product and isinstance(product['images'], list):
        product['images'] = [img for img in product['images'] if not is_invalid_image(img)]
        # If no valid images left, remove the product
        if not product['images']:
            return None
    
    # Clean image_names array
    if 'image_names' in product and isinstance(product['image_names'], list):
        product['image_names'] = [img for img in product['image_names'] if not is_invalid_image(img)]
    
    # Check if title is valid
    if not product.get('title') or len(product.get('title', '')) < 3:
        return None
    
    return product

def main():
    input_file = '/Users/darling/Downloads/Automation Project/PANDING/data/product.js'
    output_file = '/Users/darling/Downloads/Automation Project/PANDING/data/product_cleaned.js'
    backup_file = '/Users/darling/Downloads/Automation Project/PANDING/data/product.backup.js'
    
    print(f"Reading {input_file}...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Backup original file
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Backup created: {backup_file}")
    
    # Extract the array content
    match = re.search(r'export const product = (\[[\s\S]*\]);', content)
    if not match:
        print("Error: Could not find product array in file")
        return
    
    array_content = match.group(1)
    
    # Parse JSON (we need to handle JavaScript object syntax)
    # Convert JavaScript object notation to JSON
    json_content = array_content
    # Fix unquoted keys
    json_content = re.sub(r'(\w+):', r'"\1":', json_content)
    # Fix trailing commas
    json_content = re.sub(r',(\s*[}\]])', r'\1', json_content)
    
    try:
        products = json.loads(json_content)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        print("Trying alternative parsing method...")
        # If JSON parsing fails, we'll need to use a different approach
        return
    
    print(f"Found {len(products)} products")
    
    # Clean products
    cleaned_products = []
    removed_count = 0
    
    for product in products:
        cleaned = clean_product_entry(product)
        if cleaned:
            cleaned_products.append(cleaned)
        else:
            removed_count += 1
            if 'title' in product:
                print(f"Removed: {product['title']}")
    
    print(f"\nCleaning complete:")
    print(f"  Original products: {len(products)}")
    print(f"  Cleaned products: {len(cleaned_products)}")
    print(f"  Removed products: {removed_count}")
    
    # Write cleaned data
    output_content = f"export const product = {json.dumps(cleaned_products, indent=2, ensure_ascii=False)};"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(output_content)
    
    print(f"\nCleaned data written to: {output_file}")
    print("\nPlease review the cleaned file and then:")
    print(f"  mv {output_file} {input_file}")

if __name__ == '__main__':
    main()
