#!/usr/bin/env node
/* Merge one new edition into data.js.
   Usage: node scripts/merge.js new_edition.json [YYYY-MM-DD]
   new_edition.json = { edition: {label, headline, lede, takeaways[3], classroom[]},
                        items: [...], board_changes: [...], dates_add: [...] }
   The date defaults to today in Europe/Madrid. Running it twice on the same day
   replaces that day's edition instead of adding a second one. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const file = path.join(__dirname, '..', 'data.js');
const src = fs.readFileSync(file, 'utf8');
const head = (src.match(/^\s*\/\*[\s\S]*?\*\/\s*/) || [''])[0];
const box = { window: {} }; vm.runInNewContext(src, box);
const D = box.window.AIWATCH;
if (!D) { console.error('data.js did not define window.AIWATCH'); process.exit(1); }
if (!process.argv[2]) { console.error('usage: node scripts/merge.js new_edition.json [YYYY-MM-DD]'); process.exit(1); }
const N = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const today = process.argv[3] || new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
const day = 86400000, t0 = Date.parse(today + 'T00:00:00Z');
const iso = t => new Date(t).toISOString().slice(0, 10);

// replace an edition of the same day
D.editions = D.editions.filter(e => e.id !== today);
D.items = D.items.filter(i => i.edition !== today);
const number = D.editions.reduce((m, e) => Math.max(m, e.number || 0), 0) + 1;
const E = N.edition || {};
D.editions.push({ id: today, number, label: E.label || ('Edition ' + number), headline: E.headline, lede: E.lede, takeaways: E.takeaways || [], classroom: E.classroom || [] });
(N.items || []).forEach(i => D.items.push(Object.assign({}, i, { edition: today, baseline: false })));

(N.board_changes || []).forEach(c => {
  const row = D.board.find(r => r.actor === c.actor);
  if (!row) { console.warn('board_changes: no row for actor ' + c.actor + ', skipped'); return; }
  ['state', 'since', 'open', 'note', 'item'].forEach(k => { if (c[k] != null) row[k] = c[k]; });
  row.changed = today;
});

const seen = new Set();
D.dates = (D.dates || []).concat(N.dates_add || []).filter(d => d.date >= today).filter(d => { const k = d.date + '|' + d.what; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => a.date < b.date ? -1 : 1);

D.meta.updated = today;
let n = t0 + day; while (![1, 4].includes(new Date(n).getUTCDay())) n += day;   // next Monday or Thursday
D.meta.next = iso(n);

// prune as the handbook says
D.editions = D.editions.slice(-16);
const keep = new Set(D.board.map(r => r.item)), cutoff = iso(t0 - 150 * day);
D.items = D.items.filter(i => i.date >= cutoff || keep.has(i.id));

fs.writeFileSync(file, head + 'window.AIWATCH = ' + JSON.stringify(D, null, 2) + ';\n');
console.log('merged edition ' + today + ' (number ' + number + '): ' + (N.items || []).length + ' items, next run ' + D.meta.next);
