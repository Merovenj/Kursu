// Hardcoded, in-memory mock data. NO backend. NO real crypto.
// Numbers and IDs chosen to land the demo story.

export const ORG = {
  members: 1894221,           // ~1.9M
  threshold: 20000,
  faucetPerEpoch: 100,
  votingPerEpoch: 5,
};

export const EPOCH = {
  id: 1,
  startedAt: "2026-05-19T00:00:00Z",
  endsAt:    "2026-06-16T00:00:00Z",
  // For demo countdown we'll compute remaining at runtime
};

// 4 stages: endorsement | temp_check | formal_vote | decided
export const SEED_PROPOSALS = [
  {
    id: "P-018",
    title: "Saha temsilcileri için yıllık eğitim bütçesi",
    summary:
      "Saha temsilcilerinin (delegelerin) yıllık eğitim bütçesinin %15 artırılması " +
      "ve eğitimlerin yarısının çevrimiçi modüllere taşınması önerisi.",
    stage: "endorsement",
    support: 19940,             // ← the threshold-edge proposal
    sentiment: { s1: 8, s2: 14, s3: 22, s4: 33, s5: 23 },
    author: "@anon-7f3a",
    openedAt: "2026-05-21",
  },
  {
    id: "P-017",
    title: "İlçe örgütlerinde kayıt dışı bağışların kamuya açık denetimi",
    summary:
      "Tüm ilçe örgütlerinin nakit/ayni bağışlarının üçer aylık dönemlerde " +
      "halka açık deftere yazılması.",
    stage: "endorsement",
    support: 14122,
    sentiment: { s1: 6, s2: 9, s3: 12, s4: 38, s5: 35 },
    author: "@anon-2b1c",
    openedAt: "2026-05-15",
  },
  {
    id: "P-016",
    title: "Gençlik kolları kotasının %30'a çıkarılması",
    summary:
      "PM listelerinde ve yerel yönetim adaylıklarında 18–30 yaş arası üyelere " +
      "ayrılan kontenjanın güncellenmesi.",
    stage: "endorsement",
    support: 7488,
    sentiment: { s1: 14, s2: 18, s3: 21, s4: 27, s5: 20 },
    author: "@anon-9c4d",
    openedAt: "2026-05-12",
  },
  {
    id: "P-015",
    title: "Mahalle düzeyi danışsal anketler için yöntem standardı",
    summary:
      "Yerel danışsal oylamalarda örneklem büyüklüğü ve sonuç açıklama formatı " +
      "için bağlayıcı olmayan bir standart.",
    stage: "temp_check",
    support: 21408,
    sentiment: { s1: 4, s2: 8, s3: 18, s4: 41, s5: 29 },
    tempCheck: {
      openedAt: "2026-05-30T12:00:00Z",
      closesAt: "2026-06-02T12:00:00Z",  // demo "live" window
      totalVotes: 38211,
    },
    comments: [
      { id: "c1", sentiment: "s4", at: "2026-05-31T09:14:00Z",
        text: "Örneklem yöntemini açıkça belirtmek faydalı. Tek eksik: hane görüşmesi mi telefon mu, ayırmalıyız." },
      { id: "c2", sentiment: "s5", at: "2026-05-31T11:02:00Z",
        text: "Kabul. Format şart. Aksi takdirde her ilçe ayrı sonuç biçimi kullanıyor." },
      { id: "c3", sentiment: "s2", at: "2026-06-01T07:35:00Z",
        text: "Bağlayıcı olmayan standardın anlamı ne? Uymayanları kim ve nasıl uyaracak?" },
      { id: "c4", sentiment: "s3", at: "2026-06-01T16:50:00Z",
        text: "Pilot ilçelerde 3 ay deneyelim, sonra genele yayalım." },
      { id: "c5", sentiment: "s4", at: "2026-06-02T05:22:00Z",
        text: "Şeffaflık her zaman bir adım önde. Net standart, müzakerenin başlangıcıdır." },
    ],
    author: "@anon-5e8b",
    openedAt: "2026-05-10",
  },
  {
    id: "P-014",
    title: "Yerel adaylık başvuru süresinin uzatılması (90 → 120 gün)",
    summary:
      "Yerel seçimlerde aday adaylığı başvuru takvimi.",
    stage: "formal_vote",
    support: 24902,
    sentiment: { s1: 9, s2: 11, s3: 17, s4: 35, s5: 28 },
    formalVote: {
      openedAt: "2026-06-01T00:00:00Z",
      closesAt: "2026-06-08T00:00:00Z",
      approve: 14, reject: 6, abstain: 3, // tiny — early in voting
    },
    author: "@anon-1f8a",
    openedAt: "2026-04-22",
  },
  {
    id: "P-013",
    title: "Ön seçim itiraz mekanizması için 5 günlük şeffaf inceleme",
    summary:
      "Ön seçim sonuçlarına itiraz başvurularının 5 iş günü içinde kamuya açık " +
      "incelemeye sunulması.",
    stage: "decided",
    support: 28114,
    sentiment: { s1: 3, s2: 5, s3: 11, s4: 42, s5: 39 },
    result: { decision: "approved", approve: 612, reject: 71, abstain: 28 },
    decidedAt: "2026-05-04",
    author: "@anon-3c7e",
    openedAt: "2026-03-18",
  },
  {
    id: "P-012",
    title: "İl başkanı görev süresi tavanı: 6 yıl",
    summary:
      "İl başkanlığı görev süresine tavan getirilmesi.",
    stage: "decided",
    support: 22087,
    sentiment: { s1: 18, s2: 14, s3: 22, s4: 24, s5: 22 },
    result: { decision: "rejected", approve: 198, reject: 364, abstain: 41 },
    decidedAt: "2026-04-11",
    author: "@anon-8d2f",
    openedAt: "2026-02-09",
  },
];

