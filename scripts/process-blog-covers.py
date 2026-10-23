"""
PromoClicks — Processador de Imagens de Capa para o Blog
Gera versões responsivas em WebP (1200w, 800w, 480w) e JPG otimizado
para os 4 artigos de inteligência promocional.
"""

import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = r"C:/Users/marco/.gemini/antigravity/brain/f11926d1-a63f-4dfb-a62b-01c8b380803b"
DEST_DIR = os.path.join(ROOT, "assets", "images", "editorial")
DIST_DEST_DIR = os.path.join(ROOT, "dist", "assets", "images", "editorial")

os.makedirs(DEST_DIR, exist_ok=True)
os.makedirs(DIST_DEST_DIR, exist_ok=True)

images = {
    "blog-regulamentacao-spa-compliance": os.path.join(SRC_DIR, "blog_regulamentacao_spa_compliance_1792589123311.jpg"),
    "blog-campanhas-coletivas-vs-exclusivas": os.path.join(SRC_DIR, "blog_campanhas_coletivas_vs_exclusivas_1792589148880.jpg"),
    "blog-gamificacao-pdv-ticket-medio": os.path.join(SRC_DIR, "blog_gamificacao_pdv_ticket_medio_1792589177382.jpg"),
    "blog-natal-premiado-estrategia-lojistas": os.path.join(SRC_DIR, "blog_natal_premiado_estrategia_lojistas_1792589210230.jpg"),
}

for name, src_path in images.items():
    if not os.path.exists(src_path):
        print(f"ERRO: Arquivo {src_path} não encontrado!")
        continue

    im = Image.open(src_path).convert("RGB")
    w, h = im.size
    aspect = w / h

    # 1. Salvar versão original otimizada em JPG e WebP
    for d in [DEST_DIR, DIST_DEST_DIR]:
        jpg_p = os.path.join(d, f"{name}.jpg")
        webp_p = os.path.join(d, f"{name}.webp")
        im.save(jpg_p, "JPEG", quality=88, optimize=True)
        im.save(webp_p, "WEBP", quality=88)

    # 2. Gerar variantes responsivas (1200w, 800w, 480w)
    for target_w in [1200, 800, 480]:
        if target_w >= w:
            resized = im
        else:
            target_h = int(target_w / aspect)
            resized = im.resize((target_w, target_h), Image.Resampling.LANCZOS)

        for d in [DEST_DIR, DIST_DEST_DIR]:
            var_webp = os.path.join(d, f"{name}-{target_w}w.webp")
            resized.save(var_webp, "WEBP", quality=85)

    print(f"[OK] Processada imagem: {name} ({w}x{h})")

print("\nTodas as 4 capas do blog foram processadas com sucesso!")
