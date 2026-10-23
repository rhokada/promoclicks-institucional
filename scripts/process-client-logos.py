"""
PromoClicks — Processador dos Logotipos de Clientes e Parceiros (v2)
Normaliza os 9 logotipos de grandes marcas e referências:
1. Urbano Alimentos
2. L'Oréal Paris (letras em preto puro e alta opacidade para cartões brancos)
3. Ultrafarma
4. Seara
5. SIG Combibloc
6. Broto Legal
7. Quatá Alimentos
8. JUST Water (letras em preto puro para cartões brancos)
9. Nissin Foods

Gera versões otimizadas em WebP e PNG com e sem sufixo -v2 para cache-busting definitivo.
"""

import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST_DIR = os.path.join(ROOT, "assets", "images", "clients")
DIST_DEST_DIR = os.path.join(ROOT, "dist", "assets", "images", "clients")
os.makedirs(DEST_DIR, exist_ok=True)
os.makedirs(DIST_DEST_DIR, exist_ok=True)

USER_UPLOADS = r"C:/Users/marco/.gemini/antigravity/brain/f11926d1-a63f-4dfb-a62b-01c8b380803b/.user_uploaded"

inputs = {
    "urbano": os.path.join(USER_UPLOADS, "media_1792516850204_f773c35e.png"),
    "loreal": os.path.join(USER_UPLOADS, "media_1792516857724_95bc98c9.png"),
    "ultrafarma": os.path.join(USER_UPLOADS, "media_1792516867161_57a3f50b.png"),
    "seara": os.path.join(USER_UPLOADS, "media_1792517139074_8caa2381.png"),
    "sig": os.path.join(USER_UPLOADS, "media_1792517147741_4802d5dd.png"),
    "broto-legal": os.path.join(USER_UPLOADS, "media_1792517199770_2c55524c.png"),
    "quata": os.path.join(USER_UPLOADS, "media_1792517210710_2e743288.png"),
    "just": os.path.join(USER_UPLOADS, "media_1792517216761_8f3c92d9.png"),
    "nissin": os.path.join(USER_UPLOADS, "media_1792517225311_6ddd4ef0.png"),
}

# 1. Processar Urbano
def process_urbano():
    im = Image.open(inputs["urbano"]).convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im

# 2. Processar L'Oréal (preto absoluto, alta densidade e recorte limpo)
def process_loreal():
    im = Image.open(inputs["loreal"]).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    w, h = im.size
    black = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for x in range(w):
        for y in range(h):
            r, g, b, a = im.getpixel((x, y))
            if a > 15:
                # Preto puro com o canal alfa correspondente
                black.putpixel((x, y), (0, 0, 0, a))
    return black

# 3. Processar Ultrafarma (cápsula preta com texto branco)
def process_ultrafarma():
    im = Image.open(inputs["ultrafarma"]).convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im

# 4. Processar Seara (remover fundo bege, manter oval vermelho/amarelo)
def process_seara():
    im = Image.open(inputs["seara"]).convert("RGBA")
    w, h = im.size
    trans = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for x in range(w):
        for y in range(h):
            r, g, b, a = im.getpixel((x, y))
            if r > 215 and g > 210 and b > 200:
                trans.putpixel((x, y), (0, 0, 0, 0))
            elif r > 190 and g > 185 and b > 175:
                trans.putpixel((x, y), (r, g, b, 0))
            else:
                trans.putpixel((x, y), (r, g, b, a))
    bbox = trans.getbbox()
    return trans.crop(bbox) if bbox else trans

# 5. Processar SIG (oval azul com texto branco)
def process_sig():
    im = Image.open(inputs["sig"]).convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im

# 6. Processar Broto Legal (vermelho puro com anti-aliasing sobre transparente)
def process_broto_legal():
    im = Image.open(inputs["broto-legal"]).convert("RGBA")
    w, h = im.size
    smooth = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for x in range(w):
        for y in range(h):
            r, g, b, a = im.getpixel((x, y))
            if a == 0:
                continue
            alpha = int(255 * (1.0 - (g / 255.0)))
            if alpha < 12:
                smooth.putpixel((x, y), (0, 0, 0, 0))
            else:
                smooth.putpixel((x, y), (185, 12, 22, alpha))
    bbox = smooth.getbbox()
    return smooth.crop(bbox) if bbox else smooth

# 7. Processar Quatá (oval azul e detalhe vermelho com texto branco)
def process_quata():
    im = Image.open(inputs["quata"]).convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im

# 8. Processar Just (preto puro para cartões brancos)
def process_just():
    im = Image.open(inputs["just"]).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    w, h = im.size
    black = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for x in range(w):
        for y in range(h):
            r, g, b, a = im.getpixel((x, y))
            if a > 15:
                black.putpixel((x, y), (0, 0, 0, a))
    return black

# 9. Processar Nissin (arco vermelho com texto branco NISSIN)
def process_nissin():
    im = Image.open(inputs["nissin"]).convert("RGBA")
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im

print("Processando logotipos para visibilidade máxima e cache-busting v2...")

raw_logos = {
    "urbano": process_urbano(),
    "loreal": process_loreal(),
    "ultrafarma": process_ultrafarma(),
    "seara": process_seara(),
    "sig": process_sig(),
    "broto-legal": process_broto_legal(),
    "quata": process_quata(),
    "just": process_just(),
    "nissin": process_nissin(),
}

specs = {}

for key, img in raw_logos.items():
    target_h = 76
    aspect = img.width / img.height
    target_w = max(1, int(target_h * aspect))
    resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    specs[key] = {"width": target_w, "height": target_h}
    
    for d in [DEST_DIR, DIST_DEST_DIR]:
        # Salva tanto com nome original quanto com sufixo -v2 para cache-busting
        for suffix in ["", "-v2"]:
            png_p = os.path.join(d, f"logo-{key}{suffix}.png")
            webp_p = os.path.join(d, f"logo-{key}{suffix}.webp")
            resized.save(png_p, "PNG", optimize=True)
            resized.save(webp_p, "WEBP", quality=95)
            print(f"Salvo logo-{key}{suffix} ({target_w}x{target_h}) em {d}")

print("Concluído processamento de logotipos!")
