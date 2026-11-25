(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const img = n => `img/${n}.webp`;

/* ---------- content ---------- */
const ROOMS = [
  { id: 'afterhours', title: 'Afterhours', type: 'Innovative spatial experience', cat: 'spatial', year: 2024, extra: 'with UAL',
    tools: ['SketchUp', 'Twinmotion', 'Technical drawings'],
    blurb: 'Created in collaboration with University of the Arts London to give students a place to relax, connect, and recharge after a full day of classes. The centerpiece is a sculptural double-layered table that lowers from the ceiling in the evening to become a bar.',
    more: ['Designed with comfort and creativity in mind, it offers a calm, welcoming environment where students can feel free to be themselves.',
      'The table lifts back up during the day to serve as a visual fixture. The design is simple for the university to implement, yet dynamic in its impact — supporting student life with a space that feels both functional and celebratory.'],
    cluster: [['ah_people', 0, 90, 760, 428, 0], ['ah_ret', 470, 0, 290, 163, 90], ['ah_ext', 40, 440, 330, 186, 140]],
    hero: 'ah_people', compare: ['ah_ret', 'ah_ext', 'Retracted — day', 'Extended — night'],
    gallery: [['ah_bar', 'The bar, lowered'], ['ah_day', 'Daytime: table lifted as a ceiling fixture'], ['ah_lounge', 'The existing student space'], ['ah_sketch', 'Table studies'], ['ah_plan', 'Floor plan'], ['ah_elev', 'Elevation'], ['ah_views', 'Table views']] },
  { id: 'squishable', title: 'Squishable: The Design of Comfort', type: 'Exhibition project', cat: 'exhibition', year: 2024,
    tools: ['SketchUp', 'Sketching', 'Adobe Illustrator'],
    blurb: 'An exhibition recognizing how plush toys become essential tools in coping with anxiety, stress, grief, and isolation — an enchanting journey celebrating the unexpected joy and comfort they bring in challenging times.',
    more: ['Discover the transformative power of Squishable, where cuddly companions go beyond mere playthings and their profound impact on mental well-being is celebrated.'],
    cluster: [['sq_install', 200, 20, 440, 587, 0], ['sq_octo', 30, 90, 220, 290, 110], ['sq_cave', 590, 300, 210, 277, 150], ['sq_crab', 70, 420, 190, 250, 60]],
    hero: 'sq_banner',
    gallery: [['sq_install', 'The installation'], ['sq_swirl', 'Layered panels'], ['sq_cave', 'Inside the cave'], ['sq_octo', 'Plush on the shell seat'], ['sq_crab', 'Greeting sign'], ['sq_model', 'Model'], ['sq_chars', 'Character design'], ['sq_explode', 'Exploded diagram']] },
  { id: 'echoes', title: 'Echoes of Gratitude', type: 'Pop-up project', cat: 'popup', year: 2022,
    tools: ['Rhino', 'Enscape', 'Technical drawings'],
    blurb: 'A safe space for people to journal with the I Am Grateful journal: a stationery station to decorate your own journal, comfortable seating to get the creative flow going, and a column filled with what visitors are most grateful for.',
    more: ['Natural colors bring the natural flow of one’s emotions to paper. The plan moves from a stationery station to a writing table, personal desks, and two seating areas — one for expressing, one for healing with friends.'],
    cluster: [['echo_r1', 0, 110, 760, 492, 0], ['echo_axon', 540, -10, 230, 332, 130], ['echo_plan', 30, 400, 300, 219, 90]],
    hero: 'echo_r1',
    gallery: [['echo_r2', 'Seating area — healing with friends'], ['echo_r3', 'Writing table and personal desks'], ['echo_axon', 'Exploded axonometric'], ['echo_plan', 'Plan'], ['echo_sketch', 'Brainstorm and flow sketch'], ['echo_journal', 'The I Am Grateful journal']] },
  { id: 'phlur', title: 'PHLUR: Neutrality', type: 'Brand activation', cat: 'brand', year: 2023,
    tools: ['SketchUp', 'Twinmotion', 'Technical drawings'],
    blurb: 'A minimalist pop-up reflecting purity, growth, and intention. Guests deconstruct three signature fragrances and craft their own perfume inside a life-size bottle.',
    more: ['Fragrance narrates a mood, elevates a vibe, and helps express who we are — or who we want to be. Staying true to a forward-thinking brand, the product itself is built at life size, so the experience comes to life with a playful sense of mind.'],
    rot: -10, grid: [['ph_ext', 94, 34, 420, 320, 0], ['ph_aerial', 380, 230, 200, 139, 90]],
    hero: 'ph_ext',
    gallery: [['ph_dusk', 'The bottle at dusk'], ['ph_aerial', 'Aerial: bottle and package boxes'], ['ph_int', 'Interior scent bar'], ['ph_sketch', 'Sketches'], ['ph_explode', 'Exploded diagram'], ['ph_plan', 'Floor plan']] },
  { id: 'gentlemonster', title: 'Gentle Monster', type: 'Product pop-up', cat: 'popup', year: 2024,
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Fresco'],
    blurb: 'A futuristic eyewear display blending sci-fi minimalism with rebellious youth culture — an android presenter, a code-like graphic base, and chrome, metal, and glass.',
    more: ['A palette of pure whites and soft grays evokes clarity, calm, and minimal elegance — subtle, sleek, and quietly powerful.'],
    rot: 8, grid: [['gm_display', 60, 60, 470, 264, 0], ['gm_sketch', 24, 190, 200, 157, 100]],
    hero: 'gm_display',
    gallery: [['gm_sketch', 'Android presenter studies']] },
  { id: 'traderjoes', title: 'Trader Joe’s', type: '3D dimensional construction', cat: 'construction', year: 2024,
    tools: ['SketchUp', 'Adobe Fresco', 'Woodworking'],
    blurb: 'The famous grocery logo recreated in layered MDF, plywood, and hardboard on a classic brown bag — quality at an affordable price, built by hand.',
    more: [],
    rot: 20, grid: [['tj_bag', 170, 36, 270, 311, 0], ['tj_sketch', 20, 230, 210, 141, -80]],
    hero: 'tj_mock',
    gallery: [['tj_bag', 'Finished piece'], ['tj_sketch', 'Material callouts'], ['tj_process', 'Cutting on the scroll saw'], ['tj_ring', 'Routed ring'], ['tj_parts', 'Painted pieces'], ['tj_angle', 'SketchUp model']] },
  { id: 'whispers', title: 'Whispers of the Garden', type: 'Wayfinding design', cat: 'wayfinding', year: 2025,
    tools: ['Adobe Fresco', 'Adobe Photoshop', 'Adobe Illustrator'],
    blurb: 'A wayfinding system for Leonard J. Buck Garden. A personality test reveals which flower you resemble, then the app guides you to where it grows.',
    more: ['The signage uses natural materials and colors to reflect the calm, organic essence of the garden. Dark wood and green panels blend into the environment, while oak lettering keeps it warm and readable — so the focus stays on the visitor’s personal journey through the space.'],
    rot: 0, grid: [['gd_sign', 0, 0, 608, 400, -1]], phones: true,
    hero: 'gd_sign',
    gallery: [['gd_1', 'Entrance sign and park rules'], ['gd_2', 'Plant markers along the path'], ['gd_ph1', 'App: home'], ['gd_ph2', 'App: personality test'], ['gd_ph3', 'App: your flower'], ['gd_family', 'Signage family'], ['gd_lines', 'Line drawings']] },
];
const CATS = [['all', 'All rooms'], ['spatial', 'Spatial experience'], ['popup', 'Pop-up'], ['exhibition', 'Exhibition'], ['brand', 'Brand activation'], ['wayfinding', 'Wayfinding'], ['construction', '3D construction']];
const num = i => String(i + 1).padStart(2, '0');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- hand-drawn loop ---------- */
function loopPath(rot = -3, turns = 1.86) {
  const cx = 340, cy = 109, rx = 320, ry = 84, r = rot * Math.PI / 180, N = 150; let d = '';
  for (let i = 0; i <= N; i++) {
    const t = -2.4 + (i / N) * turns * 2 * Math.PI, k = i / N;
    const ax = rx + 7 * Math.sin(t * .5) - 10 * k, ay = ry + 5 * Math.cos(t * .7) - 4 * k;
    const x0 = ax * Math.cos(t), y0 = ay * Math.sin(t);
    d += (i ? 'L' : 'M') + (cx + x0 * Math.cos(r) - y0 * Math.sin(r)).toFixed(1) + ' ' + (cy + x0 * Math.sin(r) + y0 * Math.cos(r)).toFixed(1) + ' ';
  }
  return d;
}
$('#loopPath').setAttribute('d', loopPath(-3));
$('#ringLoop').setAttribute('d', loopPath(4, 1.8));
$('#contactLoop').setAttribute('d', loopPath(-8, 1.7));

/* ---------- marquee ---------- */
{
  const words = ['Pop-ups', 'Exhibitions', 'Brand activations', 'Wayfinding', 'Spatial experiences', '3D construction'];
  const one = words.map((w, i) => `<span>${i % 2 ? `<i>${w}</i>` : w}</span><b>✳</b>`).join('');
  $('#track').innerHTML = one.repeat(4);
}

/* ---------- work: features + grid ---------- */
const pct = (v, t) => (v / t * 100).toFixed(2) + '%';
function clusterHTML(list, W, H) {
  return list.map(([n, x, y, w, h, z]) => z === -1
    ? `<img class="bleed" src="${img(n)}" alt="" loading="lazy">`
    : `<img class="${z > 0 ? 'float' : ''}" style="left:${pct(x, W)};top:${pct(y, H)};width:${pct(w, W)};height:${pct(h, H)};--tz:${z}px" src="${img(n)}" alt="" loading="lazy">`).join('');
}
{
  const feats = $('#features'), grid = $('#grid');
  ROOMS.forEach((r, i) => {
    const meta = `${r.type} &nbsp;·&nbsp; ${r.year}${r.extra ? ` &nbsp;·&nbsp; ${r.extra}` : ''}`;
    if (r.cluster) {
      feats.insertAdjacentHTML('beforeend', `
      <article class="room${i % 2 ? ' flip' : ''}" data-cat="${r.cat}" data-reveal>
        <button class="cluster-wrap tiltable" type="button" data-room="${r.id}" aria-label="Step inside ${esc(r.title)}">
          <div class="cluster">${clusterHTML(r.cluster, 800, 660)}</div>
        </button>
        <div class="room-copy">
          <p class="label orange" style="margin:0">Room ${num(i)} / 07</p>
          <h3>${esc(r.title)}</h3>
          <p class="meta">${meta}</p>
          <p class="blurb">${esc(r.blurb)}</p>
          <div class="tools">${r.tools.map(t => `<span class="chip">${t}</span>`).join('')}</div>
          <button class="step" type="button" data-room="${r.id}">Step inside <span aria-hidden="true">→</span></button>
        </div>
      </article>`);
    } else {
      const phones = r.phones ? [0, 1, 2].map(j => `<img class="phone" style="left:${[39, 54.5, 70][j]}%;top:22%;width:19.7%;height:55.7%;--tz:${[60, 130, 60][j]}px;--pr:${[-22, 0, 22][j]}deg" src="${img('gd_ph' + (j + 1))}" alt="" loading="lazy">`).join('') : '';
      grid.insertAdjacentHTML('beforeend', `
      <button class="card" type="button" data-room="${r.id}" data-cat="${r.cat}" data-reveal aria-label="Step inside ${esc(r.title)}">
        <div class="media tiltable"><div class="cluster" style="--rot:${r.rot}deg;--ry:${r.rot}deg">${clusterHTML(r.grid, 608, 400)}${phones}</div></div>
        <div class="cap">
          <div class="cap-top"><span class="label orange">Room ${num(i)} / 07</span><span class="meta">${meta}</span></div>
          <h3>${esc(r.title)}</h3>
          <p class="blurb">${esc(r.blurb)}</p>
          <span class="step">Step inside <span aria-hidden="true">→</span></span>
        </div>
      </button>`);
    }
  });
  const filters = $('#filters');
  filters.innerHTML = CATS.map(([k, l], i) => `<button class="chip" type="button" data-f="${k}" aria-pressed="${!i}">${l}</button>`).join('');
  filters.addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    $$('[data-f]', filters).forEach(x => x.setAttribute('aria-pressed', x === b));
    const f = b.dataset.f; let cards = 0;
    $$('[data-cat]').forEach(el => { const show = f === 'all' || el.dataset.cat === f; el.hidden = !show; if (show) { el.classList.add('in'); if (el.classList.contains('card')) cards++; } });
    $('.grid-label').hidden = !cards; $('#grid').hidden = !cards;
  });
}

