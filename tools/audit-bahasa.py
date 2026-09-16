# Alat audit bahasa — memastikan teks website ramah awam tapi istilahnya lengkap.
# Cara pakai (dari folder proyek):  python tools/audit-bahasa.py
# Keluar 0 = lolos. Keluar 1 = ada istilah Inggris nyasar di teks utama.
# Lihat AGENTS.md bagian 5 (aturan konten) dan 6 (checklist).

import re, glob, sys

GAGAL = []

# 1) Teks utama index.html: buang wadah resmi (hitung lipat, kamus, kotak istilah, script)
html = open('index.html', encoding='utf-8').read()
utama = re.sub(r'<details.*?</details>', ' ', html, flags=re.S)
utama = re.sub(r'<table class="kamus">.*?</table>', ' ', utama, flags=re.S)
utama = re.sub(r'<div class="card istilah">.*?</div>\s*</div>', ' ', utama, flags=re.S)
utama = re.sub(r'<script.*?</script>', ' ', utama, flags=re.S)
teks = re.sub(r'<[^>]+>', ' ', utama)
teks = re.sub(r'\s+', ' ', teks)

POLA = ['epoch', 'loss', 'dataset', 'query', 'hidden', 'filter', 'pooling',
        'gradien', 'underfit', 'overfit', 'threshold', 'weight', 'kernel',
        'stride', 'feature map', 'softmax', 'forward', 'backward',
        'chain rule', 'learning rate', 'cross-entropy', 'perceptron',
        'konvolusi', 'hyperparameter', 'divergen', 'overshoot', 'saturasi']
for p in POLA:
    for m in re.finditer(p, teks, flags=re.I):
        s = max(0, m.start() - 50)
        GAGAL.append('[index] (%s) ...%s...' % (p, teks[s:m.end() + 50].strip()))

# 2) String yang tampil di viz-*.js: periksa hanya isi teks harfiah (bukan nama variabel).
#    Pola yang BOLEH: Indonesia-duluan + resmi di kurung, mis. "Si Lembut (sigmoid)".
BOLEH = re.compile(r'[A-Za-z ]+\([A-Za-z /0-9.\-^]+\)')
for f in sorted(glob.glob('js/viz-*.js')):
    for i, line in enumerate(open(f, encoding='utf-8').read().split('\n'), 1):
        if not any(k in line for k in ['innerHTML', 'textContent', '.title=', 'fillText']):
            continue
        # buang ID elemen (bukan teks tampil): getElementById("...") dan $("...")
        kode = re.sub(r'getElementById\("[^"]*"\)', '', line)
        kode = re.sub(r'\$\("[^"]*"\)', '', kode)
        for lit in re.findall(r'"([^"]*)"', kode) + re.findall(r"'([^']*)'", kode):
            bersih = BOLEH.sub(' ', lit)
            for p in POLA:
                if re.search(p, bersih, flags=re.I):
                    GAGAL.append('[%s:%d] (%s) %s' % (f, i, p, lit[:120]))
                    break

if GAGAL:
    print('GAGAL — istilah Inggris tanpa terjemahan di teks utama:')
    for g in GAGAL:
        print(' ', g)
    sys.exit(1)
print('LOLOS — teks utama bersih, istilah resmi hanya di kamus/kotak istilah/hitungan.')
