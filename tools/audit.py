#!/usr/bin/env python3
"""
audit.py — Audit mutu Neural Lab v3
Cek: struktur HTML, istilah terlarang, integritas ID, kelengkapan kuis.
"""
import sys, re, os, json

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, 'index.html')
JS_DIR = os.path.join(ROOT, 'js')

BANNED = ['kemelesetan', 'kacamata peraba', 'remasan', 'kemelesetan', 'standar kelulusan sebagai']
BAB_IDS = [f'bab{i:02d}' for i in range(1, 12)]
REQUIRED_CARDS = ['kilas', 'story', 'guide', 'analis', 'conclusion', 'terms']

errors = []
warnings = []

def err(msg): errors.append(msg)
def warn(msg): warnings.append(msg)

# Read HTML
with open(HTML, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Check banned terms
print('=== Cek Istilah Terlarang ===')
for term in BANNED:
    if term.lower() in html.lower():
        err(f'Istilah terlarang ditemukan: "{term}"')
if not any('terlarang' in e for e in errors):
    print('  ✅ Tidak ada istilah terlarang')

# 2. Check section structure
print('\n=== Cek Struktur Bab ===')
for bab_id in BAB_IDS:
    section_id = f'sec-{bab_id}'
    if f'id="{section_id}"' not in html:
        err(f'Section #{section_id} tidak ditemukan')
        continue

    section_match = re.search(f'id="{section_id}".*?(?=<section|<footer)', html, re.DOTALL)
    if not section_match:
        err(f'Tidak bisa membaca section #{section_id}')
        continue

    section = section_match.group(0)

    for card_type in REQUIRED_CARDS:
        if card_type not in section:
            err(f'{bab_id}: card .{card_type} tidak ditemukan')

    # Check quiz
    if f'data-quiz="{bab_id}"' not in section:
        err(f'{bab_id}: quiz container tidak ditemukan')

    # Check viz canvas or SVG
    has_viz = 'canvas' in section or 'svg' in section or 'grid5' in section or 'words' in section or 'track' in section
    if not has_viz:
        warn(f'{bab_id}: tidak ada elemen visual (canvas/svg/grid)')

if not errors:
    print(f'  ✅ Semua {len(BAB_IDS)} bab punya struktur lengkap')

# 3. Check JS viz files exist
print('\n=== Cek File Visualisasi ===')
for bab_id in BAB_IDS:
    fname = f'viz-{bab_id}.js'
    fpath = os.path.join(JS_DIR, fname)
    if not os.path.exists(fpath):
        err(f'File {fname} tidak ditemukan')
    else:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        fn_name = f'initViz{bab_id.capitalize()}'
        # Check for init function (case variations)
        if 'function init' not in content.lower():
            warn(f'{fname}: tidak ada fungsi init')

if not any('tidak ditemukan' in e and 'viz-' in e for e in errors):
    print(f'  ✅ Semua {len(BAB_IDS)} file viz ada')

# 4. Check ID integrity (getElementById in JS → id in HTML)
print('\n=== Cek Integritas ID ===')
js_ids = set()
for fname in os.listdir(JS_DIR):
    if not fname.endswith('.js'): continue
    fpath = os.path.join(JS_DIR, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    for match in re.finditer(r"""getElementById\(['"]([^'"]+)['"]\)""", content):
        js_ids.add((match.group(1), fname))
    # Also check $('...') pattern
    for match in re.finditer(r"""\$\(['"]([^'"]+)['"]\)""", content):
        js_ids.add((match.group(1), fname))

missing_ids = 0
for eid, fname in js_ids:
    if f'id="{eid}"' not in html:
        warn(f'ID "{eid}" di {fname} tidak ada di HTML')
        missing_ids += 1

if missing_ids == 0:
    print(f'  ✅ Semua {len(js_ids)} ID referensi valid')
else:
    print(f'  ⚠️ {missing_ids} ID referensi tidak ditemukan di HTML')

# 5. Check quiz completeness
print('\n=== Cek Kuis ===')
lessons_path = os.path.join(JS_DIR, 'lessons.js')
with open(lessons_path, 'r', encoding='utf-8') as f:
    lessons = f.read()

for bab_id in BAB_IDS:
    if f"'{bab_id}'" not in lessons and f'"{bab_id}"' not in lessons:
        err(f'{bab_id}: tidak ada di QUIZZES')

# Check answer indices
for match in re.finditer(r'answer:\s*(\d+)', lessons):
    idx = int(match.group(1))
    if idx > 3:
        err(f'Answer index {idx} > 3 (kemungkinan salah)')

# Check all answers are not the same
answers = re.findall(r'answer:\s*(\d+)', lessons)
if answers:
    unique = set(answers)
    if len(unique) == 1:
        warn(f'Semua jawaban kuis di indeks yang sama ({answers[0]}) — terlalu mudah ditebak')
    else:
        print(f'  ✅ Jawaban tersebar di {len(unique)} posisi berbeda')

# Summary
print('\n' + '=' * 50)
print(f'ERRORS: {len(errors)}')
print(f'WARNINGS: {len(warnings)}')

if errors:
    print('\n❌ ERRORS:')
    for e in errors:
        print(f'  • {e}')

if warnings:
    print('\n⚠️ WARNINGS:')
    for w in warnings:
        print(f'  • {w}')

if not errors:
    print('\n✅ AUDIT LOLOS — project siap!')
    sys.exit(0)
else:
    print(f'\n❌ AUDIT GAGAL — {len(errors)} error harus diperbaiki')
    sys.exit(1)
