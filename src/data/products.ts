// 产品目录数据：7 个产品分类，含样例件、页面文案要素
export interface Part {
  code: string;
  name: string;
  img: string;
}

export interface Category {
  slug: string;
  title: string;
  shortName: string;
  cardTitle: string;
  cardDesc: string;
  heroImg: string;
  bannerImg: string;
  h1: string;
  intro: string;
  parts: Part[];
  applications: string[];
  selection: { q: string; a: string }[];
  specs: string[];
}

const IMG = (n: string) => `/images/${n}.webp`;

export const CATEGORIES: Category[] = [
  {
    slug: 'jaw-crusher-wear-parts',
    title: 'Jaw Crusher Wear Parts | Mn13 Jaw Plates | DINGDAR',
    shortName: 'Jaw Crusher Wear Parts',
    cardTitle: 'Jaw Crusher Wear Parts',
    cardDesc: 'Mn13 jaw plates in high-manganese steel for jaw crushers. Fixed, movable and cheek plates produced to your part number or drawing, factory direct from DINGDAR.',
    heroImg: IMG('prod-jaw'),
    bannerImg: IMG('H1667504f229a4ec69a6d66926679d9cbJ'),
    h1: 'Jaw Crusher Wear Parts',
    intro:
      'Mn13 jaw plates are the standard for primary crushing, and we cast them in high-manganese steel — fixed, movable and cheek plates — for mining, quarrying and aggregate plants. Produced to your machine model, part number, drawing or sample.',
    parts: [
      { code: 'JCP-007', name: 'Jaw Plate', img: IMG('H8a38cb79479b45f39907a3d3034e8767X') },
      { code: 'JCP-008', name: 'Jaw Plate', img: IMG('H76e3bed70d0143cbb7ff1c441ca43759Y') },
      { code: 'JCP-009', name: 'Jaw Plate', img: IMG('H7566948ae4374852a19c11d0548fcb4d3') },
      { code: 'JCP-010', name: 'Jaw Plate', img: IMG('Ha50348c9924a47dbba0c911ffb939062l') },
      { code: 'JCP-012', name: 'Fixed Jaw Plate', img: IMG('Hfd96044662f64a53a812d92c7fc7140bC') },
      { code: 'JCP-015', name: 'Movable Jaw Plate', img: IMG('H3b92a0def3a448e6b39c40a98208fda0Z') },
      { code: 'JCP-025', name: 'Ti Fixed Jaw Plate', img: IMG('He79f81e2852e4979a35c9aff206a8206S') },
    ],
    applications: ['Hard rock mining', 'Aggregate & quarrying', 'Cement & clinker', 'Recycling & demolition'],
    specs: [
      'Material: High-manganese steel (Mn13, Mn18 and variants); alloy grades reviewed per application',
      'Casting routes: Green sand / shell moulding / lost foam, matched to part size and geometry',
      'Machining: As-cast or machined to drawing, as agreed in review',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'What material do jaw plates use?',
        a: 'Most fixed and movable jaw plates are cast in high-manganese steel (Mn13, Mn18 and variants) for work-hardening under impact. We can also review alloy options for your specific feed and abrasion conditions.',
      },
      {
        q: 'Can you produce to my drawing or part number?',
        a: 'Yes. Send the drawing, 3D model, part number or a sample, and the review confirms geometry, material grade, hardness and inspection requirements before quoting.',
      },
      {
        q: 'Which crusher brands do you cover?',
        a: 'We produce to reference across major jaw crusher models. If the exact reference is not listed, send the part number or sample and we will match it.',
      },
    ],
  },
  {
    slug: 'cone-crusher-wear-parts',
    title: 'Cone Crusher Wear Parts | Mantles & Concaves | DINGDAR',
    shortName: 'Cone Crusher Wear Parts',
    cardTitle: 'Cone Crusher Wear Parts',
    cardDesc: 'Mantle liners, concave and bowl liners, and upper housing castings for cone crushers in mining and aggregate circuits.',
    heroImg: IMG('prod-cone'),
    bannerImg: IMG('banner-cone'),
    h1: 'Cone Crusher Wear Parts',
    intro:
      'Mantle liners, concave and bowl liners, gyratory concaves and upper housing castings for cone crushers — cast in manganese and alloy grades, produced to your model reference, drawing or sample.',
    parts: [
      { code: 'CCP-001', name: 'Upper Housing', img: IMG('H333fae4ffe3a485c8a6683bd95eeb619T') },
      { code: 'CCP-002', name: 'Upper Housing', img: IMG('Hac6907b0659e40f2b6547441c231d460Q') },
      { code: 'CCP-007', name: 'Concave Liner', img: IMG('H057a22fe3ee34204b16cb9d37acf484d7') },
      { code: 'CCP-008', name: 'Concave Liner', img: IMG('Hf8bbb7ff21564081ac7d96a0a9ab08cba') },
      { code: 'CCP-013', name: 'Mantle Liner', img: IMG('Ha1a5cc7aefc34206b7f5ea43bb5fe855f') },
      { code: 'CCP-015', name: 'Mantle Liner', img: IMG('H76fa1c21756f40faa1e7ac91729ef5b83') },
      { code: 'CCP-025', name: 'Gyratory Concave', img: IMG('Ha341bfef3d0b48d3b7f71e97455f31ecM') },
    ],
    applications: ['Hard rock mining', 'Aggregate & quarrying', 'Cement & clinker', 'Recycling & demolition'],
    specs: [
      'Material: High-manganese steel for mantles & concaves; alloy grades reviewed per chamber profile',
      'Casting routes: Green sand / shell moulding / lost foam, matched to liner geometry',
      'Machining: As-cast or machined surfaces to drawing, as agreed in review',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'What is the difference between mantle and concave?',
        a: 'The mantle is the moving crushing member and the concave (or bowl liner) is the fixed member of the crushing chamber. Both are wear parts replaced together as the chamber profile controls product shape and throughput.',
      },
      {
        q: 'Which grades do you cast for cone parts?',
        a: 'High-manganese steel for mantles and concaves, and alloy grades where a specific chamber profile or application requires it. Material is confirmed against your working conditions during review.',
      },
      {
        q: 'Can you match a specific chamber profile?',
        a: 'Yes — send the part number, drawing or a worn sample, and we produce to the original chamber geometry with the agreed crushing profile.',
      },
    ],
  },
  {
    slug: 'impact-crusher-wear-parts',
    title: 'Impact Crusher Wear Parts | Blow Bars | DINGDAR',
    shortName: 'Impact Crusher Wear Parts',
    cardTitle: 'Impact Crusher Wear Parts',
    cardDesc: 'Blow bars, impact plates and liners for impact crushers, cast in high-chromium, alloy and manganese grades.',
    heroImg: IMG('prod-impact'),
    bannerImg: IMG('banner-impact'),
    h1: 'Impact Crusher Wear Parts',
    intro:
      'Blow bars, impact plates and further impact crusher wear references, produced by casting in high-chromium, alloy and manganese grades to your model, drawing or sample.',
    parts: [
      { code: 'ICP-001', name: 'Blow Bar', img: IMG('H44b3f0ebc49849ce847b17f6c5f45655L') },
      { code: 'ICP-002', name: 'Blow Bar', img: IMG('Hedbafcc10c264166ae52abc5179fe02eT') },
      { code: 'ICP-003', name: 'Blow Bar', img: IMG('H7f855d6508764378af28c5dcd9b1e1d87') },
      { code: 'ICP-004', name: 'Blow Bar', img: IMG('Haaeddafddcc24213bc21f6aa4bd8c191f') },
      { code: 'ICP-007', name: 'Impact Crusher Part', img: IMG('H70a2908489844e77977ffee125f3c5a2J') },
      { code: 'ICP-008', name: 'Impact Crusher Part', img: IMG('H7e086a8f76234a17b88f4256b7356d9eH') },
    ],
    applications: ['Hard rock mining', 'Aggregate & quarrying', 'Cement & clinker', 'Recycling & demolition'],
    specs: [
      'Material: High-chromium cast iron (Cr15–Cr26), alloy and manganese grades, matched to feed conditions',
      'Casting routes: Green sand / shell moulding / lost foam, matched to bar profile and size',
      'Machining: Keyways and fixing geometry machined to original profile',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'When is high-chromium cast iron the right choice for blow bars?',
        a: 'High-chromium cast iron suits abrasive feed with controlled impact. Where feed contains larger, harder rocks, alloy or manganese grades with higher toughness may be preferred. The review matches grade to your working conditions.',
      },
      {
        q: 'Do you produce blow bars to original profiles?',
        a: 'Yes — original profile, keyway and fixing geometry are reproduced from the part number, drawing or sample, and confirmed before production.',
      },
    ],
  },
  {
    slug: 'hammer-crusher-wear-parts',
    title: 'Hammer Crusher Wear Parts | DINGDAR',
    shortName: 'Hammer Crusher Wear Parts',
    cardTitle: 'Hammer Crusher Wear Parts',
    cardDesc: 'Hammer heads and hammers for hammer crushers in mining, quarrying and cement duty, cast in manganese and alloy steel.',
    heroImg: IMG('prod-hammer'),
    bannerImg: IMG('banner-hammer'),
    h1: 'Hammer Crusher Wear Parts',
    intro:
      'Hammer heads and hammers produced by casting for hammer crushers in mining, quarrying and cement duty. OEM and custom production from drawings, samples or part numbers.',
    parts: [
      { code: 'HCP-007', name: 'Hammer Head', img: IMG('Hdd08171ba5f84b1a9ad8463f43892ff9a') },
      { code: 'HCP-008', name: 'Hammer Head', img: IMG('Hdb9f386bcc694f16b702e8ba2a485cc5Y') },
      { code: 'HCP-001', name: 'Hammer Crusher Part', img: IMG('Hf1700e929ec8410899b3d7d44568ab47e') },
      { code: 'HCP-002', name: 'Hammer Crusher Part', img: IMG('H7ab7e8f69d41468b942e4ce23d0dbf68k') },
      { code: 'HCP-003', name: 'Hammer Crusher Part', img: IMG('H39d8ab0e36da4813a04c02037c5a0cd1V') },
      { code: 'HCP-004', name: 'Hammer Crusher Part', img: IMG('Hf2284c125ef54168b403f2c0a449e068N') },
    ],
    applications: ['Hard rock mining', 'Aggregate & quarrying', 'Cement & clinker', 'Recycling & demolition'],
    specs: [
      'Material: High-manganese steel (Mn13, Mn18 and variants); alloy combinations reviewed per application',
      'Casting routes: Green sand / shell moulding / lost foam, matched to hammer size and duty',
      'Machining: As-cast or machined to drawing, branding / marking available',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'Which material suits hammer heads?',
        a: 'High-manganese steel is the common choice for impact wear. We can also evaluate alloy combinations for the balance of hardness and toughness your application needs.',
      },
      {
        q: 'Can you apply custom branding or part marking?',
        a: 'Yes — drawing-based requirements, custom dimensions and branding or marking can be confirmed as part of the order.',
      },
    ],
  },
  {
    slug: 'double-roll-crusher-wear-parts',
    title: 'Double Roll Crusher Wear Parts | DINGDAR',
    shortName: 'Double Roll Crusher Parts',
    cardTitle: 'Double Roll Crusher Parts',
    cardDesc: 'Roller shells and toothed roll references for double roll crushers, produced by casting and machining.',
    heroImg: IMG('prod-roll'),
    bannerImg: IMG('banner-roll'),
    h1: 'Double Roll Crusher Wear Parts',
    intro:
      'Roller shells and toothed roll references for double roll crushers, produced by casting and machining. OEM and custom production from drawings, samples or part numbers.',
    parts: [
      { code: 'DRCP-001', name: 'Roller Shell', img: IMG('Hd9f52753a00e41058d330051bbb9ec96x') },
      { code: 'DRCP-002', name: 'Roller Shell', img: IMG('Hd7e0c1c072e54ac88a2f5483b16634ac4') },
      { code: 'DRCP-003', name: 'Roller Shell', img: IMG('H6ba7b7b367144f11b626b45f4730229at') },
      { code: 'DRCP-007', name: 'Roller Tooth', img: IMG('H3c33463a1cd44f16b3a961e34291541ao') },
      { code: 'DRCP-008', name: 'Roller Tooth', img: IMG('H92bfb05392fd4b418555f492d6a5e56fr') },
    ],
    applications: ['Hard rock mining', 'Aggregate & quarrying', 'Cement & clinker'],
    specs: [
      'Material: Alloy and manganese grades, matched to roll duty and feed',
      'Casting routes: Green sand / shell moulding / lost foam, matched to roll size',
      'Machining: Bores, faces and tooth profiles machined to required fit and tolerances',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'Do roll shells require machining after casting?',
        a: 'Typically yes — bores, faces and tooth profiles are machined to the required fit and tolerances. Machining scope is agreed during review.',
      },
      {
        q: 'Can you produce toothed rolls with a specific tooth profile?',
        a: 'Yes, tooth pitch, profile and material are produced to your drawing or matched from the sample.',
      },
    ],
  },
  {
    slug: 'bucket-teeth-adapters',
    title: 'Excavator Bucket Teeth & Adapters | DINGDAR',
    shortName: 'Bucket Teeth & Adapters',
    cardTitle: 'Bucket Teeth & Adapters',
    cardDesc: 'Bucket teeth, adapters and cast wear parts for excavators and loaders, with references for major machine brands.',
    heroImg: IMG('prod-teeth'),
    bannerImg: IMG('banner-teeth'),
    h1: 'Excavator Bucket Teeth & Adapters',
    intro:
      'Bucket teeth, adapters, side cutters and cast wear parts for excavators and loaders, with references covering major machine brands and models. Produced to reference or by drawing.',
    parts: [
      { code: 'CAT 305', name: 'Bucket Tooth', img: IMG('He667adbd0e56417b8f7ee7987e53f526B') },
      { code: 'CAT 550', name: 'Bucket Tooth', img: IMG('Hc1a70f0ca2904ee69332fa7d78468840V') },
      { code: 'SDLG 19', name: 'Bucket Tooth', img: IMG('H635a3050f6344f1f8be421ef1cc6e574l') },
      { code: 'SDLG 25', name: 'Bucket Tooth', img: IMG('H28fc16852cee4b4690c3faf2b4c993aeY') },
      { code: 'SANY 75', name: 'Bucket Tooth', img: IMG('H938dfff11bda48b4acccf896ed4132f39') },
      { code: 'CAT 320', name: 'Adapter', img: IMG('H6eaa5f89135e467db5057ab1e543cf2bQ') },
      { code: 'DAEWOO 150', name: 'Adapter', img: IMG('H43a1cf04c507499fa5655e831a7b69b0B') },
    ],
    applications: ['Excavators', 'Wheel loaders', 'Mining & quarrying', 'Construction & demolition'],
    specs: [
      'Material: Wear-grade alloy / manganese steel for teeth & adapters, matched to application',
      'Casting routes: Green sand / shell moulding / investment, matched to tooth geometry',
      'Machining: Adapter seats and pins machined to fit; matched sets available',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'Which machine brands do you cover?',
        a: 'References cover CAT, Komatsu, Volvo, DAEWOO, SANY, Lonking, SDLG and other major models. Send the part number or sample if your model is not listed.',
      },
      {
        q: 'Do you supply teeth and adapters as matched sets?',
        a: 'Yes — we can supply tooth, adapter and retaining pin as a matched set for one-stop sourcing, which is common for our distributor customers.',
      },
    ],
  },
  {
    slug: 'custom-castings',
    title: 'Custom Castings | Drawing & Sample Review | DINGDAR',
    shortName: 'Custom Castings',
    cardTitle: 'Custom Castings',
    cardDesc: 'Custom cast components produced to your drawing, sample or part reference, across materials and casting processes.',
    heroImg: IMG('prod-custom'),
    bannerImg: IMG('Hecd6dc88f1334b1c88c834d8b47845b9X'),
    h1: 'Custom Castings',
    intro:
      'Start a custom casting project with a drawing, sample, or an existing part to match. We define geometry, material, machining and inspection requirements with you, then produce from prototype to batch.',
    parts: [
      { code: 'To Drawing', name: 'Custom component', img: IMG('Hcf4f8099dbdf4dd5a04538f5c602cdfdu') },
      { code: 'To Sample', name: 'Custom component', img: IMG('Hf09396274a884400bc5ad978660c1f3cT') },
      { code: 'To Part No.', name: 'Custom component', img: IMG('Hadcfc64aa85442239c3064243eda4f5fY') },
    ],
    applications: ['Mining & quarrying equipment', 'Construction machinery', 'OEM machine builders', 'Industrial machinery'],
    specs: [
      'Material: High-manganese steel, high-chromium cast iron, alloy steel, ductile iron (GGG40/50/60) — selected per project',
      'Casting routes: Green sand, shell moulding, lost foam, investment — matched to geometry and volume',
      'Machining: Machined to drawing as agreed; branding / marking available',
      'Inspection: Material, dimensional, hardness and visual records per order; third-party on request',
      'MOQ & lead time: Confirmed during technical review',
    ],
    selection: [
      {
        q: 'What do you need to start a custom casting review?',
        a: 'A 2D drawing or 3D model is ideal. If it is not ready, a part number, equipment model, sample or photos are enough to begin, and we ask for the remaining details during review.',
      },
      {
        q: 'Do you support OEM and private label?',
        a: 'Yes — OEM and private-label production with agreed branding and marking is supported, subject to a signed technical review.',
      },
    ],
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
