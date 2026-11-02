# YT AI Player

<p align="center">
  <img src="logo.svg" alt="YT AI Player Logo" width="280" />
</p>

Player ala Spotify, HTML saja: AI carikan lagu mirip sesuai genre/mood/contoh lagu, play via YouTube embed, playlist tersimpan sebagai cache lokal.

Mekanisme API key mirip `ai-prd-generator`: pilih provider + paste key, tersimpan hanya di `localStorage`, dikirim langsung ke provider — tanpa server perantara.

## Cara Pakai

1. Jalankan local server (agar `SYSTEM_PROMPT_MUSIC.md` bisa dimuat):
```bash
cd yt-ai-player
python3 -m http.server 8081
```
2. Buka `http://localhost:8081`
3. Isi Setup: Provider + Model + API Key AI (wajib).
   - 9Router Local: jalankan `9router` di terminal, pilih **9Router (Local: localhost:20128)** di dropdown. Key & Host terisi otomatis.
   - Gemini free: https://aistudio.google.com/app/apikey
   - OpenRouter free: https://openrouter.ai/settings/keys (`google/gemini-2.0-flash-001`, varian `:free`)
   - Custom / Ollama: isi Base URL (cth: `http://localhost:11434/v1` atau `http://localhost:20128/v1`).
4. Opsional tapi **sangat disarankan**: isi YouTube Data API Key untuk hasil paling stabil.
   - Tanpa key = resolver gratis berlapis (Piped → Invidious → scrape). Kadang lambat / diblokir adblock-VPN — kalau gagal, klik **↻** di card lagu atau **↗** untuk buka di YouTube.
   - Dengan key dari `console.cloud.google.com → YouTube Data API v3` = akurat & cepat, tidak tergantung resolver gratis.
5. Cari: `lofi buat kerja`, `mirip Coldplay Yellow`, `dangdut koplo galau` → **Cari dengan AI**.
   - Bisa klik **Stop AI** kapan saja jika ingin membatalkan pencarian yang sedang berjalan.
6. Klik **Putar Semua** di bagian atas hasil untuk memutar seluruh daftar rekomendasi sekaligus secara berurutan, atau klik ▶ di card lagu untuk memutar lagu tertentu. Gunakan + untuk simpan ke playlist aktif, ♡ untuk Favorit.
7. Navigasi: sidebar kiri ada **Hasil Pencarian / Riwayat / Playlist**. Buka Favorit lalu klik **← Kembali ke hasil** untuk balik — hasil search tidak hilang.
8. Load more: **↓ Tampilkan lebih banyak** (paginasi lokal) dan **✨ Minta lagu tambahan ke AI** (exclude lagu yang sudah ada).
9. Player: progress bar bisa diklik (seek), Prev ulangi lagu jika >3 detik, volume slider, tombol 🎬 buka video + antrean, ♥ di player.
   - **Mode Tampilan Player**: bisa diatur **Split di Sebelah Kanan (Side Panel)** ala Spotify Desktop atau **Drawer di Bawah (Swipe Bawah)** melalui tombol switcher di player bar / header panel / menu Setup.

## File

| File | Fungsi |
|---|---|
| `index.html` | Seluruh app (HTML+CSS+JS, tanpa build) |
| `SYSTEM_PROMPT_MUSIC.md` | Otak AI musik — edit untuk ubah gaya rekomendasi |
| `README.md` | File ini |

## Cache

Semua tersimpan di `localStorage` (`ytmusic_v1`):
- playlist buatan user + Favorit
- riwayat putar (max 50)
- hasil AI terakhir

Yang di-cache hanya metadata + ID video, bukan file video (mengikuti ToS YouTube).

## Privasi

Sama seperti ai-prd-generator: key hanya di browser kamu.
