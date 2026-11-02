(function() {
  "use strict";

  var PROVIDERS = {
    gemini: { model: "gemini-2.0-flash", hint: "Gratis: aistudio.google.com/app/apikey" },
    openrouter: { model: "google/gemini-2.0-flash-001", hint: "Key: openrouter.ai/settings/keys · coba model :free di openrouter.ai/models" },
    ninerouter: { model: "gemini-2.0-flash", hint: "9Router local di http://localhost:20128/v1 · Jalankan '9router' di terminal. Key opsional (default: 9router)." },
    openai: { model: "gpt-4o-mini", hint: "Key: platform.openai.com/api-keys" },
    claude: { model: "claude-sonnet-4-20250514", hint: "Key: console.anthropic.com/settings/keys" },
    custom: { model: "", hint: "Isi Base URL + Model. Cth: http://localhost:20128/v1 (9Router) atau http://localhost:11434/v1 (Ollama)" }
  };

  var $ = function(id) { return document.getElementById(id); };

  var I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    retry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 13.5"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    lyrics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="9" y2="12"/><line x1="9" y1="12" x2="15" y2="12"/><path d="M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M15 12a3 3 0 1 1-6 0"/></svg>',
    queue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><rect x="3" y="4" width="2" height="16" rx="1"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><rect x="19" y="4" width="2" height="16" rx="1"/></svg>'
  };

  function setPlayIcon(playing) { $("btnPlay").innerHTML = playing ? I.pause : I.play; }
  function setLikeIcon() { var t = state.queue[state.qi]; if (t) $("btnLike").innerHTML = isLiked(t) ? I.heartFill : I.heart; }

  var FALLBACK_PROMPT = "Kamu AI kurator musik. Balas HANYA array JSON valid tanpa teks lain: [{\"title\":\"...\",\"artist\":\"...\",\"genre\":\"...\",\"mood\":\"...\",\"reason\":\"...\",\"youtube_query\":\"...\",\"score\":95}]. Aturan MIRIP (wajib): 1) genre/sub-genre SAMA PERSIS dengan input (lofi->lofi, dangdut koplo->dangdut koplo, jangan campur EDM/pop barat kalau user minta Indonesia), 2) mood/tempo SAMA (galau!=party, fokus!=workout), 3) bahasa/region SAMA (Indonesia->Indonesia), 4) urut dari score tertinggi (100=lagu acuan user, 85-95=artis sama/genre+mood sama, <70 jangan dimasukkan). Jika input lagu spesifik, item #1 lagu itu persis + 2-4 lagu artis sama + sisanya genre+mood+era sama. Maks 3 lagu per artis. Beri 12 lagu nyata populer yang siap dicari di YouTube. youtube_query format \"{artist} - {title} official audio\". reason 1 kalimat sebut genre+mood yang sama (maks 15 kata).";
  var PAGE = 9;
  var state = { sys: "", searchTracks: [], view: { kind: "search" }, visible: PAGE, queue: [], qi: -1, playing: false, lastQuery: "", store: { playlists: [{ id: "fav", name: "Favorit", tracks: [] }], history: [], last: [] } };
  var curPl = "fav";
  var LS = "ytmusic_v1", LSS = "ytmusic_settings";

  /* ---------- THEME ---------- */
  function initTheme() {
    var saved = localStorage.getItem("ytmusic_theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    updateThemeIcon();
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme") || "dark";
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ytmusic_theme", next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var isDark = (document.documentElement.getAttribute("data-theme") || "dark") === "dark";
    var btn = $("themeToggle");
    if (btn) btn.innerHTML = isDark ? I.sun : I.moon;
  }

  /* ---------- SETTINGS ---------- */
  function normalizeOpenAIEndpoint(raw, defaultBase) {
    var u = (raw || defaultBase || "").trim().replace(/\/+$/, "");
    if (!u) return "";
    if (/\/chat\/completions$/i.test(u)) return u;
    if (/\/v\d+(beta\d*)?$/i.test(u)) return u + "/chat/completions";
    return u + "/v1/chat/completions";
  }

  function applyProvider() {
    var pv = $("provider").value;
    var p = PROVIDERS[pv] || PROVIDERS.gemini;
    var isCustomOr9R = pv === "custom" || pv === "ninerouter";
    $("customHostRow").classList.toggle("hidden", !isCustomOr9R);
    $("keyHint").textContent = p.hint;
    if (pv === "ninerouter" && (!$("customHost").value || $("customHost").value === "http://localhost:11434/v1")) {
      $("customHost").value = "http://localhost:20128/v1";
    }
    if (!$("model").value || Object.keys(PROVIDERS).some(function(k) { return PROVIDERS[k].model === $("model").value; })) $("model").value = p.model;
  }

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem(LSS) || "{}");
      if (s.provider) $("provider").value = s.provider;
      if (s.customHost) $("customHost").value = s.customHost;
      applyProvider();
      if (s.model) $("model").value = s.model;
      if (s.apikey) $("apikey").value = s.apikey;
      if (s.ytkey) $("ytkey").value = s.ytkey;
      if (s.customHost) $("customHost").value = s.customHost;
    } catch (e) { applyProvider(); }
  }

  function saveSettings() {
    try { localStorage.setItem(LSS, JSON.stringify({ provider: $("provider").value, model: $("model").value.trim(), apikey: $("apikey").value.trim(), ytkey: $("ytkey").value.trim(), customHost: $("customHost").value.trim().replace(/\/+$/, "") })); } catch (e) {}
  }

  ["provider", "model", "apikey", "ytkey", "customHost"].forEach(function(id) { $(id).addEventListener("change", saveSettings); $(id).addEventListener("input", saveSettings); });
  $("provider").addEventListener("change", applyProvider);

  /* ---------- STORE ---------- */
  function loadStore() {
    try { var v = JSON.parse(localStorage.getItem(LS) || "null"); if (v && v.playlists) state.store = v; } catch (e) {}
    try { state.store.playlists.forEach(function(p) { p.name = String(p.name || "Playlist").replace(/❤️|❤/g, "").replace(/\s{2,}/g, " ").trim() || "Playlist"; }); } catch (e2) {}
    if (!state.store.playlists.length) state.store.playlists = [{ id: "fav", name: "Favorit", tracks: [] }];
    if (!state.store.playlists.some(function(p) { return p.id === "fav"; })) state.store.playlists.unshift({ id: "fav", name: "Favorit", tracks: [] });
    state.searchTracks = state.store.last || [];
    if (state.searchTracks.length) { state.view = { kind: "search" }; state.visible = PAGE; }
  }

  function saveStore() {
    state.store.last = state.searchTracks;
    try { localStorage.setItem(LS, JSON.stringify(state.store)); $("cacheBadge").textContent = "cache: tersimpan ✓ " + new Date().toLocaleTimeString(); } catch (e) {}
  }

  function pushHistory(t) {
    state.store.history = [t].concat(state.store.history.filter(function(x) { return x.youtube_query !== t.youtube_query; })).slice(0, 50);
    saveStore(); renderNav(); renderQueue();
  }

  function isLiked(t) {
    if (!t) return false;
    var f = state.store.playlists.find(function(p) { return p.id === "fav"; });
    return f && f.tracks.some(function(x) { return x.youtube_query === t.youtube_query; });
  }

  /* ---------- LLM ---------- */
  function extractDelta(p, j) {
    if (p === "openai" || p === "openrouter" || p === "ninerouter" || p === "custom") {
      if (j.choices && j.choices[0]) {
        var c0 = j.choices[0];
        if (c0.delta && typeof c0.delta.content === "string") return c0.delta.content;
        if (c0.text && typeof c0.text === "string") return c0.text;
        if (c0.message && typeof c0.message.content === "string") return c0.message.content;
      }
      return "";
    }
    if (p === "claude") { if (j.type === "content_block_delta" && j.delta && j.delta.type === "text_delta") return j.delta.text; return ""; }
    if (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) return j.candidates[0].content.parts.map(function(x) { return x.text || ""; }).join("");
    return "";
  }

  async function streamLLM(sys, user, onD, signal) {
    var pv = $("provider").value, key = $("apikey").value.trim(), model = $("model").value.trim();
    if (!key && pv !== "custom" && pv !== "ninerouter") throw new Error("Isi API Key AI dulu di bagian Setup.");
    if (!model) throw new Error("Isi Model dulu di bagian Setup.");
    var url, h = { "Content-Type": "application/json" }, body;
    if (pv === "openrouter" || pv === "openai" || pv === "ninerouter" || pv === "custom") {
      if (pv === "openrouter") {
        url = "https://openrouter.ai/api/v1/chat/completions";
        h["HTTP-Referer"] = location.origin || "http://localhost:8080";
        h["X-Title"] = "YT AI Player";
      } else if (pv === "openai") {
        url = "https://api.openai.com/v1/chat/completions";
      } else if (pv === "ninerouter") {
        url = normalizeOpenAIEndpoint($("customHost").value, "http://localhost:20128/v1");
      } else {
        url = normalizeOpenAIEndpoint($("customHost").value, "");
        if (!url) throw new Error("Isi Base URL Custom dulu.");
      }

      // Authorization header: kirim Bearer key, fallback ke '9router' untuk host lokal jika kosong
      if (key) {
        h["Authorization"] = "Bearer " + key;
      } else if (pv === "ninerouter" || pv === "custom") {
        h["Authorization"] = "Bearer 9router";
      }

      body = { model: model, stream: true, messages: [{ role: "system", content: sys }, { role: "user", content: user }] };
    } else if (pv === "claude") {
      url = "https://api.anthropic.com/v1/messages";
      h["x-api-key"] = key; h["anthropic-version"] = "2023-06-01"; h["anthropic-dangerous-direct-browser-access"] = "true";
      body = { model: model, max_tokens: 4000, stream: true, system: sys, messages: [{ role: "user", content: user }] };
    } else {
      url = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":streamGenerateContent?alt=sse";
      h["x-goog-api-key"] = key;
      body = { systemInstruction: { parts: [{ text: sys }] }, contents: [{ role: "user", parts: [{ text: user }] }], generationConfig: { temperature: 0.8 } };
    }

    var res;
    try {
      res = await fetch(url, { method: "POST", headers: h, body: JSON.stringify(body), signal: signal });
    } catch (fetchErr) {
      if (fetchErr.name === "AbortError") throw fetchErr;
      var errMsg = fetchErr.message || String(fetchErr);
      if (pv === "ninerouter" || (pv === "custom" && /localhost|127\.0\.0\.1|20128|11434/.test(url))) {
        throw new Error("Gagal koneksi ke local AI (" + url + "): " + errMsg + ". Pastikan 9Router/server lokal sudah berjalan ('9router' di terminal) dan web ini dibuka via http:// (bukan file://).");
      }
      throw new Error("Gagal menghubungi server AI (" + errMsg + "). Periksa koneksi internet / CORS.");
    }

    if (!res.ok) {
      var d = "";
      try {
        var ej = await res.json();
        d = (ej.error && (ej.error.message || ej.error.msg)) || JSON.stringify(ej).slice(0, 250);
      } catch (e) {}
      throw new Error("HTTP " + res.status + ": " + (d || res.statusText));
    }

    var rd = res.body.getReader(), dec = new TextDecoder(), buf = "", full = "";
    while (true) {
      var c = await rd.read();
      if (c.done) break;
      buf += dec.decode(c.value, { stream: true });
      var ls = buf.split("\n");
      buf = ls.pop();
      for (var i = 0; i < ls.length; i++) {
        var t = ls[i].trim();
        if (t.indexOf("data:") !== 0) continue;
        var pl = t.slice(5).trim();
        if (!pl || pl === "[DONE]") continue;
        try {
          var pc = extractDelta(pv, JSON.parse(pl));
          if (pc) { full += pc; onD && onD(full); }
        } catch (e) {}
      }
    }
    // Fallback: jika respons bukan SSE bertahap, cek apakah ada JSON non-streaming
    if (!full.trim() && buf.trim()) {
      try {
        var nonStream = JSON.parse(buf);
        full = extractDelta(pv, nonStream) || (nonStream.choices && nonStream.choices[0] && nonStream.choices[0].message && nonStream.choices[0].message.content) || "";
      } catch (eNS) {}
    }
    return full;
  }

  function parseTracks(txt) {
    var m = txt.match(/\[[\s\S]*\]/); if (!m) throw new Error("AI tidak mengembalikan JSON. Coba lagi / ganti model.");
    var arr = JSON.parse(m[0]); if (!Array.isArray(arr) || !arr.length) throw new Error("Hasil AI kosong.");
    return arr.slice(0, 20).map(function(o, i) { return { title: String(o.title || "Lagu " + (i + 1)), artist: String(o.artist || "Unknown"), genre: String(o.genre || "-"), mood: String(o.mood || "-"), reason: String(o.reason || ""), youtube_query: String(o.youtube_query || ((o.artist || "") + " - " + (o.title || ""))), videoId: o.videoId || null, thumb: o.thumb || null, channel: o.channel || null, score: (typeof o.score === "number" ? o.score : null) }; });
  }

  /* ---------- RELEVANCE SCORING (client-side re-rank) ---------- */
  function normStr(s) {
    return String(s || "").toLowerCase()
      .replace(/[–—‐-]/g, " ").replace(/[''"`]/g, "")
      .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF ]/gi, " ")
      .replace(/\s+/g, " ").trim();
  }
  function toks(s) { s = normStr(s); return s ? s.split(" ") : []; }
  function tokenOverlap(a, b) {
    var ta = toks(a), tb = toks(b);
    if (!ta.length || !tb.length) return 0;
    var setB = {}; tb.forEach(function(w) { setB[w] = 1; });
    var hit = 0; ta.forEach(function(w) { if (setB[w] && w.length > 1) hit++; });
    return hit / Math.max(ta.length, tb.length);
  }
  // Skor kemiripan track vs query user (0-100). Dipakai untuk sort ulang.
  function queryScore(query, t) {
    var q = normStr(query);
    if (!q) return 50;
    var titleS = tokenOverlap(query, t.title);
    var artistS = tokenOverlap(query, t.artist);
    var comboS = tokenOverlap(query, t.artist + " " + t.title);
    var genreS = tokenOverlap(query, t.genre);
    var moodS = tokenOverlap(query, t.mood);
    var qyS = tokenOverlap(query, t.youtube_query);
    var s = comboS * 55 + titleS * 20 + artistS * 20 + qyS * 15 + genreS * 25 + moodS * 20;
    // bonus: query menyebut artis/genre persis
    if (artistS >= 0.99 && toks(t.artist).length) s += 15;
    if (titleS >= 0.99 && toks(t.title).length) s += 25;
    // pakai score AI jika ada (bobot 40%)
    if (typeof t.score === "number") s = s * 0.6 + Math.max(0, Math.min(100, t.score)) * 0.4;
    return Math.max(0, Math.min(100, Math.round(s)));
  }
  function sortByRelevance(query, tracks) {
    var scored = tracks.map(function(t) { t._qscore = queryScore(query, t); return t; });
    scored.sort(function(a, b) { return (b._qscore || 0) - (a._qscore || 0); });
    return scored;
  }
  // Pilih video kandidat yang judul/channel-nya paling mirip dengan track (bukan asal items[0])
  function pickBestVideo(cands, t) {
    // cands: [{id, title, ch, thumb}]
    if (!cands || !cands.length) return null;
    var want = normStr(t.artist + " " + t.title);
    var best = null, bestS = -1;
    for (var i = 0; i < cands.length; i++) {
      var c = cands[i];
      var ct = normStr((c.title || "") + " " + (c.ch || ""));
      var s = tokenOverlap(want, ct) * 60 + tokenOverlap(t.title, c.title) * 40 + tokenOverlap(t.artist, (c.title || "") + " " + (c.ch || "")) * 30;
      // penalti: live/cover/remix/karaoke/instrumental yang tidak diminta
      var low = " " + ct + " ";
      var isLive = low.indexOf(" live ") >= 0 || low.indexOf(" concert ") >= 0;
      var isCover = low.indexOf(" cover ") >= 0 || low.indexOf(" karaoke ") >= 0;
      var wantLive = normStr(t.youtube_query + " " + t.title).indexOf("live") >= 0;
      var wantCover = normStr(t.youtube_query).indexOf("cover") >= 0;
      if (isLive && !wantLive) s -= 15;
      if (isCover && !wantCover) s -= 18;
      if (low.indexOf(" remix ") >= 0 && normStr(t.youtube_query).indexOf("remix") < 0) s -= 10;
      // bonus posisi atas (hasil search engine sudah ranking)
      s += Math.max(0, 6 - i * 2);
      if (s > bestS) { bestS = s; best = c; }
    }
    // kalau skor terbaik terlalu rendah (<15), tetap kembalikan #1 agar tidak kosong, tapi tandai
    if (bestS < 15) { best = cands[0]; best._lowConf = true; }
    else best._lowConf = false;
    return best;
  }

  /* ---------- YOUTUBE RESOLVE ---------- */
  var PIPED = ["https://pipedapi.adminforge.de", "https://pipedapi.reallyaweso.me", "https://pipedapi.leptons.xyz", "https://pipedapi.nosebs.ru", "https://pipedapi-libre.kavin.rocks", "https://piped-api.privacy.com.de", "https://api.piped.yt", "https://pipedapi.drgns.space", "https://pipedapi.owo.si", "https://pipedapi.ducks.party", "https://piped-api.codespace.cz", "https://api.piped.private.coffee", "https://pipedapi.darkness.services", "https://pipedapi.orangenet.cc", "https://pipedapi.kavin.rocks"];
  var INVIDIOUS = ["https://inv.invidious.nerdvpn.de", "https://invidious.0011.lt", "https://iv.duti.dev", "https://invidious.jing.rocks", "https://yt.artemislena.eu"];
  var SCRAPE_PROXIES = ["allorigins-get", "allorigins-raw", "codetabs", "corsproxy"];

  function fetchTimeout(url, ms) {
    var c = new AbortController(); var t = setTimeout(function() { c.abort(); }, ms || 7000);
    return fetch(url, { signal: c.signal }).finally(function() { clearTimeout(t); });
  }

  function friendlyNetErr(e) {
    var m = (e && e.message) || String(e);
    if (/failed to fetch|networkerror|load failed|abort/i.test(m)) return "jaringan/CORS/adblock memblokir resolver";
    return m.slice(0, 120);
  }

  async function resolveViaYTKey(t, key) {
    var u = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=" + encodeURIComponent(t.youtube_query) + "&key=" + encodeURIComponent(key);
    var r = await fetchTimeout(u, 9000); if (!r.ok) throw new Error("YT API " + r.status);
    var j = await r.json(); var items = (j.items || []).filter(function(it) { return it && it.id && it.id.videoId; });
    if (!items.length) throw new Error("YT API kosong");
    var cands = items.map(function(it) {
      var sn = it.snippet || {};
      return { id: it.id.videoId, title: sn.title || "", ch: sn.channelTitle || "", thumb: (sn.thumbnails && (sn.thumbnails.medium || sn.thumbnails.default || {}).url) || null };
    });
    var best = pickBestVideo(cands, t);
    var full = items.filter(function(it) { return it.id.videoId === best.id; })[0] || items[0];
    t.videoId = best.id;
    if (best.thumb) t.thumb = best.thumb; if (best.ch) t.channel = best.ch;
    if (!t.thumb || !t.channel) {
      var sn2 = (full && full.snippet) || {};
      t.thumb = t.thumb || (sn2.thumbnails && (sn2.thumbnails.medium || sn2.thumbnails.default || {}).url) || t.thumb;
      t.channel = t.channel || sn2.channelTitle || t.channel;
    }
    t._via = "youtube-api"; return t;
  }

  async function resolveViaPiped(t) {
    var q = encodeURIComponent(t.youtube_query); var errs = [];
    for (var k = 0; k < PIPED.length; k++) {
      try {
        var r = await fetchTimeout(PIPED[k] + "/search?q=" + q + "&filter=videos", 7000);
        if (!r.ok) { errs.push(PIPED[k] + " http " + r.status); continue; }
        var j = await r.json(); var items = j.items || j || [];
        var cands = [];
        for (var i = 0; i < items.length && cands.length < 8; i++) { var it = items[i]; var url = it.url || ""; var m = url.match(/v=([A-Za-z0-9_-]{11})/); if (m) { cands.push({ id: m[1], title: it.title || "", thumb: (it.thumbnail || "").replace(/^http:/, "https:"), ch: it.uploaderName || "" }); } }
        if (cands.length) { var v = pickBestVideo(cands, t); t.videoId = v.id; if (v.thumb) t.thumb = v.thumb; if (v.ch) t.channel = v.ch; t._via = "piped"; if (v._lowConf) t._lowConf = true; return t; }
        errs.push(PIPED[k] + " kosong");
      } catch (e) { errs.push(PIPED[k] + " " + friendlyNetErr(e)); }
    }
    throw new Error("piped gagal semua: " + errs.slice(0, 3).join(" | "));
  }

  async function resolveViaInvidious(t) {
    var q = encodeURIComponent(t.youtube_query); var errs = [];
    for (var k = 0; k < INVIDIOUS.length; k++) {
      try {
        var r = await fetchTimeout(INVIDIOUS[k] + "/api/v1/search?q=" + q + "&type=video&page=1", 7000);
        if (!r.ok) { errs.push("invidious http " + r.status); continue; }
        var j = await r.json();
        var cands = [];
        for (var i = 0; i < j.length && cands.length < 8; i++) { if (j[i].videoId && /^[A-Za-z0-9_-]{11}$/.test(j[i].videoId)) { cands.push({ id: j[i].videoId, title: j[i].title || "", ch: j[i].author || "", raw: j[i] }); } }
        if (cands.length) {
          var v = pickBestVideo(cands, t);
          t.videoId = v.id; if (v.ch) t.channel = v.ch;
          try { var th = (v.raw && v.raw.videoThumbnails) || []; var best = null; for (var x = 0; x < th.length; x++) { if (th[x].quality === "medium") { best = th[x].url; break; } } t.thumb = best || th[0] && th[0].url || t.thumb; } catch (e2) {}
          if (v._lowConf) t._lowConf = true;
          t._via = "invidious"; return t;
        }
        errs.push("invidious kosong");
      } catch (e) { errs.push(friendlyNetErr(e)); }
    }
    throw new Error("invidious gagal: " + errs.slice(0, 3).join(" | "));
  }

  function extractVideoIds(html) {
    var out = [], seen = {}; var re = /"videoId":"([A-Za-z0-9_-]{11})"/g; var m;
    while ((m = re.exec(html)) && out.length < 5) { if (!seen[m[1]]) { seen[m[1]] = 1; out.push(m[1]); } }
    if (!out.length) { var re2 = /watch\?v=([A-Za-z0-9_-]{11})/g; while ((m = re2.exec(html)) && out.length < 5) { if (!seen[m[1]]) { seen[m[1]] = 1; out.push(m[1]); } } }
    return out;
  }

  async function resolveViaScrape(t) {
    var target = "https://www.youtube.com/results?search_query=" + encodeURIComponent(t.youtube_query);
    var errs = [];
    for (var k = 0; k < SCRAPE_PROXIES.length; k++) {
      try {
        var mode = SCRAPE_PROXIES[k], html = "";
        if (mode === "allorigins-get") { var r = await fetchTimeout("https://api.allorigins.win/get?url=" + encodeURIComponent(target), 9000); if (!r.ok) throw new Error("http " + r.status); var j = await r.json(); html = j.contents || ""; }
        else if (mode === "allorigins-raw") { var r2 = await fetchTimeout("https://api.allorigins.win/raw?url=" + encodeURIComponent(target), 9000); if (!r2.ok) throw new Error("http " + r2.status); html = await r2.text(); }
        else if (mode === "codetabs") { var r3 = await fetchTimeout("https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(target), 9000); if (!r3.ok) throw new Error("http " + r3.status); html = await r3.text(); }
        else { var r4 = await fetchTimeout("https://corsproxy.io/?url=" + encodeURIComponent(target), 9000); if (!r4.ok) throw new Error("http " + r4.status); html = await r4.text(); }
        var ids = extractVideoIds(html);
        if (ids.length) { t.videoId = ids[0]; t.thumb = "https://i.ytimg.com/vi/" + ids[0] + "/mqdefault.jpg"; t._via = "scrape"; return t; }
        errs.push(mode + " kosong");
      } catch (e) { errs.push(mode + " " + friendlyNetErr(e)); }
    }
    throw new Error("scrape gagal: " + errs.join(" | "));
  }

  async function resolveYT(t) {
    if (t.videoId) return t;
    var key = $("ytkey").value.trim();
    if (key) { try { return await resolveViaYTKey(t, key); } catch (e) { t._keyErr = e.message; } }
    var errs = [];
    try { return await resolveViaPiped(t); } catch (e) { errs.push(e.message); }
    try { return await resolveViaInvidious(t); } catch (e) { errs.push(e.message); }
    try { return await resolveViaScrape(t); } catch (e) { errs.push(e.message); }
    throw new Error("Semua resolver gagal. " + errs.join(" ‖ ").slice(0, 300) + " — isi YouTube Data API key, matikan adblock/VPN, atau buka via tombol tautan.");
  }

  function ytOrigin() { try { if (location.origin && location.origin !== "null") return location.origin; } catch (e) {} return ""; }
  function embedURL(t) { var org = ytOrigin(); var extra = "autoplay=1&rel=0&enablejsapi=1" + (org ? "&origin=" + encodeURIComponent(org) : ""); if (t.videoId) return "https://www.youtube.com/embed/" + t.videoId + "?" + extra; return "about:blank"; }
  function ytLink(t) { if (t.videoId) return "https://www.youtube.com/watch?v=" + t.videoId; return "https://www.youtube.com/results?search_query=" + encodeURIComponent(t.youtube_query); }

  /* ---------- VIEWS & RENDER ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function(c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function viewTracks() {
    if (state.view.kind === "search") return state.searchTracks;
    if (state.view.kind === "history") return state.store.history;
    var p = state.store.playlists.find(function(x) { return x.id === state.view.id; });
    return p ? p.tracks : [];
  }

  function viewTitle() {
    if (state.view.kind === "search") return state.lastQuery ? ("Hasil AI: " + state.lastQuery) : "Hasil AI";
    if (state.view.kind === "history") return "Riwayat Putar";
    var p = state.store.playlists.find(function(x) { return x.id === state.view.id; });
    return "Playlist: " + (p ? p.name : "(dihapus)");
  }

  function coverHTML(t, playing) {
    var playBtn = '<div class="overlay">' + I.play + '</div>';
    var badge = '<div class="eq-badge"><div class="eq-bars"><span></span><span></span><span></span></div>PLAYING</div>';
    if (t.thumb) return '<div class="track-cover"><img loading="lazy" src="' + esc(t.thumb) + '" alt=""/>' + (playing ? badge : playBtn) + '</div>';
    var ch = esc((t.title || "?").trim().charAt(0).toUpperCase());
    return '<div class="track-cover"><div class="cover-fallback">' + ch + '</div>' + (playing ? badge : playBtn) + '</div>';
  }

  function currentKey() { var t = state.queue[state.qi]; return t ? t.youtube_query + "|" + (t.videoId || "") : ""; }

  function renderNav() {
    $("cntSearch").textContent = state.searchTracks.length;
    $("cntHistory").textContent = state.store.history.length;
    $("navSearch").classList.toggle("active", state.view.kind === "search");
    $("navHistory").classList.toggle("active", state.view.kind === "history");
    var w = $("plList"); w.innerHTML = "";
    state.store.playlists.forEach(function(p) {
      var b = document.createElement("button");
      b.className = "nav-btn" + (state.view.kind === "pl" && state.view.id === p.id ? " active" : "");
      b.innerHTML = (p.id === "fav" ? I.heart : I.music) + "<span>" + esc(p.name) + "</span><span class='cnt'>" + p.tracks.length + "</span>";
      b.onclick = function() { curPl = p.id; state.view = { kind: "pl", id: p.id }; state.visible = PAGE; renderAll(false); };
      w.appendChild(b);
    });
  }

  function renderResults(save) {
    var list = viewTracks();
    var w = $("results"); w.innerHTML = "";
    var inSearch = state.view.kind === "search";
    $("btnBack").classList.toggle("hidden", inSearch || !state.searchTracks.length);
    if ($("btnPlayAll")) $("btnPlayAll").classList.toggle("hidden", !list.length);
    $("resTitle").textContent = viewTitle();
    var okN = list.filter(function(t) { return t.videoId; }).length;
    $("resSub").textContent = list.length ? (list.length + " lagu (" + okN + " siap play) · klik cover / play untuk memutar · ikon tautan untuk buka di YouTube · ikon plus untuk simpan") : (inSearch ? "Belum ada. Cari dulu di atas / klik Demo." : "Playlist ini masih kosong. Tambahkan dari hasil pencarian (tombol plus).");
    var slice = list.slice(0, state.visible);
    slice.forEach(function(t) {
      var idx = list.indexOf(t);
      var isCur = currentKey() && (t.youtube_query + "|" + (t.videoId || "") === currentKey());
      var d = document.createElement("div"); d.className = "track" + (isCur ? " playing" : "");
      var matchPct = (typeof t._qscore === "number") ? t._qscore : (typeof t.score === "number" ? t.score : null);
      var matchBadge = (matchPct != null && state.view.kind === "search") ? '<span class="tag match" title="Skor kemiripan dengan pencarian">' + matchPct + '% mirip</span>' : '';
      var lowWarn = t._lowConf ? ' · <span style="color:var(--warning)">cek video (judul mirip rendah)</span>' : '';
      d.innerHTML = coverHTML(t, isCur) + '<div class="track-body"><div class="track-title">' + esc(t.title) + '</div><div class="track-artist">' + esc(t.artist) + (t.channel ? ' · ' + esc(t.channel) : '') + (t.videoId ? lowWarn : ' · <span style="color:var(--warning)">belum resolve</span>') + '</div><div class="track-tags"><span class="tag">' + esc(t.genre) + '</span><span class="tag mood">' + esc(t.mood) + '</span>' + matchBadge + '</div><div class="track-reason">' + esc(t.reason) + '</div><div class="track-actions">' + (t.videoId ? '<button class="play-btn" data-a="play" title="Putar">' + I.play + '</button>' : '<button data-a="retry" title="Coba resolve lagi">' + I.retry + '</button>') + '<button data-a="yt" title="Buka di YouTube">' + I.ext + '</button><button data-a="add" title="Tambah ke playlist aktif">' + I.plus + '</button><button data-a="like" class="like-btn' + (isLiked(t) ? ' liked' : '') + '" title="Suka">' + (isLiked(t) ? I.heartFill : I.heart) + '</button></div></div></div>';
      d.querySelector(".track-cover").onclick = function() { playFromView(idx); };
      var pb = d.querySelector('[data-a="play"]'); if (pb) pb.onclick = function() { playFromView(idx); };
      var rb = d.querySelector('[data-a="retry"]'); if (rb) rb.onclick = function() { retryOne(t, rb); };
      d.querySelector('[data-a="yt"]').onclick = function(e) { e.stopPropagation(); window.open(ytLink(t), "_blank"); };
      d.querySelector('[data-a="add"]').onclick = function(e) { e.stopPropagation(); addToPlaylist(t); };
      d.querySelector('[data-a="like"]').onclick = function(e) { e.stopPropagation(); toggleLike(t); renderAll(false); };
      w.appendChild(d);
    });
    $("btnMoreClient").classList.toggle("hidden", !(list.length > state.visible));
    if (list.length > state.visible) $("btnMoreClient").textContent = "Tampilkan lebih banyak (" + (list.length - state.visible) + " lagi)";
    var canMoreAI = inSearch && !!state.lastQuery;
    $("btnMoreAI").classList.toggle("hidden", !canMoreAI);
    if (save !== false && inSearch) saveStore();
  }

  function renderQueue() {
    var w = $("queue"); w.innerHTML = "";
    if (!state.queue.length) { w.innerHTML = '<p class="hint">Antrean kosong. Play dari hasil.</p>'; }
    state.queue.forEach(function(t, i) {
      var d = document.createElement("div"); d.className = "qrow" + (i === state.qi ? " cur" : "");
      d.innerHTML = (t.thumb ? '<img src="' + esc(t.thumb) + '" alt=""/>' : "") + "<span class='qrow-title'><b>" + esc(t.title) + "</b><br/><small>" + esc(t.artist) + "</small></span>" + (i === state.qi ? '<span class="qrow-speaker" title="Sedang diputar">' + I.vol + '</span>' : "");
      d.onclick = function() { playQueue(state.queue, i, true); };
      w.appendChild(d);
    });
    var dw = $("queueDrawer"); if (dw) { dw.innerHTML = w.innerHTML; var rows = dw.querySelectorAll(".qrow"); rows.forEach(function(r, i) { r.onclick = function() { playQueue(state.queue, i, true); }; }); }
  }

  function renderAll(save) { renderNav(); renderResults(save); renderQueue(); }

  async function retryOne(t, btn) {
    btn.innerHTML = "…"; btn.disabled = true;
    try { await resolveYT(t); flash("ok", "Resolve OK: " + t.title + " ✓"); } catch (e) { flash("err", e.message); }
    renderAll(false);
  }

  function playFromView(idx) { var list = viewTracks(); playQueue(list.slice(), idx); }

  function addToPlaylist(t) {
    var p = state.store.playlists.find(function(x) { return x.id === curPl; }) || state.store.playlists[0];
    if (p.tracks.some(function(x) { return x.youtube_query === t.youtube_query; })) { flash("ok", "Sudah ada di " + p.name); return; }
    p.tracks.push(Object.assign({}, t)); saveStore(); renderNav(); flash("ok", "Ditambah ke " + p.name + ". Buka playlist untuk melihat, tombol kembali untuk balik ke hasil.");
  }

  function toggleLike(t) {
    var f = state.store.playlists.find(function(p) { return p.id === "fav"; });
    if (!f) return;
    var i = f.tracks.findIndex(function(x) { return x.youtube_query === t.youtube_query; });
    if (i >= 0) f.tracks.splice(i, 1); else f.tracks.push(Object.assign({}, t));
    saveStore(); renderAll(false);
  }

  function flash(id, msg) { var e = $(id); e.textContent = msg; e.classList.add("show"); clearTimeout(e._t); e._t = setTimeout(function() { e.classList.remove("show"); }, 4000); }
  function showErr(m) { var e = $("err"); e.textContent = m; e.classList.add("show"); }

  function showSkeleton(n) {
    var w = $("results"); w.innerHTML = "";
    for (var i = 0; i < (n || 6); i++) { var d = document.createElement("div"); d.className = "skel"; d.innerHTML = '<div class="skel-cover"></div><div class="skel-body"><div class="skel-line medium"></div><div class="skel-line short"></div><div class="skel-line"></div></div>'; w.appendChild(d); }
  }

  /* ---------- PLAYER (YT IFrame API) ---------- */
  var ytObj = null, ytReady = false, progTimer = null, pendingVid = null, nextLock = 0, apiFailed = false;

  window.onYouTubeIframeAPIReady = function() {
    ytReady = true; apiFailed = false;
    try { $("ytFallbackMsg").classList.add("hidden"); } catch (e) {}
    if (pendingVid) { var v = pendingVid; pendingVid = null; ensurePlayer(v); }
  };

  setTimeout(function() {
    if (!ytReady && !ytObj) {
      apiFailed = true;
      try {
        var m = $("ytFallbackMsg");
        m.textContent = "YT API diblokir (adblock/file://?). Buka via http://localhost + matikan adblock. Mode fallback: video tetap bisa play tapi progress/autoplay terbatas.";
        m.classList.remove("hidden");
      } catch (e) {}
      if (pendingVid) loadFallbackIframe(pendingVid);
    }
  }, 8000);

  function ensurePlayer(videoId) {
    if (!window.YT || !YT.Player) return false;
    try { if (ytObj && ytObj.destroy) { try { ytObj.destroy(); } catch (e0) {} } } catch (e) {}
    ytObj = null;
    try {
      var old = document.getElementById("ytPlayer"); if (old) old.remove();
      var box = document.querySelector(".p-video-box");
      var nd = document.createElement("div"); nd.id = "ytPlayer";
      if (box) box.insertBefore(nd, box.firstChild);
    } catch (e) {}
    try {
      ytObj = new YT.Player("ytPlayer", { height: "220", width: "100%", videoId: videoId, playerVars: { autoplay: 1, rel: 0, playsinline: 1 }, events: { onStateChange: onYTState, onError: onYTError, onReady: onYTReady } });
      return true;
    } catch (e) { ytObj = null; return false; }
  }

  function loadFallbackIframe(videoId) {
    try {
      var box = document.querySelector(".p-video-box");
      var old = box && box.querySelector("iframe.fallback");
      if (old) old.remove();
      var f = document.createElement("iframe");
      f.className = "fallback"; f.title = "player";
      f.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture"; f.allowFullscreen = true;
      var t = state.queue[state.qi];
      f.src = t ? embedURL(t) : ("https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0");
      box.appendChild(f);
      try { $("ytPlayer").style.display = "none"; } catch (e) {}
    } catch (e) {}
  }

  function onYTReady() { try { ytObj.setVolume($("vol").value); } catch (e) {} try { ytObj.playVideo(); } catch (e) {} startProg(); retryLyricsWithDuration(); }

  /* ---------- DRAWER TABS ---------- */
  function switchDrawerTab(name) {
    try {
      var tabs = document.querySelectorAll(".ptab");
      for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("active", tabs[i].getAttribute("data-tab") === name);
      var panes = document.querySelectorAll("[data-pane]");
      for (var j = 0; j < panes.length; j++) panes[j].classList.toggle("hidden", panes[j].getAttribute("data-pane") !== name);
    } catch (e) {}
  }

  (function() {
    try {
      var tabs = document.querySelectorAll(".ptab");
      for (var i = 0; i < tabs.length; i++) (function(b) { b.addEventListener("click", function() { switchDrawerTab(b.getAttribute("data-tab")); setExpanded(true); }); })(tabs[i]);
    } catch (e) {}
  })();

  /* ---------- LYRICS (LRCLIB, synced LRC) ---------- */
  var LYR_LS = "ytmusic_lyr_v1", lyrMem = {}, lyrActiveIdx = -1, lyrForKey = "";

  function lyrTrackKey(t) { return String((t.artist || "") + "|" + (t.title || "")).toLowerCase(); }

  function lyrCacheGet(k) {
    if (lyrMem[k]) return lyrMem[k];
    try { var all = JSON.parse(localStorage.getItem(LYR_LS) || "{}"); if (all[k]) { lyrMem[k] = all[k]; return all[k]; } } catch (e) {}
    return null;
  }

  function lyrCacheSet(k, v) {
    lyrMem[k] = v;
    try {
      var all = {}; try { all = JSON.parse(localStorage.getItem(LYR_LS) || "{}"); } catch (e) {}
      all[k] = v; var keys = Object.keys(all);
      if (keys.length > 200) { for (var i = 0; i < keys.length - 200; i++) delete all[keys[i]]; }
      localStorage.setItem(LYR_LS, JSON.stringify(all));
    } catch (e) {}
  }

  function parseLRC(lrc) {
    var out = []; if (!lrc) return out;
    var lines = String(lrc).split("\n");
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i]; if (!ln) continue;
      var re = /\[(\d+):(\d+(?:\.\d+)?)\]/g, m, times = [];
      while ((m = re.exec(ln))) { times.push(parseInt(m[1], 10) * 60 + parseFloat(m[2])); }
      var text = ln.replace(/\[.*?\]/g, "").trim();
      if (!times.length || !text) continue;
      for (var k = 0; k < times.length; k++) out.push({ sec: times[k], text: text });
    }
    out.sort(function(a, b) { return a.sec - b.sec; });
    return out;
  }

  function renderLyrics() {
    var t = state.queue[state.qi];
    var box = $("lyrBox"), st = $("lyrStatus"), meta = $("lyrMeta"), src = $("lyrSrc"), warn = $("lyrWarn"), dot = $("lyrDot");
    if (box) box.innerHTML = ""; lyrActiveIdx = -1;
    if (!t) { if (st) st.textContent = "Belum ada lagu. Putar dulu, lirik menyusul otomatis."; if (meta) meta.textContent = ""; if (src) src.textContent = ""; lyrForKey = ""; return; }
    var key = lyrTrackKey(t); lyrForKey = key;
    var lyr = t._lyr;
    if (meta) meta.textContent = "· " + t.artist + " - " + t.title;
    if (!lyr) {
      if (st) { st.textContent = "Mencari lirik…"; st.classList.remove("hidden"); }
      if (src) src.textContent = ""; if (warn) warn.classList.add("hidden");
      if (dot) dot.classList.remove("hidden");
      return;
    }
    if (dot) dot.classList.add("hidden");
    if (lyr.instrumental) {
      if (st) { st.textContent = "Lagu instrumental — tidak ada lirik."; st.classList.remove("hidden"); }
      if (src) src.textContent = "via LRCLIB";
      if (warn) warn.classList.add("hidden");
      return;
    }
    if (!lyr.lines || !lyr.lines.length) {
      if (st) {
        st.classList.remove("hidden");
        st.innerHTML = "";
        var sp = document.createElement("span"); sp.textContent = "Lirik tidak ketemu di LRCLIB. ";
        var a = document.createElement("a"); a.href = "https://www.google.com/search?q=" + encodeURIComponent(t.artist + " " + t.title + " lirik"); a.target = "_blank"; a.rel = "noopener"; a.textContent = "Cari manual";
        st.appendChild(sp); st.appendChild(a);
      }
      if (src) src.textContent = ""; if (warn) warn.classList.add("hidden");
      return;
    }
    if (st) st.classList.add("hidden");
    if (src) src.textContent = lyr.synced ? "synced · via LRCLIB" : "plain · via LRCLIB";
    if (warn) {
      if (lyr.driftWarn) { warn.textContent = "Sync bisa meleset: durasi video YouTube beda jauh dari versi studio."; warn.classList.remove("hidden"); }
      else warn.classList.add("hidden");
    }
    for (var i = 0; i < lyr.lines.length; i++) {
      (function(line, idx) {
        var b = document.createElement("button");
        b.className = "lrow" + (line.sec == null ? " plain" : "");
        b.textContent = line.text;
        if (line.sec != null) b.onclick = function() { try { ytObj.seekTo(line.sec, true); } catch (e) {} };
        b.setAttribute("data-idx", idx);
        box.appendChild(b);
      })(lyr.lines[i], i);
    }
  }

  function syncLyrics(c) {
    var t = state.queue[state.qi];
    if (!t || !t._lyr || !t._lyr.synced || !t._lyr.lines || !t._lyr.lines.length) return;
    if (lyrForKey !== lyrTrackKey(t)) return;
    var lines = t._lyr.lines, idx = -1;
    for (var i = 0; i < lines.length; i++) { if (lines[i].sec != null && lines[i].sec <= c + 0.15) idx = i; else break; }
    if (idx === lyrActiveIdx) return;
    lyrActiveIdx = idx;
    try {
      var box = $("lyrBox"); if (!box) return;
      var rows = box.querySelectorAll(".lrow");
      for (var j = 0; j < rows.length; j++) {
        rows[j].classList.toggle("active", j === idx);
        rows[j].classList.toggle("past", j < idx);
      }
      var cur = box.querySelector(".lrow.active");
      if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "center", behavior: "smooth" });
    } catch (e) {}
  }

  function applyLyricData(t, data, ytDur) {
    var key = lyrTrackKey(t);
    if (!data || (!data.syncedLyrics && !data.plainLyrics)) { t._lyr = { lines: [], synced: false, plain: false }; }
    else if (data.instrumental || data.instrumental === true) { t._lyr = { lines: [], synced: false, plain: false, instrumental: true }; }
    else {
      var lines = parseLRC(data.syncedLyrics);
      if (lines.length) {
        var drift = false;
        try { var ld = parseFloat(data.duration) || 0; if (ld > 30 && ytDur > 30 && Math.abs(ld - ytDur) > 30) drift = true; } catch (e) {}
        t._lyr = { lines: lines, synced: true, plain: !!data.plainLyrics, driftWarn: drift };
      } else if (data.plainLyrics) {
        var pl = String(data.plainLyrics).split("\n").map(function(x) { return { sec: null, text: x.trim() }; }).filter(function(x) { return x.text; });
        t._lyr = { lines: pl, synced: false, plain: true };
      } else { t._lyr = { lines: [], synced: false, plain: false }; }
    }
    lyrCacheSet(key, t._lyr);
    if (lyrTrackKey(state.queue[state.qi]) === key) renderLyrics();
    try { renderAll(false); } catch (e) {}
  }

  async function fetchLyrics(t, withDur) {
    var key = lyrTrackKey(t);
    if (t._lyrLoading === key) return;
    var cached = lyrCacheGet(key);
    if (cached) { t._lyr = cached; if (lyrTrackKey(state.queue[state.qi]) === key) renderLyrics(); return; }
    t._lyrLoading = key;
    if (lyrTrackKey(state.queue[state.qi]) === key) renderLyrics();
    var ytDur = 0;
    try { if (withDur && ytObj && ytObj.getDuration) ytDur = ytObj.getDuration() || 0; } catch (e) {}
    try {
      var data = null;
      if (withDur && ytDur > 30) {
        var u1 = "https://lrclib.net/api/get?artist_name=" + encodeURIComponent(t.artist || "") + "&track_name=" + encodeURIComponent(t.title || "") + "&duration=" + encodeURIComponent(Math.round(ytDur));
        var r1 = await fetchTimeout(u1, 8000);
        if (r1.ok) { try { data = await r1.json(); } catch (e) { data = null; } }
        if (!data || (!data.syncedLyrics && !data.plainLyrics)) data = null;
      }
      if (!data) {
        var u2 = "https://lrclib.net/api/search?track_name=" + encodeURIComponent(t.title || "") + "&artist_name=" + encodeURIComponent(t.artist || "");
        var r2 = await fetchTimeout(u2, 8000);
        if (r2.ok) {
          var arr = await r2.json();
          if (arr && arr.length) {
            var norm = function(s) { return String(s || "").toLowerCase().trim(); };
            var best = null;
            for (var i = 0; i < arr.length; i++) { if (norm(arr[i].artistName) === norm(t.artist)) { best = arr[i]; if (arr[i].syncedLyrics) break; } }
            if (!best) best = arr[0];
            data = best;
          }
        }
      }
      t._lyrLoading = null;
      if (lyrTrackKey(t) !== key) return;
      applyLyricData(t, data, ytDur);
    } catch (e) { t._lyrLoading = null; }
  }

  function loadLyricsFor(t) { try { fetchLyrics(t, false); } catch (e) {} }

  function retryLyricsWithDuration() {
    try {
      var t = state.queue[state.qi]; if (!t) return;
      if (t._lyr && t._lyr.lines && t._lyr.lines.length) return;
      if (t._lyrRetriedDur) return; t._lyrRetriedDur = true;
      fetchLyrics(t, true);
    } catch (e) {}
  }

  function canAdvance() { var n = Date.now(); if (n - nextLock < 2500) return false; nextLock = n; return true; }

  function playNextAuto() {
    if (state.qi < state.queue.length - 1) {
      if (!canAdvance()) return;
      playQueue(state.queue, state.qi + 1, true);
    } else {
      state.playing = false; setPlayIcon(false);
      var t = state.queue[state.qi];
      if (t) $("pNow").textContent = "Antrean selesai ✓";
    }
  }

  function onYTState(e) {
    var st = e.data;
    var ENDED = (window.YT && YT.PlayerState) ? YT.PlayerState.ENDED : 0;
    var PLAYING = (window.YT && YT.PlayerState) ? YT.PlayerState.PLAYING : 1;
    var PAUSED = (window.YT && YT.PlayerState) ? YT.PlayerState.PAUSED : 2;
    var CUED = (window.YT && YT.PlayerState) ? YT.PlayerState.CUED : 5;
    try { console.log("[player] state:", st, "qi:", state.qi, "len:", state.queue.length); } catch (err) {}
    if (st === ENDED) { playNextAuto(); }
    else if (st === PLAYING) { state.playing = true; setPlayIcon(true); nextLock = 0; startProg(); retryLyricsWithDuration(); }
    else if (st === PAUSED) { state.playing = false; setPlayIcon(false); }
    else if (st === CUED) { try { ytObj.playVideo(); } catch (e) {} }
  }

  function onYTError() {
    var t = state.queue[state.qi];
    if (t) $("pNow").textContent = "Video error/dibatasi embed — lanjut ke berikutnya… (" + t.title + ")";
    if (state.qi < state.queue.length - 1) {
      if (!canAdvance()) return;
      setTimeout(function() { playQueue(state.queue, state.qi + 1, true); }, 800);
    } else { state.playing = false; setPlayIcon(false); }
  }

  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  function startProg() {
    stopProg();
    progTimer = setInterval(function() {
      if (!ytObj || !ytObj.getDuration) return;
      try {
        var d = 0, c = 0;
        try { d = ytObj.getDuration() || 0; } catch (eD) { d = 0; }
        try { c = ytObj.getCurrentTime() || 0; } catch (eC) { c = 0; }
        if (d > 0) {
          var pct = Math.min(100, Math.max(0, c / d * 100));
          $("progFill").style.width = pct + "%"; $("tCur").textContent = fmt(c); $("tDur").textContent = fmt(d);
        }
        try { syncLyrics(c); } catch (eL) {}
        if (d > 10 && c > 1 && (d - c) < 1.0) { playNextAuto(); return; }
        try {
          var ps = null;
          if (ytObj.getPlayerState) ps = ytObj.getPlayerState();
          if (ps === 0 && d > 0) { playNextAuto(); return; }
        } catch (e2) {}
      } catch (e) {}
    }, 500);
  }

  function stopProg() { if (progTimer) clearInterval(progTimer); progTimer = null; }

  function loadVideo(t) {
    if (!t || !t.videoId) return;
    try { var fb = document.querySelector(".p-video-box iframe.fallback"); if (fb) fb.remove(); } catch (e) {}
    try { $("ytPlayer").style.display = ""; } catch (e2) {}
    try { $("ytFallbackMsg").classList.add("hidden"); } catch (e3) {}
    if (ytObj && ytObj.loadVideoById) {
      pendingVid = null;
      try { ytObj.loadVideoById(t.videoId); return; } catch (e) {}
    }
    if (window.YT && YT.Player && (ytReady || window.YT.loaded)) {
      ytReady = true;
      if (ensurePlayer(t.videoId)) { pendingVid = null; return; }
    }
    pendingVid = t.videoId;
    if (apiFailed) loadFallbackIframe(t.videoId);
  }

  function paintNowPlaying(t) {
    $("pTitle").textContent = t.title;
    $("pArtist").textContent = t.artist + " · " + t.genre;
    if (t.thumb) { $("pThumb").src = t.thumb; $("pThumb").classList.remove("hidden"); $("pThumbFb").classList.add("hidden"); }
    else { $("pThumb").classList.add("hidden"); $("pThumbFb").classList.remove("hidden"); $("pThumbFb").textContent = (t.title || "♪").trim().charAt(0).toUpperCase(); }
    setLikeIcon();
  }

  async function playQueue(list, idx, isQ) {
    if (!isQ) { state.queue = list.slice(); nextLock = 0; }
    state.qi = idx; var t = state.queue[state.qi];
    if (!t) return;
    paintNowPlaying(t);
    state.playing = true;
    $("pNow").textContent = "Memuat…"; setPlayIcon(true); $("tCur").textContent = "0:00"; $("progFill").style.width = "0%";
    if (!t.videoId) {
      try { await resolveYT(t); }
      catch (e) {
        $("pNow").textContent = "Perhatian: " + e.message.slice(0, 140);
        try { if (ytObj && ytObj.stopVideo) ytObj.stopVideo(); } catch (err2) {}
        flash("err", e.message); renderAll(false); pushHistory(t);
        if (state.qi < state.queue.length - 1) { setTimeout(function() { playQueue(state.queue, state.qi + 1, true); }, 1200); }
        return;
      }
    }
    loadVideo(t); paintNowPlaying(t);
    try { t._lyrRetriedDur = false; lyrActiveIdx = -1; loadLyricsFor(t); renderLyrics(); } catch (eL) {}
    $("pNow").textContent = "Memutar via " + (t._via || "youtube") + " · " + (t.channel || "YouTube");
    pushHistory(t); renderAll(false);
  }

  $("btnPlay").onclick = function() {
    if (!ytObj || !ytObj.playVideo) { if (state.queue.length) playQueue(state.queue, Math.max(0, state.qi)); return; }
    try { if (state.playing) { ytObj.pauseVideo(); } else { ytObj.playVideo(); } return; } catch (e) {}
  };

  $("btnNext").onclick = function() { if (state.qi < state.queue.length - 1) playQueue(state.queue, state.qi + 1, true); else flash("ok", "Sudah di lagu terakhir."); };

  $("btnPrev").onclick = function() {
    try { if (ytObj && ytObj.getCurrentTime && ytObj.getCurrentTime() > 3) { ytObj.seekTo(0, true); return; } } catch (e) {}
    if (state.qi > 0) playQueue(state.queue, state.qi - 1, true);
  };

  $("btnOpenYt").onclick = function() { var t = state.queue[state.qi]; if (t) window.open(ytLink(t), "_blank"); };

  $("btnLike").onclick = function() { var t = state.queue[state.qi]; if (t) { toggleLike(t); paintNowPlaying(t); } };

  /* ---------- PLAYER MODE (SPLIT KANAN vs DRAWER BAWAH) ---------- */
  var PM_LS = "ytmusic_player_mode"; // "side" or "bottom"

  function getPlayerMode() {
    var saved = localStorage.getItem(PM_LS);
    if (saved === "side" || saved === "bottom") return saved;
    return (window.innerWidth > 900) ? "side" : "bottom";
  }

  function applyPlayerMode(mode) {
    var isSide = mode === "side";
    $("player").classList.toggle("side-mode", isSide);
    $("player").classList.toggle("bottom-mode", !isSide);

    var sideLabel = $("sideModeLabel");
    if (sideLabel) sideLabel.textContent = isSide ? "Split Kanan" : "Drawer Bawah";

    var sideIcons = document.querySelectorAll(".mode-icon-side");
    var bottomIcons = document.querySelectorAll(".mode-icon-bottom");
    for (var i = 0; i < sideIcons.length; i++) sideIcons[i].classList.toggle("hidden", !isSide);
    for (var j = 0; j < bottomIcons.length; j++) bottomIcons[j].classList.toggle("hidden", isSide);

    if ($("btnPlayerMode")) {
      $("btnPlayerMode").title = isSide ? "Mode: Split Kanan (klik untuk ganti ke Drawer Bawah)" : "Mode: Drawer Bawah (klik untuk ganti ke Split Kanan)";
    }
    if ($("btnToggleSideMode")) {
      $("btnToggleSideMode").title = isSide ? "Ganti ke mode Drawer Bawah" : "Ganti ke mode Split Kanan";
    }

    if ($("playerLayoutSelect")) $("playerLayoutSelect").value = mode;

    var isExp = $("player").classList.contains("expanded");
    document.body.classList.toggle("has-side-player", isExp && isSide);

    localStorage.setItem(PM_LS, mode);
  }

  function togglePlayerMode() {
    var cur = getPlayerMode();
    var next = cur === "side" ? "bottom" : "side";
    applyPlayerMode(next);
    flash("ok", "Tampilan player: " + (next === "side" ? "Split di Sebelah Kanan" : "Drawer di Bawah"));
  }

  function setExpanded(v) {
    $("pDrawer").classList.toggle("open", !!v);
    $("player").classList.toggle("expanded", !!v);
    var isSide = getPlayerMode() === "side";
    document.body.classList.toggle("has-side-player", !!v && isSide);
  }

  $("btnLyrics").onclick = function() { switchDrawerTab("lyrics"); setExpanded(true); };
  $("btnVideo").onclick = function() { setExpanded(!$("player").classList.contains("expanded")); };

  if ($("btnCloseDrawer")) $("btnCloseDrawer").onclick = function() { setExpanded(false); };
  if ($("btnToggleSideMode")) $("btnToggleSideMode").onclick = togglePlayerMode;
  if ($("btnPlayerMode")) $("btnPlayerMode").onclick = togglePlayerMode;
  if ($("playerLayoutSelect")) {
    $("playerLayoutSelect").onchange = function() {
      applyPlayerMode(this.value);
      flash("ok", "Tampilan diubah ke: " + (this.value === "side" ? "Split di Sebelah Kanan" : "Drawer Bawah"));
    };
  }

  /* drag handle (khusus drawer bawah) */
  (function() {
    var handle = $("dragHandle"); if (!handle) return;
    var startY = null, dragging = false, moved = false, baseH = 0;
    function isExpanded() { return $("player").classList.contains("expanded"); }
    function maxDrawer() { return Math.round(window.innerHeight * 0.95); }
    handle.addEventListener("pointerdown", function(e) {
      if (getPlayerMode() === "side") return;
      dragging = true; moved = false; startY = e.clientY;
      baseH = isExpanded() ? maxDrawer() : 0;
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    });
    handle.addEventListener("pointermove", function(e) {
      if (!dragging) return;
      var dy = startY - e.clientY;
      if (Math.abs(startY - e.clientY) > 8) moved = true;
      var h = Math.max(0, Math.min(maxDrawer(), baseH + dy));
      var dr = $("pDrawer");
      dr.classList.add("open");
      dr.style.maxHeight = h + "px";
      e.preventDefault();
    });
    function endDrag(e) {
      if (!dragging) return; dragging = false;
      var dr = $("pDrawer"); dr.style.maxHeight = "";
      if (!moved) { setExpanded(!isExpanded()); return; }
      var dy = startY - e.clientY;
      if (!isExpanded()) setExpanded(dy > 60);
      else setExpanded(dy > -60);
    }
    handle.addEventListener("pointerup", endDrag);
    handle.addEventListener("pointercancel", function() { dragging = false; $("pDrawer").style.maxHeight = ""; });
  })();

  $("vol").oninput = function() { try { ytObj && ytObj.setVolume && ytObj.setVolume($("vol").value); } catch (e) {} };

  $("prog").onclick = function(e) {
    try {
      var r = $("prog").getBoundingClientRect(); var ratio = (e.clientX - r.left) / r.width;
      if (ytObj && ytObj.getDuration && ytObj.seekTo) { ytObj.seekTo(ytObj.getDuration() * ratio, true); }
    } catch (err) {}
  };

  /* ---------- SEARCH + LOAD MORE ---------- */
  var ctl = null;

  /* Sinkronisasi input search topbar dan search card */
  function syncSearchInputs(val) {
    $("q").value = val;
    $("q2").value = val;
  }

  $("q").addEventListener("input", function() { $("q2").value = this.value; });
  $("q2").addEventListener("input", function() { $("q").value = this.value; });
  $("q2").addEventListener("keydown", function(e) { if (e.key === "Enter") go(this.value.trim(), false); });

  $("btnGo").onclick = function() { go($("q").value.trim(), false); };

  $("btnSurprise").onclick = function() {
    var s = ["lofi hip hop buat fokus kerja", "pop Indonesia galau 2020-an", "dangdut koplo paling asik", "K-pop energetic buat workout", "jazz santai malam hari", "rock 2000-an mirip Coldplay", "EDM buat party", "indie folk akustik santai"];
    var pick = s[Math.floor(Math.random() * s.length)]; $("q").value = pick; go(pick, false);
  };

  $("btnDemo").onclick = function() {
    state.searchTracks = [
      { title: "Yellow", artist: "Coldplay", genre: "Alternative Rock", mood: "mellow", reason: "Demo tanpa AI — video ID sudah pasti", youtube_query: "Coldplay - Yellow official audio", videoId: "y6Sxv-sUYtM", thumb: "https://i.ytimg.com/vi/y6Sxv-sUYtM/mqdefault.jpg", channel: "Coldplay" },
      { title: "Fix You", artist: "Coldplay", genre: "Alternative Rock", mood: "emosional", reason: "Demo tanpa AI", youtube_query: "Coldplay - Fix You official audio", videoId: "k4V3Mo61fJM", thumb: "https://i.ytimg.com/vi/k4V3Mo61fJM/mqdefault.jpg", channel: "Coldplay" },
      { title: "lofi hip hop radio — beats to relax/study to", artist: "Lofi Girl", genre: "Lofi", mood: "fokus", reason: "Demo livestream 24/7", youtube_query: "lofi hip hop radio", videoId: "jfKfPfyJRdk", thumb: "https://i.ytimg.com/vi/jfKfPfyJRdk/mqdefault.jpg", channel: "Lofi Girl" },
      { title: "Never Gonna Give You Up", artist: "Rick Astley", genre: "Pop", mood: "test", reason: "Video ID terkenal untuk tes player", youtube_query: "Rick Astley - Never Gonna Give You Up", videoId: "dQw4w9WgXcQ", thumb: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg", channel: "Rick Astley" }
    ];
    state.lastQuery = "Demo"; state.view = { kind: "search" }; state.visible = PAGE;
    renderAll(true); playQueue(state.searchTracks.slice(), 0); flash("ok", "Mode demo ✓ Jika ini bisa play, player OK.");
  };

  $("btnBack").onclick = function() { state.view = { kind: "search" }; renderAll(false); };
  $("navSearch").onclick = function() { state.view = { kind: "search" }; state.visible = PAGE; renderAll(false); };
  $("navHistory").onclick = function() { state.view = { kind: "history" }; state.visible = PAGE + 20; renderAll(false); };
  $("btnMoreClient").onclick = function() { state.visible += PAGE; renderResults(false); };
  $("btnMoreAI").onclick = function() { if (state.lastQuery) go(state.lastQuery, true); };

  if ($("btnPlayAll")) {
    $("btnPlayAll").onclick = function() {
      var list = viewTracks();
      if (!list || !list.length) {
        flash("err", "Belum ada lagu untuk diputar.");
        return;
      }
      playQueue(list.slice(), 0);
      flash("ok", "Memutar semua (" + list.length + " lagu).");
    };
  }

  function setLoadingState(loading) {
    if ($("btnGo")) {
      $("btnGo").classList.toggle("hidden", loading);
      $("btnGo").disabled = loading;
    }
    if ($("btnStopSearch")) {
      $("btnStopSearch").classList.toggle("hidden", !loading);
    }
    if ($("btnMoreAI")) $("btnMoreAI").disabled = loading;
    if ($("loadStatus")) $("loadStatus").classList.toggle("show", loading);
  }

  function stopSearch() {
    if (ctl) {
      ctl.abort();
      ctl = null;
      flash("ok", "Pencarian AI dihentikan.");
    }
    setLoadingState(false);
    renderAll(false);
  }

  if ($("btnStopSearch")) $("btnStopSearch").onclick = stopSearch;
  if ($("btnStopAI")) $("btnStopAI").onclick = stopSearch;

  $("btnNewPl").onclick = function() {
    var n = $("newPl").value.trim(); if (!n) return;
    state.store.playlists.push({ id: "p" + Date.now(), name: esc(n), tracks: [] }); $("newPl").value = ""; saveStore(); renderNav();
  };

  async function go(query, append) {
    $("err").classList.remove("show"); $("ok").classList.remove("show");
    if (!query) { showErr("Tulis dulu genre / mood / contoh lagu."); return; }
    if (ctl) ctl.abort(); ctl = new AbortController();
    setLoadingState(true);
    if (!append) { showSkeleton(6); syncSearchInputs(query); }
    try {
      if (!state.sys) {
        try {
          var r = await fetch("./SYSTEM_PROMPT_MUSIC.md", { signal: ctl.signal });
          if (r.ok) state.sys = await r.text();
        } catch (e) {}
        if (!state.sys) state.sys = FALLBACK_PROMPT;
      }
      if (ctl.signal.aborted) return;
      var exclude = "";
      if (append && state.searchTracks.length) {
        var names = state.searchTracks.map(function(t) { return t.artist + " - " + t.title; }).slice(-30).join("; ");
        exclude = " Hindari lagu ini (sudah ada): " + names + ". Beri lagu LAIN yang masih mirip.";
      }
      var isSpecific = /[-–—]|mirip|versi|cover|official|ft\.?|feat\.?/i.test(query) || toks(query).length <= 5;
      var userMsg = "Input user: \"" + query + "\"\n"
        + "Konteks: " + (isSpecific ? "user menyebut lagu/artis SPESIFIK. Item #1 WAJIB lagu itu persis (score 100)." : "user minta eksplorasi genre/mood. Semua item WAJIB genre+mood+bahasa yang sama.") + "\n"
        + "Kembalikan " + (append ? "10 lagu TAMBAHAN yang berbeda" : "12 lagu PALING MIRIP") + " sebagai JSON array (wajib ada field score 0-100, urut score tertinggi dulu)." + exclude
        + " LARANGAN: jangan beri genre berlawanan, jangan mengarang lagu fiktif, maks 3 lagu per artis.";
      var full = await streamLLM(state.sys, userMsg, function() {
        if (ctl && ctl.signal.aborted) return;
        $("loadText").textContent = "AI menulis… (" + query + ")";
      }, ctl.signal);
      if (ctl.signal.aborted) return;
      var tracks = parseTracks(full);
      var seen = {}; state.searchTracks.forEach(function(t) { seen[(t.artist + "|" + t.title).toLowerCase()] = 1; });
      tracks = tracks.filter(function(t) { var k = (t.artist + "|" + t.title).toLowerCase(); if (seen[k]) return false; seen[k] = 1; return true; });
      // Re-rank: gabungkan score AI + kemiripan kata dengan query, agar yang paling mirip selalu di atas
      tracks = sortByRelevance(query, tracks);
      if (!append) { state.searchTracks = []; state.visible = PAGE; }
      $("loadText").textContent = "Resolve judul → video YouTube…";
      state.searchTracks = state.searchTracks.concat(tracks);
      // Pastikan urutan akhir selalu paling mirip di atas (penting untuk append juga)
      try { state.searchTracks = sortByRelevance(query, state.searchTracks); } catch (eS) {}
      state.lastQuery = query; state.view = { kind: "search" };
      renderAll(true);
      var okN = 0;
      for (var i = 0; i < state.searchTracks.length; i++) {
        if (ctl && ctl.signal.aborted) break;
        var t = state.searchTracks[i];
        if (!t.videoId) { try { await resolveYT(t); okN++; } catch (e) {} }
        if (ctl && ctl.signal.aborted) break;
        if (i % 3 === 0) renderAll(false);
        $("loadText").textContent = "Resolve " + (i + 1) + "/" + state.searchTracks.length + "…";
      }
      renderAll(true);
      if (!ctl || !ctl.signal.aborted) {
        flash("ok", "Dapat " + tracks.length + " lagu baru (" + state.searchTracks.length + " total). Klik tombol play untuk memutar.");
        $("setupCard").open = false;
      }
    } catch (e) {
      if (e.name === "AbortError" || (ctl && ctl.signal.aborted)) {
        flash("ok", "Pencarian AI dihentikan.");
        renderAll(false);
      } else {
        showErr("Gagal: " + e.message);
        renderAll(false);
      }
    }
    finally {
      setLoadingState(false);
      ctl = null;
    }
  }

  /* chips */
  (function() {
    var list = [["Lofi kerja", "lofi hip hop buat fokus kerja"], ["Galau Indo", "pop Indonesia galau"], ["Dangdut koplo", "dangdut koplo paling asik"], ["K-pop workout", "K-pop energetic buat workout"], ["Jazz malam", "jazz santai malam hari"], ["Rock 2000an", "rock 2000-an mirip Coldplay"]];
    var w = $("chips"); list.forEach(function(c) { var b = document.createElement("button"); b.className = "chip"; b.innerHTML = '<span class="cdot"></span>' + esc(c[0]); b.onclick = function() { $("q").value = c[1]; go(c[1], false); }; w.appendChild(b); });
  })();

  /* ---------- KEYBOARD SHORTCUTS ---------- */
  document.addEventListener("keydown", function(e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;

    switch (e.key) {
      case "/":
        e.preventDefault();
        $("q").focus();
        break;
      case " ":
        e.preventDefault();
        $("btnPlay").click();
        break;
      case "ArrowRight":
        e.preventDefault();
        $("btnNext").click();
        break;
      case "ArrowLeft":
        e.preventDefault();
        $("btnPrev").click();
        break;
      case "ArrowUp":
        e.preventDefault();
        var v = Math.min(100, parseInt($("vol").value) + 5);
        $("vol").value = v;
        $("vol").oninput();
        break;
      case "ArrowDown":
        e.preventDefault();
        var v2 = Math.max(0, parseInt($("vol").value) - 5);
        $("vol").value = v2;
        $("vol").oninput();
        break;
      case "m":
      case "M":
        var cur = parseInt($("vol").value);
        if (cur > 0) { $("vol").dataset.prev = cur; $("vol").value = 0; }
        else { $("vol").value = $("vol").dataset.prev || 80; }
        $("vol").oninput();
        break;
      case "l":
      case "L":
        $("btnLyrics").click();
        break;
      case "v":
      case "V":
        $("btnVideo").click();
        break;
    }
  });

  /* ---------- THEME TOGGLE ---------- */
  $("themeToggle").addEventListener("click", toggleTheme);

  /* ---------- INIT ---------- */
  initTheme();
  applyPlayerMode(getPlayerMode());
  loadSettings();
  loadStore();
  renderAll(false);
})();
