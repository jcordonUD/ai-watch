#!/usr/bin/env node
/* Check data.js before it is published.
   Usage: node scripts/validate.js [YYYY-MM-DD]   (date = the edition expected to be last; optional)
   Exits with code 1 and a list of problems if anything is wrong. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const src = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
const errs = [];
let D;
try { const box = { window: {} }; vm.runInNewContext(src, box); D = box.window.AIWATCH; } catch (e) { errs.push('data.js is not valid JavaScript: ' + e.message); }
if (!D && !errs.length) errs.push('data.js did not define window.AIWATCH');
if (D) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());
  const actors = new Set(D.actors.map(a => a.id)), editions = new Set(D.editions.map(e => e.id)), ids = new Set();
  D.items.forEach(i => {
    const w = 'item ' + i.id + ': ';
    if (ids.has(i.id)) errs.push(w + 'duplicate id'); ids.add(i.id);
    if (!actors.has(i.actor)) errs.push(w + 'unknown actor ' + i.actor);
    if (!(Number.isInteger(i.mag) && i.mag >= 1 && i.mag <= 5)) errs.push(w + 'mag must be 1 to 5');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(i.date || '') || isNaN(Date.parse(i.date))) errs.push(w + 'bad date'); else if (i.date > today) errs.push(w + 'date is in the future');
    if (!editions.has(i.edition)) errs.push(w + 'edition ' + i.edition + ' does not exist');
    if (!Array.isArray(i.sources) || !i.sources.length || !i.sources.every(s => /^https:\/\//.test(s.url || '') && s.label)) errs.push(w + 'needs at least one source with a label and an https url');
    ['title', 'summary', 'why'].forEach(k => { if (!i[k] || typeof i[k] !== 'string') errs.push(w + 'missing ' + k); });
    if ((i.title || '').length > 110) errs.push(w + 'title is too long');
    if (!['primary', 'reported', 'headline'].includes(i.confidence)) errs.push(w + 'confidence must be primary, reported or headline');
  });
  D.board.forEach(r => { if (!actors.has(r.actor)) errs.push('board: unknown actor ' + r.actor); if (!ids.has(r.item)) errs.push('board row ' + r.actor + ': item ' + r.item + ' does not exist'); });
  D.editions.forEach(e => { if (!e.headline || !e.lede) errs.push('edition ' + e.id + ': missing headline or lede'); if (!Array.isArray(e.takeaways) || e.takeaways.length !== 3) errs.push('edition ' + e.id + ': needs exactly 3 takeaways'); });
  const last = D.editions[D.editions.length - 1];
  if (process.argv[2] && last.id !== process.argv[2]) errs.push('the last edition is ' + last.id + ', expected ' + process.argv[2]);
  if (D.meta.updated !== last.id) errs.push('meta.updated (' + D.meta.updated + ') does not match the last edition (' + last.id + ')');
  if (!(D.meta.next > D.meta.updated)) errs.push('meta.next must be after meta.updated');
  if (src.includes(String.fromCharCode(8212))) errs.push('the file contains an em dash');
}
if (errs.length) { console.error('INVALID:\n- ' + errs.join('\n- ')); process.exit(1); }
console.log('data.js is valid: ' + D.editions.length + ' editions, ' + D.items.length + ' items, last ' + D.meta.updated);
