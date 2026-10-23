from PIL import Image
import os

brand_dir = r'C:\Users\marco\.gemini\antigravity\scratch\promoclicks-site\assets\images\brand'

# Load current dark logo
dark_logo_path = os.path.join(brand_dir, 'promoclicks-logo-horizontal-dark.png')
im = Image.open(dark_logo_path).convert('RGBA')
w, h = im.size
pixels = im.load()

# Let's find where "Clicks" starts.
# "Promo" ends around x = w * 0.53
# Orange target: (255, 145, 77) -> #FF914D
im_orange = im.copy()
px = im_orange.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a > 0:
            # Check if this pixel is in the "Clicks" half (x > w * 0.51) or if it has color (red/orange)
            if x > w * 0.51:
                # Any non-white pixel or letter pixel in Clicks
                # Keep the brightness / alpha, tint to #FF914D
                # Compute relative luminance of the pixel
                lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
                # Target orange: 255, 145, 77
                # Blend with white highlight if very bright
                if lum > 0.85:
                    new_r = int(255)
                    new_g = int(145 + (lum - 0.85) / 0.15 * (255 - 145))
                    new_b = int(77 + (lum - 0.85) / 0.15 * (255 - 77))
                else:
                    new_r = int(255 * (lum / 0.85))
                    new_g = int(145 * (lum / 0.85))
                    new_b = int(77 * (lum / 0.85))
                px[x, y] = (min(255, max(0, new_r)), min(255, max(0, new_g)), min(255, max(0, new_b)), a)

# Save dark logo (Promo White, Clicks Orange)
im_orange.save(os.path.join(brand_dir, 'promoclicks-logo-horizontal-dark.png'), 'PNG')
im_orange.save(os.path.join(brand_dir, 'promoclicks-logo-horizontal-dark.webp'), 'WEBP', quality=95)
print("Dark logo updated successfully!")

# Also generate light version (Promo Black, Clicks Orange)
im_light = im_orange.copy()
px_l = im_light.load()
for y in range(h):
    for x in range(int(w * 0.51)):
        r, g, b, a = px_l[x, y]
        if a > 0:
            # Turn Promo into charcoal/black (#141414)
            px_l[x, y] = (20, 20, 20, a)

im_light.save(os.path.join(brand_dir, 'promoclicks-logo-horizontal-light.png'), 'PNG')
im_light.save(os.path.join(brand_dir, 'promoclicks-logo-horizontal-light.webp'), 'WEBP', quality=95)
print("Light logo updated successfully!")
