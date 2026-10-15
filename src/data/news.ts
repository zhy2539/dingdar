// 新闻/动态数据：slug、标题、日期、摘要、封面、正文段落
// 仅收录可核实的真实公司动态；新内容由运营团队在发布时补充，不虚构事件。
export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  body: string[];
}

export const NEWS: NewsItem[] = [
  {
    slug: 'dingdar-launches-international-website',
    title: 'DINGDAR Launches Its International Website',
    date: '2026-10-14',
    excerpt:
      'Our new English website is now live. Buyers of crusher wear parts, bucket teeth and custom castings can send drawings, part numbers or samples directly for a technical review and quotation.',
    cover: '/images/foundry-pouring.webp',
    coverAlt: 'Molten metal pouring in the DINGDAR foundry',
    body: [
      'Henan Dingdar Machinery Equipment Manufacture Co., Ltd. has launched its international website at dingdar.com to make it easier for overseas buyers to start a casting project. The site covers the full product range — jaw crusher wear parts, cone crusher wear parts, impact crusher blow bars, hammer heads, double roll crusher parts, bucket teeth and adapters, and custom castings produced to drawing or sample.',
      'Every inquiry is reviewed as a technical requirement: geometry, material, casting process and inspection scope are confirmed before price and delivery are quoted. Buyers can start with a drawing, a 3D model, a part number, or simply a photo of the worn part.',
      'Inquiries can be submitted through the contact form on the website, by email to hugo@dingdar.com, or via WhatsApp at +86 19337861987. The project team aims to reply with technical feedback within 12–24 hours.',
      'The site also explains our four in-house casting routes — green sand, shell moulding, lost foam and investment casting — and the material families used across wear parts and custom components, based on over 40 years of casting experience since 1986.',
    ],
  },
  {
    slug: 'how-to-choose-jaw-plate-material',
    title: 'How to Choose Jaw Plate Material: Mn13 and Mn18',
    date: '2026-10-14',
    excerpt:
      'Jaw plates fail by impact, abrasion or both. A practical guide to high-manganese steel grades, when to move to alloy options, and what to send the foundry so the material choice is made on facts.',
    cover: '/images/jaw-plates-main.webp',
    coverAlt: 'High-manganese steel jaw plates for primary crushing',
    body: [
      'Jaw plate material is not a one-size choice. A plate that lasts well in one quarry can fail early in another, usually because the feed conditions — rock hardness, size, moisture and the crusher setup — change the failure mode. Understanding which mode is wearing your plates is the first step to choosing the right material.',
      'For the great majority of primary and secondary jaw applications, high-manganese steel in the Mn13 and Mn18 families is the standard. Under repeated impact, the surface work-hardens: the top layer compresses into a much harder skin while the core stays tough, so the plate resists both impact and abrasion at the same time. Mn13 (about 13% manganese, typically matching an <a href="https://www.astm.org" target="_blank" rel="noopener nofollow">ASTM A128</a>-grade equivalent) covers standard quarry feed; Mn18 with slightly higher manganese and refined treatment is specified where feed is harder or plates are larger and more likely to flex.',
      'There are cases where manganese steel is not the best start. If the feed is mostly fines with little impact energy, a manganese plate may not work-harden properly and can wear smoothly; an alloy steel or a composite with higher initial hardness can last longer. If the feed contains very large, hard boulders, toughness matters more than hardness, and the balance shifts back toward manganese. This is why we ask about feed size, abrasiveness and the crusher model before quoting — the grade is selected against your working conditions, not a menu.',
      'What you should send the foundry to get a reliable recommendation: the crusher model and closed-side setting, the typical feed size and rock type (for example granite, basalt, limestone, ore), the current plate life in hours and the failure pattern — broken, peened, or smooth-worn. Two plates of the same part number often need different materials for different pits, and the review exists to catch that before production.',
      'We produce jaw plates in Mn13, Mn18 and variants, and review alloy options per application. Send the part number or drawing with your working conditions and the technical review will confirm the material, hardness and inspection scope before any quote is prepared.',
    ],
  },
  {
    slug: 'crusher-wear-parts-moq-lead-time',
    title: 'MOQ, Tooling and Lead Time for Crusher Wear Parts',
    date: '2026-10-14',
    excerpt:
      'Why a foundry cannot quote MOQ and lead time without seeing the part — and the three questions that unlock a fast, reliable answer for crusher wear parts and custom castings.',
    cover: '/images/foundry-pouring.webp',
    coverAlt: 'Casting production line at the DINGDAR foundry',
    body: [
      'Inquiries that begin with "what is your MOQ?" usually get a frustrating answer from a foundry: it depends on the part. This is not a delay tactic. MOQ, tooling and lead time are all driven by the geometry of one specific casting, and quoting them before the part is known would simply be a guess.',
      'MOQ is driven by economics, not policy. A pattern or tooling set costs the same whether you cast one piece or a thousand, and that cost has to be spread across the order. A small, simple part that pours in one mould can be produced in low quantities at a fair price per piece; a large jaw plate that occupies a full mould and needs long cooling and heat-treatment time makes small runs expensive per piece. So the honest answer to "what is your MOQ" is usually "send the part and we will show you where the quantity curve makes sense" — and for repeat or frame orders, the quantity is often spread across the year rather than a single shipment.',
      'Lead time follows the same logic. Geometry decides the pattern or tooling route and how long that takes. Material and inspection scope decide the production steps — a manganese casting needs a long, controlled heat treatment after pouring, and NDT or third-party inspection adds days at the end. Quantity decides whether production can be phased. Once the part reference is known, we can separate "pattern/tooling lead time" from "production lead time" so you know exactly what you are waiting on.',
      'The three questions that unlock a fast answer are: (1) the part number, drawing, sample or machine model; (2) the material or hardness you need (or the application so we can propose it); (3) the annual or per-order quantity and the delivery market. With those three, a foundry can confirm tooling, MOQ, lead time and the inspection scope in writing — usually within a week for a first quotation.',
      'The practical takeaway for buyers: do not delay the inquiry until you have a full drawing. A part number or a photo of the worn part, plus quantity and destination, is enough to start the review. Everything else — exact dimensions, tolerances, marking and documents — gets confirmed during the review, before any commitment.',
    ],
  },
  {
    slug: 'green-sand-vs-investment-casting',
    title: 'Green Sand vs Investment Casting: Which Route?',
    date: '2026-10-14',
    excerpt:
      'Green sand handles large wear castings at competitive cost; investment casting delivers precision on small components. How foundries match the process to the part — and when both are the wrong answer.',
    cover: '/images/factory-mould-line.webp',
    coverAlt: 'Casting process comparison at the DINGDAR foundry',
    body: [
      'Choosing a casting process is often presented as a quality ladder: investment is "better" than green sand. In practice the right route is the one that matches the part size, geometry, tolerances and volume — and a foundry that casts everything one way is probably pushing a single pattern through your requirement.',
      'Green sand casting is the workhorse for medium and large castings. Sand is packed around the pattern, the mould is used once, and the process handles a very wide range of sizes and materials at competitive cost. Dimensional accuracy is standard, surface finish is standard, and tooling is relatively fast — which makes it the natural choice for large wear parts such as jaw plates and housings, and for anything heavy enough that precision casting would be impractical.',
      'Investment casting starts with a wax pattern and a ceramic shell; it delivers the highest dimensional accuracy and surface finish in the family, and it suits smaller components with fine detail and tight tolerances. The trade-off is cost and cycle time per part, so it earns its place where the precision saves machining or where geometry cannot be produced any other way. Shell moulding and lost foam sit between the two — better finish than green sand for repeatable series, and near-net-shape complex geometry respectively.',
      'The practical rule we apply in review: part size and order volume narrow the route first, then tolerance and finish requirements decide how far up the precision scale you need to go. A heavy crusher component cast to loose tolerances does not benefit from investment casting; a small valve component with fine detail would not be economical in green sand. Sometimes different components in one assembly correctly use different routes, planned together so material and inspection stay consistent.',
      'Because the process choice drives tooling, cost and lead time, we confirm the route during the technical review against the drawing and working conditions — then quote on that confirmed basis. Send the part number, drawing or sample, and the review will tell you which route fits and why.',
    ],
  },
  {
    slug: 'how-to-identify-the-correct-jaw-plate-for-your-crusher',
    title: 'How to Identify the Correct Jaw Plate for Your Crusher',
    date: '2026-10-15',
    excerpt:
      'Ordering the wrong jaw plate costs downtime and money. A practical checklist for identifying the correct plate from part numbers, drawings, measurements and worn-part photos before you send a request.',
    cover: '/images/prod-jaw.webp',
    coverAlt: 'High-manganese steel jaw plates for a jaw crusher',
    body: [
      'A jaw plate looks like a simple casting, but the differences between plates are easy to underestimate: crusher brand and model, chamber profile, tooth shape, bolt-hole pattern and revision level all change the part. An inquiry that starts with the correct identification usually saves two or three rounds of clarification — and avoids casting the wrong part at all.',
      'Start with the part number and the machine. The fastest identifier is the part number cast or stamped on the plate, or the crusher model from the nameplate — brand, series and feed opening. If the part number is worn away, the machine model alone is usually enough for a foundry to narrow the plate family, because each crusher series has a defined set of jaw plates.',
      'Then confirm the geometry. Note the chamber type (standard, coarse or fine), the tooth profile (wave, straight or custom), the position and spacing of the bolt holes, the thickness, and whether the plate is the fixed or movable jaw — they are not interchangeable. Take the key dimensions with a tape measure, and record the weight if the plate can be weighed; both are quick checks that catch a mistaken part number.',
      'Photograph the worn plate properly. A set of photos — the wear face, the back face, the mounting face and the worn profile — tells a foundry more than a description. The worn profile also hints at the material issue: a smooth, polished wear face with little work-hardening, a broken or peened edge, or a plate that cracked through the bolt holes all point to different material and design reviews.',
      'Send the part number, machine model, key measurements and photos together, and the technical review confirms the identity, material and hardness before any quotation. If you are unsure whether two plates are the same, the review exists to catch that before production — not after.',
    ],
  },
  {
    slug: 'what-information-is-needed-for-a-custom-crusher-wear-parts-quote',
    title: 'What Information Is Needed for a Custom Crusher Wear Parts Quote?',
    date: '2026-10-15',
    excerpt:
      'A foundry can quote faster and more accurately when it has the right starting information. The five things to prepare before requesting a custom crusher wear parts quotation.',
    cover: '/images/factory-casting-workshop.webp',
    coverAlt: 'Casting production in the DINGDAR workshop',
    body: [
      'The speed and accuracy of a casting quotation depend almost entirely on the starting information. With a complete set, a foundry can confirm tooling, material, MOQ, lead time and inspection scope in writing within a week; without it, the quote comes back full of assumptions or the review needs several rounds. Preparing the five items below removes most of that friction.',
      'First, the part reference — the single most important item. A part number, drawing, 3D model or sample is what the foundry needs to identify geometry and start the review. If you have only a photo of the worn part, send it anyway: it is enough to begin, and the missing details get confirmed during the review.',
      'Second, the application. The crusher model, typical feed size, rock type and whether the part runs in primary or secondary duty decide the material recommendation. Two identical part numbers running in different pits can need different grades, so the application is not optional detail — it is the basis of the material choice.',
      'Third, quantity and plan. Order volume, whether it is a first order or a repeat, and the delivery market determine tooling amortization, MOQ and lead time. Annual or frame quantities can be spread across the year rather than shipped at once, which usually lowers the per-piece cost.',
      'Fourth, acceptance and documentation. If your project requires a specific material standard, hardness range, NDT or third-party inspection, state it before the quotation: acceptance criteria are agreed in writing before production, and adding them afterwards costs time and money.',
      'Fifth, contact details and destination country — small, but they let the foundry confirm logistics and documents in the same reply. Send all five together through the contact form, by email to hugo@dingdar.com or on WhatsApp, and the project team responds with technical feedback within 12–24 hours.',
    ],
  },
  {
    slug: 'what-inspection-records-should-buyers-request-for-crusher-wear-parts',
    title: 'What Inspection Records Should Buyers Request for Crusher Wear Parts?',
    date: '2026-10-15',
    excerpt:
      'Material certificates, dimensional reports, hardness records, NDT — which inspection evidence matters for crusher wear parts, and how to specify it so it ships with your order.',
    cover: '/images/quality-inspection.webp',
    coverAlt: 'Quality inspection of cast parts at the DINGDAR foundry',
    body: [
      'Inspection records are what turn a quotation into a verifiable order. Buyers who specify the records they need before production receive evidence with the shipment; buyers who ask afterwards usually wait. For crusher wear parts, the meaningful records fall into a short list, and each one serves a different purpose.',
      'Material certificates (heat or melt analysis) are the core record: they confirm the grade that was actually poured, against the standard agreed for the order — for manganese steel, for example, the chemistry of the Mn13 or Mn18 family per an <a href="https://www.astm.org" target="_blank" rel="noopener nofollow">ASTM</a>, <a href="https://www.din.de" target="_blank" rel="noopener nofollow">DIN</a> or GB equivalent. This is the record that proves the material matches the drawing.',
      'Dimensional inspection reports confirm the part against the drawing: the critical dimensions, the bolt-hole positions and the tolerances. Hardness records show the delivered hardness range, which matters for wear parts where hardness is the accepted indicator of performance. Visual inspection records cover surface quality, marking and obvious defects.',
      'NDT — ultrasonic, magnetic particle or dye penetrant testing — is specified where internal soundness matters most, such as structural castings or parts that will take heavy impact. Third-party inspection by an agreed body can be added when your project or your customer requires independent verification. Each of these has a cost, so the scope should match the part, not be added uniformly.',
      'The way to get the right records is to specify them in the review: material standard, hardness range, dimensional checks, NDT or third-party inspection, and the documentation language. DINGDAR agrees the inspection and acceptance scope before production and ships the agreed records with the order — so the buyer\'s inspection step is short and the evidence trail is complete.',
    ],
  },
  {
    slug: 'what-factors-affect-the-service-life-of-crusher-wear-parts',
    title: 'What Factors Affect the Service Life of Crusher Wear Parts?',
    date: '2026-10-15',
    excerpt:
      'The same part can last twice as long in one plant and fail early in another. The four groups of factors that determine crusher wear part life — and how to act on each.',
    cover: '/images/H8bb76d8bdb4e44db9b044002488080b3J.webp',
    coverAlt: 'Open-pit mining operation loading crushed rock',
    body: [
      'Service life is the number buyers care about most, and the honest starting point is that the part is only half the story. The same jaw plate or blow bar can last twice as long in one plant and fail early in another because of factors outside the casting itself. Understanding the four groups below explains most of the difference.',
      'Working conditions come first. Rock hardness and abrasiveness, feed size, moisture and clay content set the wear rate before anything else. Highly abrasive feed wears a plate quickly no matter the grade; wet, sticky feed changes the wear pattern entirely. When life numbers are compared between plants, the feed conditions have to be part of the comparison.',
      'Crusher settings come second. Closed-side setting, speed or eccentric throw, and the uniformity of the feed all change how the part is loaded. Too large a reduction ratio, an uneven feed or a plate running with the wrong setting accelerates wear and can produce failure patterns that look like a material fault but are actually a machine-setting fault.',
      'Material and heat treatment come third — the part of the equation the foundry controls. High-manganese steel work-hardens under impact, so it suits high-impact duty; where impact energy is low, an alloy or composite with higher initial hardness lasts longer. Matching the grade to the actual impact energy of the machine is what turns a good grade into the right grade.',
      'Installation and operation come fourth. Bolt preload, seating and whether plates are turned or swapped according to wear all affect useful life; a plate that moves in its seat cracks early regardless of material. Recording life in hours, the failure pattern and the setting data, and sending that history with the next inquiry, lets the foundry adjust material or design instead of guessing — which is how life gets extended rather than replaced.',
    ],
  },
];

export const getNews = (slug: string) => NEWS.find((n) => n.slug === slug);
