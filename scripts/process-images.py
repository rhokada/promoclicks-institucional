import os
import sys
from PIL import Image

def process_image(src_path, dest_dir, slug):
    os.makedirs(dest_dir, exist_ok=True)
    im = Image.open(src_path)
    if im.mode in ('RGBA', 'P'):
        im = im.convert('RGB')
    
    # Target aspect ratio 16:9 (1200 x 670)
    target_ratio = 1200 / 670
    w, h = im.size
    current_ratio = w / h

    if current_ratio > target_ratio:
        # Image is wider, crop width
        new_w = int(h * target_ratio)
        offset = (w - new_w) // 2
        im = im.crop((offset, 0, offset + new_w, h))
    elif current_ratio < target_ratio:
        # Image is taller, crop height
        new_h = int(w / target_ratio)
        offset = (h - new_h) // 2
        im = im.crop((0, offset, w, offset + new_h))

    # 1200w WebP
    im_1200 = im.resize((1200, 670), Image.Resampling.LANCZOS)
    im_1200.save(os.path.join(dest_dir, f"{slug}-1200w.webp"), "WEBP", quality=85)

    # 800w WebP and JPG
    im_800 = im.resize((800, 447), Image.Resampling.LANCZOS)
    im_800.save(os.path.join(dest_dir, f"{slug}-800w.webp"), "WEBP", quality=85)
    im_800.save(os.path.join(dest_dir, f"{slug}.webp"), "WEBP", quality=85)
    im_800.save(os.path.join(dest_dir, f"{slug}.jpg"), "JPEG", quality=85)

    # 480w WebP
    im_480 = im.resize((480, 268), Image.Resampling.LANCZOS)
    im_480.save(os.path.join(dest_dir, f"{slug}-480w.webp"), "WEBP", quality=85)

    print(f"[OK] Processed {slug} -> 1200w, 800w, 480w (.webp & .jpg)")

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python process-images.py <src_path> <dest_dir> <slug>")
        sys.exit(1)
    process_image(sys.argv[1], sys.argv[2], sys.argv[3])
