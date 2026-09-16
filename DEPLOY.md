# DEPLOY.md — Cara Online-kan Website (bisa diakses teman, tidak cuma localhost)

Website ini **100% statis** (HTML+CSS+JS, tanpa backend) → bisa di-hosting gratis di mana saja.
Pilih **salah satu** cara di bawah. Paling mudah: Cara A.

---

## Cara A — Netlify Drop (paling mudah, 2 menit, tanpa git) ✅ disarankan

1. Buka https://app.netlify.com/drop
2. Login (bisa pakai GitHub/Google).
3. Drag folder `D:\Coding\deep-learning-visualization` ke halaman itu.
   - Kalau drag folder tidak bisa: zip dulu folder ini (klik kanan → Send to → Compressed), lalu drag file `.zip`-nya.
4. Selesai! Dapat link seperti `https://dl-viz-kamu.netlify.app`.
5. Share link itu ke teman. Setiap update: drag ulang folder (atau pakai Cara B agar otomatis).

Ganti nama site: Site settings → Change site name.

## Cara B — GitHub Pages (permanen + update otomatis via git)

```powershell
cd D:\Coding\deep-learning-visualization
git init
git add .
git commit -m "DL-Viz v1.0: visualisasi deep learning interaktif"
# buat repo baru di github.com/new (tanpa centang README), mis. deep-learning-visualization
git remote add origin https://github.com/USERNAME/deep-learning-visualization.git
git branch -M main
git push -u origin main
```

Lalu di GitHub: repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` + `/ (root)` → Save.
Tunggu 1–2 menit → situs live di `https://USERNAME.github.io/deep-learning-visualization/`.

File `.nojekyll` sudah disertakan agar Pages tidak mengabaikan file `_`-apapun.

Update berikutnya tinggal:
```powershell
git add .; git commit -m "update"; git push
```

## Cara C — Vercel (alternatif modern)

1. Buka https://vercel.com → login → **Add New → Project**.
2. Import repo GitHub kamu (atau drag folder).
3. Framework Preset: **Other**. Build command: kosong. Output dir: `.`
4. Deploy → dapat `https://xxx.vercel.app`.

## Cara D — Share sementara dari laptop (demo kilat, laptop harus nyala)

Jalankan server lokal lalu expose via tunnel:

```powershell
cd D:\Coding\deep-learning-visualization
python -m http.server 8000
```

Buka terminal kedua:
```powershell
npx --yes localtunnel --port 8000
# dapat URL seperti https://berani-coba-123.loca.lt → share ke teman
# teman buka URL itu + masukkan IP tunnel jika diminta password halaman loca.lt
```

Alternatif tunnel: `npx --yes cloudflared tunnel --url http://localhost:8000` (tidak perlu daftar).

> Catatan: tunnel mati saat laptop mati/tutup. Untuk permanen pakai Cara A/B/C.

---

## Checklist sebelum share
- [ ] Buka versi online di HP + laptop (mode gelap/terang OK?)
- [ ] Klik semua 11 modul, geser slider (tidak ada error console?)
- [ ] Coba refresh — progress masih tersimpan? (per-browser, wajar)
- [ ] Link yang dibagikan pakai `https://` (bukan `localhost`)

## Troubleshooting
| Gejala | Solusi |
|---|---|
| Halaman putih / 404 di GitHub Pages | Pastikan URL ada `/deep-learning-visualization/` di belakang; tunggu 2 mnt; cek Settings→Pages branch `main` |
| CSS/JS tidak ke-load | Jangan pakai path absolut `D:\...`; repo ini sudah pakai relatif (`css/`, `js/`) jadi aman |
| localtunnel minta password | Buka link tunnel di browser kamu dulu, catat IP publik, masukkan di halaman itu; lalu share |
| Port 8000 dipakai | Ganti `python -m http.server 8001` + tunnel `--port 8001` |