// Seed ledger — append-only, hash-chained look, anonymous
export const SEED_LEDGER = [
  { block: 102841, at: "2026-06-01T18:22:14Z", type: "vote-cast",
    proposal: "P-014", nullifier: "0x4f3c1a9b8e2d76c1", note: "Approve / Reject / Abstain — vote sealed" },
  { block: 102840, at: "2026-06-01T17:50:02Z", type: "vote-cast",
    proposal: "P-014", nullifier: "0x9a72cd44b1ee0173" },
  { block: 102839, at: "2026-06-01T17:11:48Z", type: "vote-cast",
    proposal: "P-014", nullifier: "0x12bf4708e9dc35aa" },
  { block: 102825, at: "2026-06-01T00:00:00Z", type: "formal-open",
    proposal: "P-014", nullifier: "—", note: "Formal vote opened" },
  { block: 101911, at: "2026-05-30T12:00:00Z", type: "temp-open",
    proposal: "P-015", nullifier: "—", note: "Temperature check opened (72h)" },
  { block: 101910, at: "2026-05-30T11:59:50Z", type: "threshold",
    proposal: "P-015", nullifier: "—", note: "Threshold reached (20,000+)" },
  { block: 101909, at: "2026-05-30T11:59:50Z", type: "l2-distribution",
    proposal: "P-015", nullifier: "1,894,221", note: "Recognition token minted to all enrolled" },
  { block:  98762, at: "2026-05-04T19:00:11Z", type: "tally",
    proposal: "P-013", nullifier: "approve 612 · reject 71 · abstain 28", note: "Decided: approved" },
  { block:  87114, at: "2026-04-11T19:00:03Z", type: "tally",
    proposal: "P-012", nullifier: "approve 198 · reject 364 · abstain 41", note: "Decided: rejected" },
];

// Sample anonymous comment to seed the comment input
export const COMMENT_SEEDS = [
  "Mantıklı bir çerçeve, pilot uygulama ile başlanmalı.",
  "Maliyet kalemi net değil; kim ödüyor sorusu açık kalmış.",
  "Yerel örgütlerden geri bildirim almadan oylanmamalı.",
  "Şeffaflık iyi ama uygulama kapasitesi ayrı bir tartışma.",
];

// Stage display
export const STAGE_META = {
  endorsement: { label: "Endorsement",      cls: "endorse" },
  temp_check:  { label: "Temperature Check", cls: "temp" },
  formal_vote: { label: "Formal Vote",       cls: "formal" },
  decided:     { label: "Decided",           cls: "decided" },
};

// Format helpers
export const fmt = (n) => n.toLocaleString("en-US");
export const tr  = (n) => n.toLocaleString("tr-TR");

// Sentiment percent normalization (input is integer-ish; just returns percentages)
export function sentimentPcts(s) {
  const total = s.s1 + s.s2 + s.s3 + s.s4 + s.s5 || 1;
  return {
    s1: (s.s1 / total * 100),
    s2: (s.s2 / total * 100),
    s3: (s.s3 / total * 100),
    s4: (s.s4 / total * 100),
    s5: (s.s5 / total * 100),
    agreePct:    ((s.s4 + s.s5) / total * 100),
    disagreePct: ((s.s1 + s.s2) / total * 100),
  };
}

// Fake but deterministic-looking nullifier hash
export function fakeNullifier() {
  const hex = "0123456789abcdef";
  let h = "0x";
  for (let i = 0; i < 16; i++) h += hex[Math.floor(Math.random() * 16)];
  return h;
}
