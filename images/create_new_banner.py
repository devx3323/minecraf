#!/usr/bin/env python3
"""
Create new CraftMiner banner with text overlay
"""
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_gradient_background(width, height, color1, color2, direction='horizontal'):
    """Create a gradient background"""
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    if direction == 'horizontal':
        for x in range(width):
            ratio = x / width
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(x, 0), (x, height)], fill=(r, g, b))
    else:  # vertical
        for y in range(height):
            ratio = y / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return image

def add_minecraft_style_text(image, text, font_size, text_color, position, shadow_color='black'):
    """Add Minecraft-style text with shadow"""
    draw = ImageDraw.Draw(image)
    width, height = image.size
    
    try:
        # Try to use a bold font
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    if position == 'center':
        x = (width - text_width) // 2
        y = (height - text_height) // 2
    elif position == 'top':
        x = (width - text_width) // 2
        y = 50
    elif position == 'bottom':
        x = (width - text_width) // 2
        y = height - text_height - 50
    elif position == 'center-top':
        x = (width - text_width) // 2
        y = (height - text_height) // 2 - 30
    elif position == 'center-bottom':
        x = (width - text_width) // 2
        y = (height - text_height) // 2 + 30
    
    # Add text shadow (pixelated style)
    shadow_offset = 3
    for dx in range(-shadow_offset, shadow_offset + 1):
        for dy in range(-shadow_offset, shadow_offset + 1):
            if dx*dx + dy*dy <= shadow_offset*shadow_offset:
                draw.text((x + dx, y + dy), text, font=font, fill=shadow_color)
    
    # Add main text
    draw.text((x, y), text, font=font, fill=text_color)
    
    return image

def create_craftminer_banner():
    """Create new CraftMiner banner"""
    # Create gradient background (orange to white)
    width, height = 1920, 1080
    image = create_gradient_background(width, height, (255, 140, 0), (255, 255, 255))
    
    # Add some decorative minecraft-style blocks
    draw = ImageDraw.Draw(image)
    
    # Add block pattern in corners
    block_size = 30
    for i in range(0, width, 80):
        for j in range(0, height, 80):
            if (i + j) % 160 == 0:
                # Orange block
                draw.rectangle([i, j, i+block_size, j+block_size], fill=(255, 140, 0), outline=(200, 100, 0))
            elif (i + j) % 160 == 80:
                # White block  
                draw.rectangle([i, j, i+block_size, j+block_size], fill=(255, 255, 255), outline=(200, 200, 200))
    
    # Add main title "CRAFTMINER"
    image = add_minecraft_style_text(image, "CRAFTMINER", 120, '#ff8c00', 'center-top', '#000000')
    
    # Add subtitle "play.craftminer.com"
    image = add_minecraft_style_text(image, "play.craftminer.com", 48, '#b8860b', 'center-bottom', '#000000')
    
    return image

def create_mini_banner():
    """Create smaller banner version"""
    width, height = 800, 200
    image = create_gradient_background(width, height, (255, 140, 0), (255, 255, 255))
    
    # Add decorative blocks
    draw = ImageDraw.Draw(image)
    block_size = 15
    for i in range(0, width, 40):
        for j in range(0, height, 40):
            if (i + j) % 80 == 0:
                draw.rectangle([i, j, i+block_size, j+block_size], fill=(255, 140, 0), outline=(200, 100, 0))
            elif (i + j) % 80 == 40:
                draw.rectangle([i, j, i+block_size, j+block_size], fill=(255, 255, 255), outline=(200, 200, 200))
    
    # Add main title "CRAFTMINER"
    image = add_minecraft_style_text(image, "CRAFTMINER", 48, '#ff8c00', 'center-top', '#000000')
    
    # Add subtitle "play.craftminer.com"
    image = add_minecraft_style_text(image, "play.craftminer.com", 24, '#b8860b', 'center-bottom', '#000000')
    
    return image

def main():
    """Create new banner images"""
    # Ensure images directory exists
    os.makedirs('/workspace/craftminer-website/images', exist_ok=True)
    
    print("Creating new CraftMiner banner...")
    
    # Create large banner
    create_craftminer_banner().save('/workspace/craftminer-website/images/craftminer-banner.png', 'PNG')
    print("✓ Created craftminer-banner.png (1920x1080)")
    
    # Create small banner for mobile
    create_mini_banner().save('/workspace/craftminer-website/images/craftminer-banner-small.png', 'PNG')
    print("✓ Created craftminer-banner-small.png (800x200)")
    
    print("\nNew CraftMiner banner created successfully!")

if __name__ == "__main__":
    main()