/* ---------- room overlay ---------- */
const dlg = $('#room'), body = $('#roomBody'); let current = 0;
function openRoom(id) {
  const i = ROOMS.findIndex(r => r.id === id); if (i < 0) return; current = i; const r = ROOMS[i];
  $('#roomIndex').textContent = `Room ${num(i)} / 07`;
  const cmp = r.compare ? `
    <div class="compare" id="cmp">
      <img src="${img(r.compare[0])}" alt="${esc(r.compare[2])}">
      <img class="top" src="${img(r.compare[1])}" alt="${esc(r.compare[3])}">
      <span class="bar"></span><span class="tag a">${r.compare[2]}</span><span class="tag b">${r.compare[3]}</span>
      <input type="range" min="0" max="100" value="50" aria-label="Slide to lower the table: retracted to extended">
    </div>` : '';
  const next = ROOMS[(i + 1) % ROOMS.length];
  body.innerHTML = `
    <div class="rd-head">
      <div><p class="meta">${r.type} &nbsp;·&nbsp; ${r.year}${r.extra ? ` &nbsp;·&nbsp; ${r.extra}` : ''}</p>
        <h2 id="roomTitle">${esc(r.title)}</h2>
        <div class="tools">${r.tools.map(t => `<span class="chip">${t}</span>`).join('')}</div></div>
      <div class="txt"><p class="lead">${esc(r.blurb)}</p>${r.more.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    </div>
    <img class="rd-hero" src="${img(r.hero)}" alt="${esc(r.title)} — main view">
    ${cmp}
    <div class="gallery">${r.gallery.map(([n, c]) => `<figure><img src="${img(n)}" alt="${esc(c)}" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
    <div class="rd-end"><button class="step" type="button" data-close>← Back to the exhibition</button><button class="step" type="button" data-room="${next.id}">Next room: ${esc(next.title)} <span aria-hidden="true">→</span></button></div>`;
  const c = $('#cmp', body);
  if (c) $('input', c).addEventListener('input', e => c.style.setProperty('--x', (100 - e.target.value) + '%'));
  if (c) c.style.setProperty('--x', '50%');
  body.scrollTop = 0;
  if (!dlg.open) { dlg.showModal(); document.documentElement.style.overflow = 'hidden'; }
}
function closeRoom() { dlg.close(); }
dlg.addEventListener('close', () => { document.documentElement.style.overflow = ''; });
document.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) return closeRoom();
  const t = e.target.closest('[data-room]'); if (t) openRoom(t.dataset.room);
});
$('#roomClose').addEventListener('click', closeRoom);
$('#roomPrev').addEventListener('click', () => openRoom(ROOMS[(current + ROOMS.length - 1) % ROOMS.length].id));
$('#roomNext').addEventListener('click', () => openRoom(ROOMS[(current + 1) % ROOMS.length].id));
dlg.addEventListener('keydown', e => { if (e.key === 'ArrowRight') $('#roomNext').click(); if (e.key === 'ArrowLeft') $('#roomPrev').click(); });

/* ---------- reveals ---------- */
{
  const st = $('#statement');
  let i = 0;
  const wrap = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => { if (!p.trim()) { f.append(p); return; } const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = p; f.append(s); });
        n.replaceWith(f);
      } else wrap(n);
    });
  };
  wrap(st);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .18, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal], .words, #edu').forEach(el => io.observe(el));
}

/* ---------- hero camera + nav ---------- */
const hero = $('#top'), corridor = $('#corridor'), copy = $('#heroCopy'), stage = $('.stage'), nav = $('#nav');
let ticking = false;
function onScroll() {
  const y = scrollY, vh = innerHeight;
  nav.classList.toggle('scrolled', y > 40);
  if (!reduce) {
    const p = clamp(y / (hero.offsetHeight - vh), 0, 1);
    corridor.style.setProperty('--cam', (p * 2500).toFixed(1) + 'px');
    stage.style.setProperty('--copy', clamp(1 - p * 2.4, 0, 1).toFixed(3));
    copy.style.visibility = p > .45 ? 'hidden' : '';
  }
  if (!canHover && !reduce) swayAll();
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

/* ---------- tilt (pointer on desktop, scroll-sway on touch) ---------- */
const tilts = [];
$$('.tilt').forEach(el => tilts.push({ el, plane: $('.plane', el), amt: +el.dataset.tilt || 10 }));
$$('.tiltable').forEach(el => tilts.push({ el, plane: $('.cluster', el), amt: 9 }));
tilts.forEach(t => { const cs = getComputedStyle(t.plane); t.ry = parseFloat(cs.getPropertyValue('--ry')) || 0; t.rx = parseFloat(cs.getPropertyValue('--rx')) || 2; });
if (canHover && !reduce) {
  tilts.forEach(t => {
    t.el.addEventListener('pointermove', e => {
      const r = t.el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
      t.plane.style.setProperty('--ry', (t.ry * .35 + dx * t.amt * 2).toFixed(2) + 'deg');
      t.plane.style.setProperty('--rx', (t.rx - dy * t.amt).toFixed(2) + 'deg');
    });
    t.el.addEventListener('pointerleave', () => { t.plane.style.removeProperty('--ry'); t.plane.style.removeProperty('--rx'); });
  });
}
function swayAll() {
  const vh = innerHeight;
  tilts.forEach(t => {
    const r = t.el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
    const k = clamp(((r.top + r.height / 2) / vh - .5) * 2, -1, 1);
    t.plane.style.setProperty('--ry', (t.ry - k * (t.ry >= 0 ? 1 : -1) * 12).toFixed(2) + 'deg');
  });
}

/* ---------- education: plane along the arc ---------- */
{
  const edu = $('#edu'), arc = $('#arc'), plane = $('#plane'), box = $('.flight');
  const L = arc.getTotalLength(); let on = false, t0 = 0;
  function fly(now) {
    if (!on) return;
    const t = ((now - t0) / 9000) % 1, e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const w = box.clientWidth, h = box.clientHeight, sx = w / 1248, sy = h / 160;
    const a = arc.getPointAtLength(L * e), b = arc.getPointAtLength(Math.min(L, L * e + 2));
    plane.style.setProperty('--px', (a.x * sx).toFixed(1) + 'px');
    plane.style.setProperty('--py', (a.y * sy).toFixed(1) + 'px');
    plane.style.setProperty('--pa', (Math.atan2((b.y - a.y) * sy, (b.x - a.x) * sx) * 180 / Math.PI + 90).toFixed(1) + 'deg');
    requestAnimationFrame(fly);
  }
  if (reduce) { plane.style.setProperty('--px', (624 / 1248 * 100) + '%'); }
  else new IntersectionObserver(es => es.forEach(e => { on = e.isIntersecting; if (on) { t0 = performance.now(); requestAnimationFrame(fly); } }), { threshold: .2 }).observe(edu);
}

/* ---------- skills ring ---------- */
{
  const scene = $('#ringScene'), ring = $('#ring');
  const skills = ['Sketching', 'Drawing', 'Sculpting', 'Painting', 'Modeling', 'Woodworking', 'SketchUp', 'Twinmotion', 'Enscape', 'Adobe Creative Cloud', 'Storyboards', 'Brand activation', 'Deck design'];
  const N = skills.length; const pills = skills.map((s, i) => { const p = document.createElement('span'); p.className = 'pill' + (i % 4 ? '' : ' hot'); p.textContent = s; p.style.setProperty('--a', (360 / N * i) + 'deg'); ring.append(p); return p; });
  let spin = 10, vel = .12, on = false, drag = false, lx = 0;
  const size = () => ring.style.setProperty('--R', Math.round(clamp(scene.clientWidth * .4, 240, 300)) + 'px');
  size(); addEventListener('resize', size);
  function paint() {
    ring.style.setProperty('--spin', spin.toFixed(2) + 'deg');
    pills.forEach((p, i) => { const c = Math.cos((360 / N * i + spin) * Math.PI / 180); p.style.setProperty('--o', (c > 0 ? .35 + .65 * c : .16).toFixed(2)); });
  }
  function loop() { if (!on) return; if (!drag) { spin += vel; vel += (.12 - vel) * .02; } paint(); requestAnimationFrame(loop); }
  paint();
  if (!reduce) new IntersectionObserver(es => es.forEach(e => { const was = on; on = e.isIntersecting; if (on && !was) requestAnimationFrame(loop); }), { threshold: .05 }).observe(scene);
  scene.addEventListener('pointerdown', e => { drag = true; lx = e.clientX; scene.setPointerCapture(e.pointerId); });
  scene.addEventListener('pointermove', e => { if (!drag) return; const d = e.clientX - lx; lx = e.clientX; spin += d * .35; vel = d * .35; paint(); });
  const end = () => { drag = false; vel = clamp(vel, -6, 6); };
  scene.addEventListener('pointerup', end); scene.addEventListener('pointercancel', end);
}

onScroll();
})();
