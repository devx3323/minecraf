#!/usr/bin/env python3
"""
Create placeholder images for CraftMiner website
"""
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

def create_gradient_background(width, height, color1, color2, direction='vertical'):
    """Create a gradient background"""
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    if direction == 'vertical':
        for y in range(height):
            ratio = y / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    else:  # horizontal
        for x in range(width):
            ratio = x / width
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(x, 0), (x, height)], fill=(r, g, b))
    
    return image

def add_text_to_image(image, text, font_size=40, text_color='white', position='center'):
    """Add text to image"""
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
    else:  # bottom
        x = (width - text_width) // 2
        y = height - text_height - 50
    
    # Add text shadow
    shadow_offset = 2
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill='black')
    draw.text((x, y), text, font=font, fill=text_color)
    
    return image

def create_news_banner():
    """Create news banner image"""
    # Create gradient background (orange to dark)
    image = create_gradient_background(800, 400, (255, 140, 0), (26, 26, 26))
    
    # Add some decorative elements
    draw = ImageDraw.Draw(image)
    
    # Add minecraft-style blocks (squares)
    for i in range(0, 800, 50):
        for j in range(0, 400, 50):
            if (i + j) % 100 == 0:
                draw.rectangle([i, j, i+30, j+30], fill=(34, 197, 94), outline=(22, 163, 74))
    
    # Add title text
    image = add_text_to_image(image, "CRAFTMINER NEWS", 48, 'white', 'center')
    
    return image

def create_events_banner():
    """Create events banner image"""
    # Create gradient background (purple to dark)
    image = create_gradient_background(800, 400, (139, 92, 246), (26, 26, 26))
    
    # Add decorative stars
    draw = ImageDraw.Draw(image)
    for i in range(0, 800, 60):
        for j in range(0, 400, 60):
            if (i * j) % 120 == 0:
                draw.ellipse([i, j, i+20, j+20], fill=(251, 191, 36))
    
    # Add title text
    image = add_text_to_image(image, "EVENTS", 48, 'white', 'center')
    
    return image

def create_update_banner():
    """Create update banner image"""
    # Create gradient background (blue to dark)
    image = create_gradient_background(800, 400, (59, 130, 246), (26, 26, 26))
    
    # Add technical grid pattern
    draw = ImageDraw.Draw(image)
    for i in range(0, 800, 40):
        draw.line([(i, 0), (i, 400)], fill=(96, 165, 250), width=1)
    for j in range(0, 400, 40):
        draw.line([(0, j), (800, j)], fill=(96, 165, 250), width=1)
    
    # Add title text
    image = add_text_to_image(image, "UPDATES", 48, 'white', 'center')
    
    return image

def create_admin_avatar():
    """Create admin avatar image"""
    # Create circular avatar
    image = create_gradient_background(80, 80, (255, 140, 0), (255, 69, 0))
    
    # Make it circular
    mask = Image.new('L', (80, 80), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse([0, 0, 80, 80], fill=255)
    
    # Apply circular mask
    image.putalpha(mask)
    
    # Add "ADMIN" text
    draw = ImageDraw.Draw(image)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 12)
    except:
        font = ImageFont.load_default()
    
    text = "ADMIN"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (80 - text_width) // 2
    y = (80 - text_height) // 2
    
    draw.text((x, y), text, font=font, fill='white')
    
    return image

def create_craftminer_logo():
    """Create CraftMiner logo image"""
    # Create a large logo image
    image = create_gradient_background(600, 200, (255, 140, 0), (255, 255, 255))
    
    # Add title text
    draw = ImageDraw.Draw(image)
    
    try:
        # Try to load a bold font
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Add "CRAFT" text (left side)
    craft_bbox = draw.textbbox((0, 0), "CRAFT", font=font_large)
    craft_width = craft_bbox[2] - craft_bbox[0]
    craft_x = (600 - craft_width) // 4
    craft_y = 50
    
    # Add text shadow
    draw.text((craft_x + 3, craft_y + 3), "CRAFT", font=font_large, fill='black')
    draw.text((craft_x, craft_y), "CRAFT", font=font_large, fill='#ff8c00')
    
    # Add "MINER" text (right side)
    miner_bbox = draw.textbbox((0, 0), "MINER", font=font_large)
    miner_width = miner_bbox[2] - miner_bbox[0]
    miner_x = (600 + craft_width) // 2 + 50
    miner_y = 50
    
    # Add text shadow
    draw.text((miner_x + 3, miner_y + 3), "MINER", font=font_large, fill='black')
    draw.text((miner_x, miner_y), "MINER", font=font_large, fill='white')
    
    # Add subtitle
    subtitle = "play.craftminer.com"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_small)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (600 - subtitle_width) // 2
    subtitle_y = 150
    
    draw.text((subtitle_x, subtitle_y), subtitle, font=font_small, fill='#b0b0b0')
    
    return image

def main():
    """Create all placeholder images"""
    # Ensure images directory exists
    os.makedirs('/workspace/craftminer-website/images', exist_ok=True)
    
    print("Creating placeholder images...")
    
    # Create all images
    create_news_banner().save('/workspace/craftminer-website/images/news-banner.jpg', 'JPEG')
    print("✓ Created news-banner.jpg")
    
    create_events_banner().save('/workspace/craftminer-website/images/events-banner.jpg', 'JPEG')
    print("✓ Created events-banner.jpg")
    
    create_update_banner().save('/workspace/craftminer-website/images/update-banner.jpg', 'JPEG')
    print("✓ Created update-banner.jpg")
    
    admin_avatar = create_admin_avatar()
    admin_avatar_rgb = admin_avatar.convert('RGB')
    admin_avatar_rgb.save('/workspace/craftminer-website/images/admin-avatar.jpg', 'JPEG')
    print("✓ Created admin-avatar.jpg")
    
    create_craftminer_logo().save('/workspace/craftminer-website/images/craftminer-logo.png', 'PNG')
    print("✓ Created craftminer-logo.png")
    
    print("\nAll placeholder images created successfully!")

if __name__ == "__main__":
    main()