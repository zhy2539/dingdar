export type ProcessLang = 'en' | 'es' | 'fr' | 'ru' | 'pt';

export interface ProcessStep {
  title: string;
  text: string;
}

export interface ProcessDetail {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  lead: string;
  overview: string;
  steps: ProcessStep[];
  benefits: string[];
  suitableFor: string[];
  downstream: string;
  faq: { q: string; a: string }[];
  localized: Partial<Record<Exclude<ProcessLang, 'en'>, {
    name: string;
    title: string;
    description: string;
    lead: string;
  }>>;
}

export const PROCESS_DETAILS: ProcessDetail[] = [
  {
    slug: 'green-sand',
    name: 'Green Sand Casting',
    image: '/images/foundry-pouring.webp',
    imageAlt: 'Molten metal being poured in a foundry casting operation',
    title: 'Green Sand Casting for Large Wear Parts and Structural Castings',
    description: 'Green sand casting for medium and large wear parts, structural castings and custom components. Review material, geometry, tooling and inspection with DINGDAR.',
    lead: 'A flexible, cost-conscious route for medium to very large castings, including crusher wear parts, frames, housings and custom industrial castings.',
    overview: 'Green sand casting uses compacted moulding sand around a pattern to form the cavity for the casting. It remains the practical workhorse for large and heavy components because the method supports a broad size range, a wide material family and relatively fast pattern preparation. The final route is selected against the drawing, part weight, geometry, material and working conditions rather than by size alone.',
    steps: [
      { title: 'Pattern and mould preparation', text: 'The pattern and parting arrangement are reviewed from the drawing, sample or reference part. Moulding sand is prepared and compacted around the pattern to create the casting cavity.' },
      { title: 'Core and gating setup', text: 'Cores, runners, risers and the gating layout are arranged to support filling, feeding and the required geometry. Critical sections are reviewed before the mould is closed.' },
      { title: 'Melting and pouring', text: 'The selected alloy family is melted and poured into the prepared mould under the agreed process controls. Material and heat information can be recorded for the project file.' },
      { title: 'Cooling and shakeout', text: 'After solidification, the mould is broken down and the casting is separated from the sand. Runners, risers and excess material are removed for the next stage.' },
      { title: 'Heat treatment, finishing and inspection', text: 'The casting moves through the agreed heat treatment, fettling, machining and inspection scope. Dimensional, hardness, visual or additional checks are defined before production.' },
    ],
    benefits: [
      'Suitable for medium to very large castings and heavy wear components.',
      'Broad compatibility with manganese steel, alloy steel, ductile iron and other agreed grades.',
      'Competitive tooling and production economics for batches and repeat supply.',
      'A practical route for parts that will receive machining, heat treatment or finishing after casting.',
    ],
    suitableFor: [
      'Jaw plates, crusher bodies and other large wear castings',
      'Frames, housings and structural industrial castings',
      'Custom castings supplied from drawings, samples or part references',
      'Medium-to-high volume replacement parts where tooling cost must stay controlled',
    ],
    downstream: 'Green sand castings are commonly followed by heat treatment, shot blasting or fettling, machining on critical interfaces, dimensional inspection and export packing. The exact sequence is fixed during technical review so the casting, hardness and machined features match the buyer\'s acceptance requirements.',
    faq: [
      { q: 'Is green sand casting suitable for large crusher wear parts?', a: 'It is often the practical starting route for large wear parts because it supports a broad size and material range. The final choice still depends on geometry, section thickness, quantity, material and inspection requirements.' },
      { q: 'Can you produce a green sand casting from a sample?', a: 'Yes. A sample, part number, equipment model or drawing can start the review. The missing dimensions, material and inspection points are confirmed before tooling and quotation.' },
      { q: 'What information should be sent for a process review?', a: 'Send the part reference or drawing, material or application, quantity, working conditions and delivery market if known. Photos of a worn part can also help identify the requirement.' },
    ],
    localized: {
      es: { name: 'Moldeo en arena verde', title: 'Moldeo en arena verde para grandes piezas de desgaste y fundiciones estructurales', description: 'Moldeo en arena verde para piezas de desgaste medianas y grandes, fundiciones estructurales y componentes personalizados.', lead: 'Una ruta flexible y competitiva para piezas pequeñas, medianas y muy grandes, incluidas piezas de desgaste, bastidores, carcasas y fundiciones industriales.' },
      fr: { name: 'Moulage sable à vert', title: 'Moulage sable à vert pour grandes pièces d’usure et pièces structurelles', description: 'Moulage sable à vert pour pièces d’usure moyennes et grandes, pièces structurelles et composants sur mesure.', lead: 'Une voie flexible et compétitive pour les pièces moyennes à très grandes, les pièces d’usure, châssis, carters et composants industriels.' },
      ru: { name: 'Литьё в сырые песчаные формы', title: 'Литьё в сырые песчаные формы для крупных износостойких и конструкционных деталей', description: 'Литьё в сырые песчаные формы для средних и крупных износостойких деталей, конструкционных отливок и компонентов по чертежу.', lead: 'Гибкий и экономичный маршрут для средних и очень крупных отливок, включая детали дробилок, корпуса, рамы и индивидуальные компоненты.' },
      pt: { name: 'Fundição em areia verde', title: 'Fundição em areia verde para grandes peças de desgaste e fundidos estruturais', description: 'Fundição em areia verde para peças de desgaste médias e grandes, fundidos estruturais e componentes personalizados.', lead: 'Uma rota flexível e competitiva para peças médias a muito grandes, incluindo peças de desgaste, estruturas, carcaças e componentes industriais.' },
    },
  },
  {
    slug: 'shell-moulding',
    name: 'Shell Moulding',
    image: '/images/factory-mould-line.webp',
    imageAlt: 'Moulding line and prepared casting moulds in a foundry',
    title: 'Shell Moulding for Repeatable Parts and Better Surface Finish',
    description: 'Shell moulding for repeatable castings that need more consistent dimensions and surface finish than standard sand moulding. Technical review by DINGDAR.',
    lead: 'A resin-coated sand shell route for repeatable small and medium castings where dimensional consistency, surface quality and series production matter.',
    overview: 'Shell moulding forms a thin, rigid mould from resin-coated sand heated against a pattern. Compared with standard green sand moulding, the shell can provide a more stable mould surface and more repeatable results for suitable parts. It is considered when the buyer needs a balance between tooling cost, production volume, finish and dimensional control.',
    steps: [
      { title: 'Pattern preparation', text: 'The pattern and parting line are reviewed for the required geometry, draft, cores and machining allowance. The pattern surface is prepared for the resin-coated sand shell.' },
      { title: 'Shell formation', text: 'Resin-coated sand is brought against the heated pattern and cured into a rigid shell of controlled thickness. The shell halves are checked before assembly.' },
      { title: 'Core, shell and mould assembly', text: 'Cores and shell sections are fitted, aligned and supported with backing material where required. The gating and riser arrangement is kept stable for repeat production.' },
      { title: 'Pouring and solidification', text: 'The agreed alloy is melted and poured into the assembled shell. Cooling time and handling are managed according to the part geometry and material.' },
      { title: 'Cleaning and inspection', text: 'The shell is removed after solidification, followed by cutting, fettling, heat treatment, machining and inspection according to the confirmed order scope.' },
    ],
    benefits: [
      'More consistent mould surfaces and dimensions for repeatable production.',
      'Improved surface finish compared with a basic sand mould for suitable geometries.',
      'Useful balance between precision, tooling investment and series volume.',
      'Can reduce finishing and machining effort when allowances are designed correctly.',
    ],
    suitableFor: [
      'Small and medium castings supplied in repeat series',
      'Components where dimensional consistency matters across batches',
      'Housings, covers, brackets and industrial parts with defined geometry',
      'Projects needing a more controlled mould surface without moving to precision casting',
    ],
    downstream: 'After shell casting, the agreed route may include shakeout, cutting, fettling, heat treatment, machining and dimensional inspection. Sample approval or first-article review can be used when the part is new or the geometry is critical.',
    faq: [
      { q: 'When is shell moulding better than green sand casting?', a: 'Shell moulding is considered when repeatability and surface finish are more important than the lowest tooling cost. Part size, geometry, volume and machining allowance still determine whether it is economical.' },
      { q: 'Is shell moulding suitable for wear parts?', a: 'It can be suitable for selected small and medium wear or industrial components. The material, impact duty, section thickness and final inspection requirements must be reviewed for each part.' },
      { q: 'Can shell moulding reduce machining?', a: 'A controlled mould surface and stable allowances can reduce finishing or machining effort on suitable features, but the actual allowance is confirmed from the drawing and tolerance requirement.' },
    ],
    localized: {
      es: { name: 'Moldeo en cáscara', title: 'Moldeo en cáscara para piezas repetibles y mejor acabado superficial', description: 'Moldeo en cáscara para piezas repetibles que requieren dimensiones y acabado más constantes que el moldeo en arena estándar.', lead: 'Una ruta con arena recubierta de resina para piezas pequeñas y medianas donde importan la consistencia dimensional, el acabado y la producción en serie.' },
      fr: { name: 'Moulage en carapace', title: 'Moulage en carapace pour pièces répétables et meilleur état de surface', description: 'Moulage en carapace pour pièces répétables nécessitant une meilleure constance dimensionnelle et de surface que le sable standard.', lead: 'Une voie en sable enduit de résine pour petites et moyennes pièces lorsque la constance, l’état de surface et la série sont importants.' },
      ru: { name: 'Литьё в оболочковые формы', title: 'Литьё в оболочковые формы для серийных деталей и лучшей поверхности', description: 'Литьё в оболочковые формы для повторяемых деталей с более стабильными размерами и качеством поверхности.', lead: 'Маршрут с песчаной оболочкой на смоле для малых и средних деталей, где важны стабильность размеров, поверхность и серийность.' },
      pt: { name: 'Fundição em casca', title: 'Fundição em casca para peças repetíveis e melhor acabamento superficial', description: 'Fundição em casca para peças repetíveis que exigem dimensões e acabamento mais consistentes que a areia convencional.', lead: 'Uma rota com areia revestida de resina para peças pequenas e médias em que consistência, acabamento e produção em série importam.' },
    },
  },
  {
    slug: 'lost-foam',
    name: 'Lost Foam Casting',
    image: '/images/factory-casting-workshop.webp',
    imageAlt: 'Casting workshop with industrial moulding and finishing activity',
    title: 'Lost Foam Casting for Complex Near-Net-Shape Geometry',
    description: 'Lost foam casting for complex geometries and low-to-mid volume projects. Review pattern design, material, machining stock and inspection with DINGDAR.',
    lead: 'A near-net-shape route that can simplify complex geometry and reduce the need for traditional parting lines, cores or extensive machining on suitable castings.',
    overview: 'Lost foam casting uses a foam pattern that represents the final part geometry. The pattern is coated, placed in a moulding medium and surrounded by compacted sand. During pouring, the foam is displaced as the metal fills the cavity. The method is considered for complex shapes, integrated features and projects where a near-net-shape result can simplify downstream work.',
    steps: [
      { title: 'Foam pattern development', text: 'The drawing or sample is translated into a foam pattern and reviewed for shrinkage, gating, wall sections, vents and the required machining stock.' },
      { title: 'Pattern coating and assembly', text: 'The foam pattern is coated to control the mould interface and assembled with the planned gating system. Complex features can be incorporated into the pattern.' },
      { title: 'Filling and compaction', text: 'The coated pattern is placed in the moulding medium and surrounded by sand. Controlled filling and vibration support pattern stability and cavity definition.' },
      { title: 'Vacuum-assisted pouring', text: 'Vacuum and pouring conditions are coordinated so the metal replaces the foam pattern and fills the intended geometry. Process settings depend on the alloy and part design.' },
      { title: 'Shakeout and finishing', text: 'After cooling, the casting is recovered, cleaned and inspected. Heat treatment, machining and finishing follow the confirmed technical requirement.' },
    ],
    benefits: [
      'Supports complex geometry and integrated features with fewer traditional parting constraints.',
      'Can reduce core-making and mould assembly steps on suitable designs.',
      'Near-net-shape potential can reduce machining stock and material removal.',
      'Useful for low-to-mid volume development and repeat projects after pattern validation.',
    ],
    suitableFor: [
      'Complex housings, frames and industrial castings',
      'Parts with internal or integrated features that are difficult to mould conventionally',
      'Low-to-mid volume projects where pattern flexibility matters',
      'Components where reducing machining stock can improve the total process',
    ],
    downstream: 'Lost foam castings still require cleaning, dimensional review and any specified heat treatment, machining or non-destructive testing. The pattern design and inspection points are agreed before the first trial so the near-net-shape benefit is measurable against the drawing.',
    faq: [
      { q: 'Does lost foam casting eliminate machining?', a: 'No. It can reduce machining stock on suitable features, but critical interfaces and tolerances still require the machining and inspection defined by the drawing.' },
      { q: 'What parts are a good fit for lost foam casting?', a: 'Complex castings with integrated geometry, limited batch sizes or difficult conventional cores can be candidates. The final decision depends on material, wall sections, dimensions, quantity and acceptance criteria.' },
      { q: 'Can the pattern be changed during development?', a: 'Pattern revisions can be considered during the trial stage. The change, tooling impact and approval method are confirmed before the next sample or production batch.' },
    ],
    localized: {
      es: { name: 'Moldeo por espuma perdida', title: 'Moldeo por espuma perdida para geometrías complejas casi netas', description: 'Moldeo por espuma perdida para geometrías complejas y proyectos de volumen bajo a medio, con revisión técnica de DINGDAR.', lead: 'Una ruta casi neta que puede simplificar geometrías complejas y reducir líneas de partición, núcleos o mecanizado en piezas adecuadas.' },
      fr: { name: 'Moulage à mousse perdue', title: 'Moulage à mousse perdue pour géométries complexes quasi nettes', description: 'Moulage à mousse perdue pour géométries complexes et projets à faible ou moyen volume, avec revue technique DINGDAR.', lead: 'Une voie quasi nette qui peut simplifier les géométries complexes et réduire les noyaux ou l’usinage sur les pièces adaptées.' },
      ru: { name: 'Литьё по газифицируемым моделям', title: 'Литьё по газифицируемым моделям для сложной геометрии', description: 'Литьё по газифицируемым моделям для сложных отливок и проектов малой или средней серийности.', lead: 'Маршрут, близкий к готовой форме, который может упростить сложную геометрию и сократить сердцевины или последующую обработку.' },
      pt: { name: 'Fundição em espuma perdida', title: 'Fundição em espuma perdida para geometrias complexas quase finais', description: 'Fundição em espuma perdida para geometrias complexas e projetos de baixo a médio volume, com revisão técnica da DINGDAR.', lead: 'Uma rota quase final que pode simplificar geometrias complexas e reduzir divisões, machos ou usinagem em peças adequadas.' },
    },
  },
  {
    slug: 'investment',
    name: 'Investment Casting',
    image: '/images/casting-finishing.webp',
    imageAlt: 'Finished cast components prepared for inspection and finishing',
    title: 'Investment Casting for Small Precision Components and Fine Detail',
    description: 'Investment casting for small precision components with fine detail and tight tolerance requirements. Send a drawing, sample or part reference for review.',
    lead: 'A precision route using a disposable pattern and ceramic shell for smaller components where detail, surface finish and dimensional control justify the process.',
    overview: 'Investment casting, also known as lost-wax casting, begins with a wax or polymer pattern that is coated to form a ceramic shell. The pattern is removed before the alloy is poured into the shell. The method can reproduce fine detail and complex profiles with less parting-line limitation than conventional moulding, making it suitable where precision reduces machining or enables a difficult geometry.',
    steps: [
      { title: 'Tooling and pattern preparation', text: 'The part geometry, shrinkage allowance, gating and required surface condition are reviewed before the pattern tooling is prepared.' },
      { title: 'Pattern production and assembly', text: 'Disposable wax or polymer patterns are produced and assembled into a tree or runner system so multiple parts can be processed consistently.' },
      { title: 'Ceramic shell building', text: 'The pattern assembly is repeatedly coated and stuccoed to build a ceramic shell with the required strength and surface condition.' },
      { title: 'Dewaxing and pouring', text: 'The pattern is removed from the shell, the shell is prepared and the selected alloy is poured under the agreed process conditions.' },
      { title: 'Shell removal, finishing and inspection', text: 'The ceramic shell is removed, gates are cut, surfaces are finished and the parts are inspected against the drawing and agreed documentation scope.' },
    ],
    benefits: [
      'High detail reproduction for small and intricate components.',
      'Good dimensional control and surface finish for suitable geometries.',
      'Can reduce machining on complex profiles and difficult-to-access features.',
      'Useful for prototypes, replacement components and low-to-mid volume precision work.',
    ],
    suitableFor: [
      'Small components with fine detail and tighter dimensional requirements',
      'Complex profiles where traditional parting lines would be restrictive',
      'Valves, fittings, brackets and industrial precision castings',
      'Projects where surface finish and reduced machining justify tooling and cycle cost',
    ],
    downstream: 'Investment castings may receive gate removal, light finishing, heat treatment, machining on critical faces and dimensional or visual inspection. The required tolerance, surface condition and documentation are confirmed from the drawing before quotation.',
    faq: [
      { q: 'Is investment casting the most suitable process for every precise part?', a: 'Not always. It is strong for small, detailed components, but size, annual volume, material, tolerance and total machining cost must be compared with shell or other routes.' },
      { q: 'Can investment casting produce alloy steel parts?', a: 'Potentially, subject to the part geometry, section thickness, alloy specification and foundry review. The required grade and heat treatment are confirmed before production.' },
      { q: 'What should be included in an investment casting quotation request?', a: 'Send the 2D drawing or 3D model, material grade, critical tolerances, surface requirements, quantity and any inspection documents. A sample or part photo can start the review when a drawing is not yet available.' },
    ],
    localized: {
      es: { name: 'Microfusión', title: 'Microfusión para componentes pequeños de precisión y detalles finos', description: 'Microfusión para componentes pequeños de precisión con detalles finos y requisitos dimensionales exigentes.', lead: 'Una ruta de precisión con patrón desechable y cáscara cerámica para componentes pequeños donde importan el detalle, el acabado y el control dimensional.' },
      fr: { name: 'Moulage de précision', title: 'Moulage de précision pour petits composants et détails fins', description: 'Moulage de précision pour petits composants nécessitant des détails fins et un contrôle dimensionnel élevé.', lead: 'Une voie de précision avec modèle perdu et carapace céramique pour les petites pièces où détail, finition et contrôle dimensionnel sont essentiels.' },
      ru: { name: 'Литьё по выплавляемым моделям', title: 'Литьё по выплавляемым моделям для малых точных деталей', description: 'Литьё по выплавляемым моделям для малых компонентов со сложными деталями и повышенными требованиями к размерам.', lead: 'Точный маршрут с одноразовой моделью и керамической оболочкой для малых деталей, где важны детализация, поверхность и размеры.' },
      pt: { name: 'Fundição de precisão', title: 'Fundição de precisão para pequenos componentes e detalhes finos', description: 'Fundição de precisão para componentes pequenos com detalhes finos e requisitos dimensionais exigentes.', lead: 'Uma rota de precisão com padrão descartável e casca cerâmica para componentes pequenos em que detalhe, acabamento e controle dimensional importam.' },
    },
  },
];

export function getProcessDetail(slug: string): ProcessDetail | undefined {
  return PROCESS_DETAILS.find((p) => p.slug === slug);
}

export function getProcessCopy(process: ProcessDetail, lang: ProcessLang) {
  return lang === 'en' ? process : (process.localized[lang] || process.localized.es || {
    name: process.name,
    title: process.title,
    description: process.description,
    lead: process.lead,
  });
}
