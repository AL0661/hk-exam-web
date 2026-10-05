// Coopanion 9e7b03caf60828aa23f3d7ad7a355c0d4f4a9efc src/script.ts; see ../LICENSE and ../SOURCE.txt
const VOCAB = [
  { id: "neutral", kind: "expression", zh: ["\u5E73\u9759"], note: "\u9ED8\u8BA4\u7684\u8138" },
  { id: "happy", kind: "expression", zh: ["\u5F00\u5FC3", "\u9AD8\u5174"], note: "\u773C\u775B\u5F2F\u6210 ^ ^" },
  { id: "wink", kind: "expression", zh: ["\u7728\u773C"], note: "\u4E00\u53EA\u773C ^" },
  { id: "love", kind: "expression", zh: ["\u559C\u6B22", "\u7231\u5FC3"], note: "\u773C\u775B\u53D8\u5FC3\u5F62,\u5192\u5C0F\u5FC3\u5FC3" },
  { id: "shy", kind: "expression", zh: ["\u5BB3\u7F9E"], note: "\u8138\u7EA2,\u773C\u795E\u8EB2\u5F00" },
  { id: "surprised", kind: "expression", zh: ["\u60CA\u8BB6", "\u5403\u60CA"], note: "\u773C\u775B\u653E\u5927,\u5934\u9876\u611F\u53F9\u53F7" },
  { id: "angry", kind: "expression", zh: ["\u751F\u6C14"], note: "\u76B1\u7709,\u5934\u9876\u6012\u6C14\u7B26\u53F7,\u8EAB\u4F53\u53D1\u6296" },
  { id: "sad", kind: "expression", zh: ["\u96BE\u8FC7", "\u4F24\u5FC3"], note: "\u516B\u5B57\u7709,\u6389\u773C\u6CEA" },
  { id: "sleepy", kind: "expression", zh: ["\u72AF\u56F0", "\u56F0"], note: "\u772F\u773C\u6253\u54C8\u6B20" },
  { id: "thinking", kind: "expression", zh: ["\u601D\u8003", "\u60F3\u60F3"], note: "\u773C\u775B\u5F80\u4E0A\u770B,\u5934\u9876\u5192\u5708" },
  { id: "smug", kind: "expression", zh: ["\u5F97\u610F", "\u561A\u745F"], note: "\u772F\u773C\u659C\u770B,\u5634\u89D2\u5E26\u7B11" },
  { id: "pout", kind: "expression", zh: ["\u561F\u5634", "\u54FC"], note: "\u5634\u561F\u8D77\u6765,\u8138\u7EA2,\u626D\u5934\u4E0D\u770B\u4F60" },
  { id: "worried", kind: "expression", zh: ["\u62C5\u5FC3", "\u7740\u6025"], note: "\u516B\u5B57\u7709,\u5192\u51B7\u6C57" },
  { id: "determined", kind: "expression", zh: ["\u8BA4\u771F", "\u575A\u5B9A"], note: "\u773C\u795E\u538B\u4F4E,\u4E00\u8138\u8BA4\u771F" },
  { id: "flustered", kind: "expression", zh: ["\u614C\u5F20", "\u7A98"], note: "\u773C\u775B\u53D8\u6210 > <,\u6EE1\u8138\u901A\u7EA2\u5192\u6C57" },
  { id: "scared", kind: "expression", zh: ["\u5BB3\u6015", "\u5413\u5230"], note: "\u773C\u775B\u77AA\u5927,\u5192\u6C57,\u8EAB\u4F53\u53D1\u6296" },
  { id: "excited", kind: "expression", zh: ["\u671F\u5F85", "\u661F\u661F\u773C"], note: "\u773C\u775B\u91CC\u95EA\u7740\u661F\u661F" },
  { id: "cry", kind: "expression", zh: ["\u5927\u54ED", "\u54ED"], note: "\u95ED\u773C\u5927\u54ED,\u773C\u6CEA\u76F4\u6D41" },
  { id: "confused", kind: "expression", zh: ["\u7591\u60D1", "\u95EE\u53F7"], note: "\u4E00\u8138\u4E0D\u89E3,\u5934\u9876\u95EE\u53F7" },
  { id: "stand", kind: "motion", zh: ["\u7AD9\u8D77", "\u7AD9"], note: "\u7AD9\u8D77\u6765(\u5750\u7740\u3001\u7761\u7740\u65F6)" },
  { id: "jump", kind: "motion", zh: ["\u8DF3", "\u8DF3\u8D77\u6765"], note: "\u539F\u5730\u8D77\u8DF3" },
  { id: "hop", kind: "motion", zh: ["\u5C0F\u8DF3", "\u8E66"], note: "\u5C0F\u5C0F\u8E66\u4E00\u4E0B" },
  { id: "look", kind: "motion", zh: ["\u5F20\u671B", "\u770B\u770B"], note: "\u5DE6\u53F3\u5F20\u671B" },
  { id: "turn", kind: "motion", zh: ["\u8F6C\u8EAB"], note: "\u8F6C\u5411\u53E6\u4E00\u8FB9" },
  { id: "nod", kind: "motion", zh: ["\u70B9\u5934"], note: "\u70B9\u4E24\u4E0B\u5934" },
  { id: "shake", kind: "motion", zh: ["\u6447\u5934"], note: "\u6447\u5934" },
  { id: "spin", kind: "motion", zh: ["\u8F6C\u5708"], note: "\u539F\u5730\u8F6C\u4E00\u5708" },
  { id: "sit", kind: "motion", zh: ["\u5750\u4E0B", "\u5750"], note: "\u5750\u4E0B,\u4E00\u76F4\u5750\u7740\u76F4\u5230\u4E0B\u4E2A\u52A8\u4F5C" },
  { id: "sleep", kind: "motion", zh: ["\u7761\u89C9", "\u7761"], note: "\u5750\u7740\u6253\u76F9,\u4E00\u76F4\u7761\u5230\u4E0B\u4E2A\u52A8\u4F5C" },
  { id: "dizzy", kind: "motion", zh: ["\u6655", "\u8F6C\u6655"], note: "\u5934\u6655\u773C\u82B1\u51E0\u79D2" },
  { id: "walk", kind: "motion", zh: ["\u8D70\u8D70", "\u6563\u6B65"], note: "\u968F\u4FBF\u8D70\u4E00\u6BB5" },
  { id: "run", kind: "motion", zh: ["\u8DD1", "\u8DD1\u8D77\u6765"], note: "\u8DD1\u5230\u5C4F\u5E55\u53E6\u4E00\u5934" },
  { id: "wave", kind: "motion", zh: ["\u62DB\u624B", "\u6253\u62DB\u547C"], note: "\u7B11\u7740\u6253\u62DB\u547C" },
  { id: "bow", kind: "motion", zh: ["\u97A0\u8EAC"], note: "\u95ED\u773C\u97A0\u4E00\u8EAC" },
  { id: "shiver", kind: "motion", zh: ["\u53D1\u6296", "\u54C6\u55E6"], note: "\u7F29\u7740\u8EAB\u5B50\u6296\u4E00\u4F1A\u513F" },
  { id: "flap", kind: "motion", zh: ["\u6251\u817E", "\u6FC0\u52A8"], note: "\u5F00\u5FC3\u5730\u8E66\u8D77\u6765\u6251\u817E" },
  { id: "dance", kind: "motion", zh: ["\u8DF3\u821E", "\u6447\u6446"], note: "\u539F\u5730\u8E29\u7740\u8282\u62CD\u6447\u6446\u4E09\u79D2,\u5192\u97F3\u7B26" }
];
const BY_WORD = /* @__PURE__ */ new Map();
for (const v of VOCAB) {
  BY_WORD.set(v.id, v);
  for (const z of v.zh) BY_WORD.set(z, v);
}
function vocabId(word) {
  return BY_WORD.get(word.trim().toLowerCase())?.id ?? BY_WORD.get(word.trim())?.id ?? null;
}
const INLINE_TAG_MAX = 32;
function words(inner, dropped) {
  const out = [];
  for (const w of inner.split(/[,，、\s]+/)) {
    if (!w) continue;
    const id = vocabId(w);
    if (id) out.push(id);
    else dropped.push(w);
  }
  return out;
}
function parseScript(script) {
  const dropped = [];
  const beats = [];
  let cur = { actions: [], text: "", anchors: [] };
  let i = 0;
  while (i < script.length) {
    const ch = script[i];
    if (ch === "\u3010") {
      const end = script.indexOf("\u3011", i + 1);
      if (end < 0) {
        cur.text += script.slice(i);
        break;
      }
      const acts = words(script.slice(i + 1, end), dropped);
      if (cur.text.trim() || cur.actions.length || cur.anchors.length) beats.push(cur);
      cur = { actions: acts, text: "", anchors: [] };
      i = end + 1;
      continue;
    }
    if (ch === "<" || ch === "\uFF1C") {
      const close = ch === "<" ? ">" : "\uFF1E";
      const end = script.indexOf(close, i + 1);
      const inner = end < 0 ? "" : script.slice(i + 1, end);
      if (end < 0 || inner.length > INLINE_TAG_MAX || /\n/.test(inner)) {
        cur.text += ch;
        i++;
        continue;
      }
      const acts = words(inner, dropped);
      if (acts.length) cur.anchors.push({ at: cur.text.length, actions: acts });
      i = end + 1;
      continue;
    }
    cur.text += ch;
    i++;
  }
  if (cur.text.trim() || cur.actions.length || cur.anchors.length) beats.push(cur);
  for (const b of beats) {
    const lead = b.text.length - b.text.trimStart().length;
    b.text = b.text.trim();
    for (const a of b.anchors) a.at = Math.max(0, Math.min(b.text.length, a.at - lead));
  }
  return { beats, dropped };
}
function estimateSeconds(beats) {
  let s = 0;
  for (const b of beats) {
    if (b.actions.length) s += 0.5;
    if (b.text) s += b.text.length / 20 + 1.6 + b.text.length * 0.07;
  }
  return Math.round(s * 10) / 10;
}
function parseActions(list) {
  const actions = [];
  const dropped = [];
  for (const raw of list) {
    if (typeof raw !== "string") {
      dropped.push(String(raw));
      continue;
    }
    const id = vocabId(raw);
    if (id) actions.push(id);
    else dropped.push(raw);
  }
  return { actions, dropped };
}
function vocabTable() {
  const rows = (kind) => VOCAB.filter((v) => v.kind === kind).map((v) => `| ${v.id} | ${v.zh.join(" / ")} | ${v.note} |`).join("\n");
  return `\u8868\u60C5(\u6301\u7EED\u51E0\u79D2\u540E\u56DE\u5230\u5E73\u5E38\u7684\u8138):

| \u8BCD | \u4E2D\u6587 | \u6837\u5B50 |
|---|---|---|
${rows("expression")}

\u52A8\u4F5C:

| \u8BCD | \u4E2D\u6587 | \u6837\u5B50 |
|---|---|---|
${rows("motion")}`;
}
export {
  INLINE_TAG_MAX,
  VOCAB,
  estimateSeconds,
  parseActions,
  parseScript,
  vocabId,
  vocabTable
};
