// 产品页深度技术内容（英文站使用）：每个分类独立撰写，避免模板化重复
export interface DeepDiveSection {
  heading: string;
  paragraphs: string[];
}

export interface ProductGuide {
  label: string;
  href: string;
}

export interface ProductDeepDive {
  sections: DeepDiveSection[];
  guides: ProductGuide[];
}

export const PRODUCT_DEEP_DIVE: Record<string, ProductDeepDive> = {
  'jaw-crusher-wear-parts': {
    sections: [
      {
        heading: 'Why Mn13 hardens where it is hit',
        paragraphs: [
          'A jaw plate does not wear evenly, and the reason is metallurgical. Mn13 is an austenitic manganese steel: as cast and water-quenched it sits at roughly 200 HB, soft enough to absorb the shock of a boulder landing on the plate without cracking. Under repeated impact the surface layer deforms and the austenite transforms to martensite, lifting the working face into the 450–550 HBW range while the core stays tough. The plate therefore wears in a hard skin on a ductile body.',
          'That mechanism explains the two ways a jaw plate disappoints. In hard, coarse feed the surface hardens and life is long. In fine, low-impact duty — screened aggregate, recycled concrete with a small top size — the surface never work-hardens and Mn13 can wear faster than an alloy grade with higher initial hardness. The feed and the closed-side setting decide which case applies, which is why a quotation that names a grade before asking about the feed is guessing.',
        ],
      },
      {
        heading: 'Tooth profile, setting and the way a plate fails',
        paragraphs: [
          'The tooth profile is part of the crushing chamber, not decoration. A worn profile changes the nip angle and the product shape long before the plate is thin, and a plate that no longer seats against the jaw stock hammers and cracks from the back. When a plate is changed, the seat, wedges and setting are worth checking at the same time: most premature failures we see described as "bad material" are actually a loose plate, oversized feed or tramp metal.',
          'Four observations settle most conversations: where the plate is worn (working face, discharge end, one corner), how it failed (through-crack, polished surface, thinning), the hours or tonnes it delivered, and photographs with a scale. A plate worn evenly to the discharge end is a life-cycle decision; a plate cracked through the mounting area points at the seat or the feed. Send those four items with the machine model and part number and the replacement can be quoted against how the part actually performs in your plant.',
        ],
      },
    ],
    guides: [
      { label: 'Mn13 jaw plates: grades and specification', href: '/news/mn13-jaw-plates-guide/' },
      { label: 'How to choose jaw plate material', href: '/news/how-to-choose-jaw-plate-material/' },
      { label: 'Identify the correct jaw plate for your crusher', href: '/news/how-to-identify-the-correct-jaw-plate-for-your-crusher/' },
    ],
  },

  'cone-crusher-wear-parts': {
    sections: [
      {
        heading: 'The chamber is a pair, not a part',
        paragraphs: [
          'A cone crusher reduces rock between a moving mantle and a fixed concave, and the two liners together define the chamber profile. Replacing one without regard to the other changes the profile: a new mantle against a worn concave opens the chamber at the top and closes it at the bottom, which shifts reduction ratio, product shape and power draw. Buyers who track liner life per set rather than per piece usually get a more stable product and fewer surprises at change-out.',
          'Feed distribution matters as much as the grade. Material that enters on one side wears the chamber unevenly, and an uneven chamber loads the crusher asymmetrically. A wear profile that is deep on one side and untouched on the other is a feed problem, not a material problem, and it will repeat with any liner brand until the feed is corrected.',
        ],
      },
      {
        heading: 'Reading wear, breakage and packing',
        paragraphs: [
          'Mantles and concaves normally wear as a smooth, even reduction of the profile. Breakage — a cracked or chipped liner — usually traces to tramp metal, a stalled crusher with material packed in the chamber, or a backing and clamping issue rather than to the alloy itself. Packing shows as a polished, hammered band and is often a symptom of a setting that is too tight for the feed or of uneven feed.',
          'Useful records at change-out: the liner part numbers and positions, hours and tonnes, the closed-side setting, feed gradation, average power draw, and photographs of the worn profile from the top and the side. With those, the next set can be specified against the duty instead of against a catalogue number. Our review confirms material, chamber geometry and inspection scope before production, and a worn sample is often the fastest way to match an unmarked liner.',
        ],
      },
    ],
    guides: [
      { label: 'Cone liners: mantle, concave and bowl liner identification', href: '/news/cone-crusher-liners-mantle-concave-guide/' },
      { label: 'Factors affecting wear part service life', href: '/news/what-factors-affect-the-service-life-of-crusher-wear-parts/' },
    ],
  },

  'impact-crusher-wear-parts': {
    sections: [
      {
        heading: 'Matching the bar grade to impact energy',
        paragraphs: [
          'A blow bar sees a different load from a jaw plate: the hit is fast and concentrated at the bar edge. High-chromium cast iron (Cr15–Cr26) offers high abrasion resistance and holds its shape well where the feed is abrasive and the impact is controlled. Manganese grades trade some of that abrasion resistance for toughness where the feed contains larger or uncrushable material. Alloy grades sit between the two and are often chosen where a single bar has to survive mixed duty.',
          'The practical question is not which grade is "best" but which failure mode costs more. Bars that wear smoothly but quickly point to abrasion and favour higher chromium. Bars that chip or break point to impact and favour toughness. Bars that wear on one end only point to rotor or feed issues that no grade will fix.',
        ],
      },
      {
        heading: 'Rotor balance, clearances and the set',
        paragraphs: [
          'Blow bars are mounted on a rotor that turns at speed, so the set matters as much as the individual bar. Bars of different weight in the same rotor produce vibration, and vibration accelerates bearing and hammer-bolt problems. When replacing, weigh and pair the bars, and record the position of each so the next set can be rotated in the same pattern.',
          'The apron gap and the gap between bars and liners control product size and the amount of recirculating load. A gap that is too tight for the feed raises power draw and wear; too wide and the product misses spec. The keyway, fixing geometry and bar profile are reproduced from the part number, drawing or sample, and the review confirms dimensions and hardness before casting.',
        ],
      },
    ],
    guides: [
      { label: 'Blow bars: high manganese vs high chrome', href: '/news/blow-bars-manganese-vs-high-chrome/' },
      { label: 'What information is needed for a wear parts quote', href: '/news/what-information-is-needed-for-a-custom-crusher-wear-parts-quote/' },
    ],
  },

  'hammer-crusher-wear-parts': {
    sections: [
      {
        heading: 'Hammer weight is a balance specification',
        paragraphs: [
          'Hammer crushers rely on rotating kinetic energy, so the mass of each hammer is part of the machine specification. A replacement set that is lighter or heavier than the original changes impact energy and rotor balance; a set with mixed weights produces vibration from the first hour. Where the original weight is unknown, it can be established from the part number, a drawing dimension or a worn sample, and the casting is produced to that reference.',
          'High-manganese steel is the usual choice for hammer heads because the impact work-hardens the tip. In fine, low-impact duty the same limitation as jaw plates applies: without enough impact the surface does not harden, and an alloy grade with higher initial hardness may deliver more life. The feed size and the target product decide which case you are in.',
        ],
      },
      {
        heading: 'Tip wear, shank wear and grate clearance',
        paragraphs: [
          'Hammer wear has two stages. The tip rounds first, which reduces the concentration of impact and lets the crusher recirculate more material; then the shank and the mounting area wear, which affects fit and balance. Checking the grate or grid clearance at each rotation keeps the product size stable and avoids unnecessary power draw.',
          'At change-out, photograph the hammers in position before removal, note which positions wore fastest, and record hours and tonnes. Uneven wear across positions usually points to feed distribution or to a rotor that is not running true. Breakage across the mounting hole is more often a fit or tramp-metal issue than an alloy issue. Those records, with the machine model, let the next set be specified on evidence.',
        ],
      },
    ],
    guides: [
      { label: 'Factors affecting wear part service life', href: '/news/what-factors-affect-the-service-life-of-crusher-wear-parts/' },
      { label: 'Inspection records to request for wear parts', href: '/news/what-inspection-records-should-buyers-request-for-crusher-wear-parts/' },
    ],
  },

  'double-roll-crusher-wear-parts': {
    sections: [
      {
        heading: 'Tooth geometry sets the product, the gap sets the load',
        paragraphs: [
          'In a double roll crusher the feed is gripped and crushed between two counter-rotating rolls. The tooth profile — pitch, height and shape — controls how the material is gripped and how much fines the pass produces, while the gap between the rolls sets the product size. A worn tooth profile changes both: the rolls lose grip, throughput falls and the product curve shifts even though the gap has not moved.',
          'Roller shells and toothed segments therefore wear as a system. Replacing teeth without checking the shell surface or the opposite roll often restores neither throughput nor product size, because the worn half still controls the nip.',
        ],
      },
      {
        heading: 'Machining, fit and what to measure before ordering',
        paragraphs: [
          'Cast roll shells normally require machining: bores and faces to the required fit, tooth profiles to the drawing, and enough material left for the final cut. A shell that is cast close but not machined to the shaft fit will not run true, and run-out shows up as vibration and uneven tooth wear. Where a roll is rebuilt rather than replaced, the bore and the shaft should be measured before the new shell is ordered.',
          'Useful details for a quotation: roll diameter and face width, shaft and bore dimensions with tolerances, tooth pitch and profile, the existing material if known, feed size and product target, and photographs of the worn surface showing whether wear is concentrated at the centre or the edges. Edge wear points to feed distribution; centre wear points to duty. Both are visible in a photograph taken straight on, with a scale.',
        ],
      },
    ],
    guides: [
      { label: 'Inspection records to request for wear parts', href: '/news/what-inspection-records-should-buyers-request-for-crusher-wear-parts/' },
      { label: 'MOQ, tooling and lead time', href: '/news/crusher-wear-parts-moq-lead-time/' },
    ],
  },

  'bucket-teeth-adapters': {
    sections: [
      {
        heading: 'Penetration or wear life: the tooth profile decides',
        paragraphs: [
          'Ground-engaging teeth are a compromise between penetration and wear volume. A chisel or sharp profile concentrates force and penetrates compacted material well, but carries less wear material at the tip. A standard or flare profile puts more metal where the load is and lasts longer in abrasive, high-volume digging, at the cost of some penetration. The right choice depends on the material being dug, not on the machine alone.',
          'The adapter is the other half of the system. A tooth that fits loosely on a worn adapter moves under load, which wears the seat, damages the pin or retainer and can lose the tooth entirely. When a set is replaced, the adapter seat is worth inspecting: a worn seat will shorten the life of every new tooth fitted to it.',
        ],
      },
      {
        heading: 'Wear limits, fit and matched sets',
        paragraphs: [
          'Teeth are normally replaced when the wear surface reaches the adapter or when the tip has lost the profile that penetrates. Running past that point transfers wear to the adapter, which is the more expensive part to replace. Recording hours per set by machine and by application turns that decision into a schedule rather than a breakdown call.',
          'For distributors, teeth, adapters and retaining pins are usually ordered as matched sets so that fit is guaranteed across the batch. References cover the common CAT, Komatsu, Volvo, DAEWOO, SANY, Lonking and SDLG ranges; where a part number is unmarked, a photograph of the tooth with the adapter, plus key dimensions, is usually enough to match. Material and hardness are confirmed in review against the digging conditions.',
        ],
      },
    ],
    guides: [
      { label: 'What information is needed for a wear parts quote', href: '/news/what-information-is-needed-for-a-custom-crusher-wear-parts-quote/' },
      { label: 'Inspection records to request for wear parts', href: '/news/what-inspection-records-should-buyers-request-for-crusher-wear-parts/' },
    ],
  },

  'custom-castings': {
    sections: [
      {
        heading: 'The process route follows geometry and volume',
        paragraphs: [
          'Four in-house routes cover most custom work, and the choice is driven by geometry and quantity rather than preference. Green sand suits medium to large parts and flexible batch sizes. Shell moulding gives a better surface finish and tighter dimensional control for thinner sections. Lost foam handles complex shapes and reduces the need for draft and cores. Investment casting is the route for small, detailed parts where dimensional accuracy matters more than size.',
          'The drawing review is where cost is decided. Machining allowance, draft, fillet radii, shrinkage and gating all affect yield and tooling. A part designed without casting draft can still be made, but the tooling and the finishing cost change — which is why a review before quoting is more useful than a price against an incomplete drawing.',
        ],
      },
      {
        heading: 'What a complete specification package contains',
        paragraphs: [
          'A workable package has five parts: the drawing or 3D model, the material grade with the standard it is measured against, the machining and inspection scope, the marking and packaging requirement, and the quantity with the delivery market. Where a standard is not named, the review proposes one and confirms it in writing — the certificate is only meaningful if the standard was agreed before the heat was poured.',
          'Prototype and batch orders follow the same route: confirm the specification, produce the first piece, inspect it against the agreed records, then release the batch. Third-party inspection can be arranged where the buyer requires it. Documentation travels with the shipment — material certificates, dimensional records, hardness and visual inspection — so the paperwork matches the parts when they arrive.',
        ],
      },
    ],
    guides: [
      { label: 'Green sand vs investment casting', href: '/news/green-sand-vs-investment-casting/' },
      { label: 'Information needed for a custom casting quote', href: '/news/what-information-is-needed-for-a-custom-crusher-wear-parts-quote/' },
      { label: 'MOQ, tooling and lead time', href: '/news/crusher-wear-parts-moq-lead-time/' },
    ],
  },
};
