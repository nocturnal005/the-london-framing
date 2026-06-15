from PIL import Image

img = Image.open('1_Editorial_Variant.png')

# Coordinates roughly estimated from 1024x1024
crops = [
    ('assets/ed_frame1.png', (595, 175, 830, 495)), # Top right (The Minimal Collection)
    ('assets/ed_frame2.png', (105, 680, 295, 915)), # Bottom left
    ('assets/ed_frame3.png', (305, 760, 495, 990)), # Bottom middle
    ('assets/ed_frame4.png', (505, 610, 695, 830)), # Bottom mid-right
    ('assets/ed_frame5.png', (705, 705, 895, 930)), # Bottom right
]

for name, box in crops:
    cropped = img.crop(box)
    cropped.save(name)
    print(f"Saved {name}")
