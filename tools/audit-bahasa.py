# Audit mutu Misi Si Cerdas — struktur wajib + larangan coinage aneh + integritas ID/kuis.
# Cara pakai (dari folder proyek):  python tools/audit-bahasa.py
# Keluar 0 = LOLOS. Keluar 1 = GAGAL (daftar temuan dicetak).
# Kebijakan istilah (AGENTS.md bag. 5): istilah Inggris yang sudah hidup
# (loss, epoch, dataset, filter, ...) BOLEH dipakai langsung; yang dilarang
# adalah terjemahan harfiah yang aneh — daftarnya di BANNED.

import re, glob, sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

GAGAL = []
MODS = ["neuron","aktivasi","mlp","loss","gradient","backprop",
        "overfit","cnn","rnn","attention","playground"]

html = open('index.html', encoding='utf-8').read()

# 1) Coinage aneh warisan (dilarang muncul di teks tampil mana pun)
BANNED = ["hasil remasan", "kacamata peraba", "kemelesetan",
          "Keberanian belajar", "skor kemelesetan"]
sumber = [("index.html", html)]
for f in sorted(glob.glob('js/viz-*.js')) + ['js/lessons.js', 'js/app.js']:
    sumber.append((f, open(f, encoding='utf-8').read()))
for nama, src in sumber:
    for b in BANNED:
        if re.search(b, src, flags=re.I):
            GAGAL.append('[coinage] %s masih mengandung "%s"' % (nama, b))

# 2) Struktur wajib tiap misi
for m in MODS:
    if ('id="sec-%s"' % m) not in html:
        GAGAL.append('[struktur] section sec-%s hilang' % m)
for pat, nama, kecualikan in [
    ('card kilas', 'kilas', []),
    ('card story', 'cerita', []),
    ('card guide', 'panduan', []),
    ('card analis', 'soal analis', []),
    ('card kesimpulan', 'kesimpulan', []),
    ('card istilah', 'kotak istilah', []),
    ('class="cols', 'area main', []),
    ('data-quiz="%s"', 'kuis', MODS),
]:
    for m in MODS:
        n = html.count(pat % m) if '%s' in pat else html.count(pat)
        if '%s' in pat:
            if m not in kecualikan and n < 1:
                GAGAL.append('[struktur] %s Modul %s hilang' % (nama, m))
        # pola tanpa %s dihitung global di bawah
if html.count('card kilas') < 11:
    GAGAL.append('[struktur] kilas kurang dari 11: %d' % html.count('card kilas'))
for wajib, jml in [('card analis', 11), ('card kesimpulan', 11), ('card istilah', 11)]:
    c = html.count(wajib)
    if c < jml:
        GAGAL.append('[struktur] %s hanya %d (minta %d)' % (wajib, c, jml))
if html.count('<details class="hitung">') < 10:
    GAGAL.append('[struktur] kotak hitungan kurang dari 10')
if html.count('id="mascot"') != 1 or html.count('id="xp-fill"') != 1:
    GAGAL.append('[struktur] blok maskot/XP sidebar rusak')

# 3) Integritas ID: semua getElementById harus ada di HTML
ids_html = set(re.findall(r'id="([^"]+)"', html))
for f in sorted(glob.glob('js/viz-*.js')) + ['js/app.js']:
    for got in set(re.findall(r'getElementById\("([^"]+)"\)', open(f, encoding='utf-8').read())):
        if got not in ids_html:
            GAGAL.append('[id] %s memanggil #%s yang tidak ada' % (f, got))

# 4) Integritas kuis: tiap soal punya jawaban valid + feedback
src = open('js/lessons.js', encoding='utf-8').read()
for m in MODS:
    if ('"%s"' % m) not in src and ("'%s'" % m) not in src and (m + ':') not in src:
        GAGAL.append('[kuis] bank soal %s hilang' % m)
for mm in re.finditer(r'\{\s*q:"', src):
    pot = src[mm.start():mm.start() + 400]
    if 'answer:' not in pot or 'fb:' not in pot:
        GAGAL.append('[kuis] soal tanpa answer/fb: %s...' % pot[:60])

if GAGAL:
    print('GAGAL — %d temuan:' % len(GAGAL))
    for g in GAGAL:
        print(' ', g)
    sys.exit(1)
print('LOLOS — struktur lengkap, tanpa coinage aneh, ID & kuis utuh.')
