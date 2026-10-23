import re, json

with open(r'C:\Users\marco\.gemini\antigravity\scratch\promoclicks-site\calendario.txt', 'r', encoding='utf-8') as f:
    text = f.read()

import re, json

m = re.search(r'<script id="initial-data" type="application/json">(.*?)</script>', text, re.DOTALL)
if m:
    data = json.loads(m.group(1))
    print("Keys in data:", data.keys())
    posts = data.get('posts', [])
    print(f"Total posts: {len(posts)}")
    for p in posts:
        tema = p.get('tema', '')
        gancho = p.get('gancho', '')
        legenda = p.get('legenda', '')
        if any(k in (tema + gancho + legenda).lower() for k in ['case', 'número', 'urbano', 'ultra', 'big number', 'alcance']):
            print(f"\n=== POST {p.get('id')} ({p.get('data')}) ===")
            print(f"Tema: {tema} | Formato: {p.get('formato')}")
            print(f"Gancho: {gancho}")
            print(f"Legenda:\n{legenda}")
            print(f"Slides:\n{p.get('slides')}")


