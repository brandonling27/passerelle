/*
 * Passerelle Consulting — FR/EN language toggle.
 *
 * French is the default and is authored directly in each page's markup; this
 * script reads it out of the DOM on load, so there is no French dictionary to
 * keep in sync. Only English lives here, keyed by the data-i18n attributes.
 *
 * Supported attributes:
 *   data-i18n="key"          → element textContent
 *   data-i18n-html="key"     → element innerHTML (for copy containing markup)
 *   data-i18n-label="key"    → aria-label attribute
 *   data-i18n-content="key"  → content attribute (meta description)
 *   <body data-title-key="key"> → document title for that page
 *
 * Keys not present on a given page are simply unused, so this one file serves
 * every page. The visitor's choice persists in localStorage.
 */
(function(){
  var DEFAULT_LANG = 'fr';
  var STORAGE_KEY = 'passerelle-lang';

  var en = {
    /* ---------- shared ---------- */
    'a11y.skip': 'Skip to main content',
    'lang.aria': 'Language selection',
    'nav.home': 'Home',
    'nav.services': 'What we do',
    'nav.approach': 'How it works',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'foot.left': 'PASSERELLE CONSULTING — ONLINE ADVERTISING CONSULTING',
    'cta.btn': 'Get in touch',

    /* ---------- page titles & meta ---------- */
    'title.home': 'Passerelle Consulting — Take back control of your online advertising',
    'title.services': 'What we do — Passerelle Consulting',
    'title.approach': 'How it works — Passerelle Consulting',
    'title.about': 'About — Passerelle Consulting',
    'title.contact': 'Contact — Passerelle Consulting',
    'desc.home': 'Independent consulting for brands that want to run their own online advertising. We set up and connect the tools, then train your team to use them.',
    'desc.services': 'Six ways we help with your online advertising, explained in plain language — and what we do not do.',
    'desc.approach': 'How an engagement runs, in four steps, how we differ from an agency, and the questions we are asked most often.',
    'desc.about': 'Fifteen years spent building the advertising platforms themselves, at TripleLift, Martin DSP, PubMatic and Scope3.',
    'desc.contact': 'A first one-hour conversation, free and with no commitment. Based in Paris and New York.',

    /* ---------- home ---------- */
    'home.eyebrow': 'Online advertising · Paris & New York',
    'home.h1': 'Your team knows <em>what</em> to buy.<br>We build <em>how</em> it works.',
    'home.sub': 'Online advertising runs on technical machinery that almost nobody explains to you. We set it up, connect it, make it comply with the law — then train your team so they can run it without us.',
    'home.cta1': "Let's talk",
    'home.cta2': 'What we do',

    'home.plainKicker': 'in plain terms',
    'home.plainH2': 'The problem, without the jargon',
    'home.plainLede': 'Plenty of brands want to stop outsourcing everything to an agency. The obstacle is almost never the strategy — it is the plumbing underneath it.',
    'home.c1h': "You pay without seeing where the money goes",
    'home.c1p': 'Between your budget and the ad someone actually sees, there is a long chain of intermediaries. When you do not control the tools, you cannot check what happens in the middle.',
    'home.c2h': 'The tools do not talk to each other',
    'home.c2p': 'Your advertising platforms, your website and your customer data all have to be wired together correctly. Wired badly, you pay to reach people you have no interest in.',
    'home.c3h': 'The law changed; your settings did not',
    'home.c3p': 'Consent, GDPR, the end of advertising cookies: many setups still run on settings that are no longer compliant — and that gets fixed in the tools, not in a legal memo.',

    'fig1.kicker': 'diagram',
    'fig1.h2': 'Where we fit in',
    'fig1.lede': 'We do not replace your marketing team and we do not choose your messages. We handle the technical layer between your decisions and the tools that carry them out.',
    'fig1.left': 'fig. 1 — where we sit',
    'fig1.right': 'your decisions → the technical layer → the tools',
    'fig1.alt': 'Diagram: your marketing team on one side, Passerelle in the middle, and on the other side the media buying, ad inventory, consent and customer data tools',
    'fig1.brand': 'YOUR BRAND',
    'fig1.brandSub': 'marketing team',
    'fig1.core1': 'setup · compliance',
    'fig1.core2': 'connecting the tools',
    'fig1.n1': 'Media buying',
    'fig1.n2': 'Ad inventory',
    'fig1.n3': 'Consent',
    'fig1.n4': 'Customer data',
    'fig1.note': 'In plain terms: your team decides what to say and to whom. We handle the plumbing that connects your tools together, and we teach you how to run it.',

    'home.exploreKicker': 'read on',
    'home.exploreH2': 'Where to start',
    'teaser.k1': 'what we do',
    'teaser.h1': 'What we do',
    'teaser.p1': 'Six ways we get involved, explained simply — and the equally important list of what we do not do.',
    'teaser.k2': 'the process',
    'teaser.h2': 'How it works',
    'teaser.p2': 'The four stages of an engagement, what it costs in time, and why it ends instead of dragging on.',
    'teaser.k3': "who's talking",
    'teaser.h3': 'About',
    'teaser.p3': 'Fifteen years spent building the platforms themselves, rather than using them from a distance.',
    'teaser.k4': 'first conversation',
    'teaser.h4': 'Contact',
    'teaser.p4': 'A first conversation with no commitment, even if you cannot yet put the problem into words.',
    'teaser.go': 'Read more →',

    'cta.h2': 'Not sure you need us?',
    'cta.p': 'That is usually a good moment to talk. One conversation is normally enough to tell whether this is our territory — and if it is not, we will say so.',

    /* ---------- services ---------- */
    'svc.h1': 'Six ways we help',
    'svc.lede': 'You do not need all six. Most engagements start with one or two, and the rest follow only if they are useful. Each one is described in everyday language, with the technical term underneath in case your provider uses it.',
    'svc.t1': '01 — setup',
    'svc.h3a': 'Setting up your operation',
    'svc.p1': 'You want to buy your advertising yourself rather than hand everything to an agency. We choose the platforms that fit your size and budget, install them and configure them.',
    'svc.j1': 'also called: DSP selection, trading desk architecture',
    'svc.t2': '02 — connections',
    'svc.h3b': 'Getting your tools to talk to each other',
    'svc.p2': 'Your platforms have to exchange the right information in the right order. When those connections are wrong, you pay more for a worse result — and nothing flags the mistake.',
    'svc.j2': 'also called: SSP/DSP integration, header bidding, bidstream',
    'svc.t3': '03 — compliance',
    'svc.h3c': 'Staying on the right side of the law',
    'svc.p3': 'Consent banners, GDPR, regulator audits, the disappearance of advertising cookies. These are legal questions with technical answers: we handle the technical half, alongside your lawyers.',
    'svc.j3': 'also called: CMP integration, GDPR compliance, cookieless identity',
    'svc.t4': '04 — data',
    'svc.h3d': 'Putting your own customer data to work',
    'svc.p4': 'You already know a great deal about your customers. We make that information usable in your campaigns — lawfully, and without handing it to third parties who have no business receiving it.',
    'svc.j4': 'also called: first-party data activation, data layer audit',
    'svc.t5': '05 — training',
    'svc.h3e': 'Training your team',
    'svc.p5': 'Structured training pitched at your team’s actual level, so they can run the setup on their own once we leave. This is the part that lets an engagement genuinely end.',
    'svc.j5': 'also called: upskilling, knowledge transfer',
    'svc.t6': '06 — ongoing support',
    'svc.h3f': 'Answering your questions afterwards',
    'svc.p6': 'Once everything is in place, questions come up: should we buy this tool? is this offer credible? is this number normal? We stay reachable to answer them.',
    'svc.j6': 'also called: technical advisory, build-vs-buy guidance',
    'svc.notK': 'worth knowing',
    'svc.notH': 'What we do not do',
    'svc.notP': 'We do not run your campaigns day to day, we do not make your creative, and we do not buy ad space on your behalf. We build the machinery and teach you to operate it; your team — or the agency you keep — uses it afterwards. If what you need is day-to-day management rather than setup, we will tell you in the first conversation.',
    'svc.ctaH': 'Not sure which box you are in?',
    'svc.ctaP': 'That is the most common situation. Describe it in your own words — working out the right starting point is part of the job.',

    /* ---------- approach ---------- */
    'app.h1': 'An engagement that ends',
    'app.lede': 'The goal is not for you to need us for long. An engagement runs in four stages, and the last one is handing you the keys.',
    'app.stepsKicker': 'the process',
    'app.stepsH2': 'Four stages',
    'app.stepsLede': 'Typical duration: a few weeks for an assessment on its own, up to a few months for a full setup with training.',
    'app.s1h': 'We take stock',
    'app.s1p': 'A one-hour conversation, free and with no commitment, to understand where you stand. Nothing to prepare, and no need to know the vocabulary.',
    'app.s2h': 'We assess what you have',
    'app.s2p': 'We look at what already exists and give you a readable picture: what works, what does not, what it costs, and the order to tackle it in.',
    'app.s3h': 'We build',
    'app.s3p': 'Setup, connections, compliance. You see progress at every stage, described in language you can repeat internally without translating it.',
    'app.s4h': 'We hand you the keys',
    'app.s4p': 'Training for your team and written documentation. At the end, the setup is yours and runs without us. That was the destination from the start.',
    'app.cmpKicker': 'the difference',
    'app.cmpH2': 'Why not just use an agency?',
    'app.cmpLede': 'Agencies are good at their job. It simply is not the same job — and on one specific point, their interests and yours do not line up.',
    'app.k1': 'An agency',
    'app.h3a': 'Runs your campaigns',
    'app.p1': 'It plans, buys and reports back. That is useful, and plenty of brands are right to keep one. But the technical layer stays on their side: if you leave, you start from scratch. Their interest is in continuing, not in making you self-sufficient.',
    'app.h3b': 'Makes you self-sufficient, then leaves',
    'app.p2': 'We are paid to install a capability inside your company: the tools are in your name, the logins are yours, your team is trained. We take no commission on your ad spend, so we have no interest in you spending more.',
    'faq.kicker': 'frequently asked',
    'faq.h2': 'What we get asked most',
    'faq.q1': 'Do we have to fire our agency to work with you?',
    'faq.a1': 'No, and it is rarely a good idea. Many of our clients keep their agency for creative and day-to-day management, and bring only the technical and data side in-house. The two work well together once the roles are clear.',
    'faq.q2': 'Are we too small for this?',
    'faq.a2': 'It is not about company size but about advertising budget. Below a certain annual spend, running this in-house costs more than it returns — and we will say so plainly rather than sell you an engagement. One conversation is usually enough to settle it.',
    'faq.q3': 'Nobody here is technical. Is that a problem?',
    'faq.a3': 'No. It is the most common situation, and precisely why training is part of the engagement. We expect no technical vocabulary from you: translating is our job, not your job to guess.',
    'faq.q4': 'What does it cost?',
    'faq.a4': 'It depends on the scope, and we prefer to quote after the assessment rather than before. We bill a fixed fee per stage, agreed in advance — never a percentage of your ad spend. The first conversation is free.',
    'app.ctaH': 'The first step is just a conversation',
    'app.ctaP': 'One hour, free, no commitment. If this is not our territory we will say so — and point you elsewhere where we can.',

    /* ---------- about ---------- */
    'ab.h1': 'We built these platforms before advising on them',
    'ab.lede': 'Most online advertising consultants learned the trade on the agency side, using the tools. We learned it from the other direction: building the tools themselves, at the companies that make them.',
    'ab.pedKicker': 'background',
    'ab.pedH2': 'Fifteen years in the engine room',
    'ab.pedLede': 'Engineering roles at the companies that sell advertising space, at the ones that buy it, and on the new generation of AI-driven tools.',
    'ab.r1': 'publisher side',
    'ab.d1': 'The systems that let websites and media companies sell their advertising space.',
    'ab.r2': 'advertiser side',
    'ab.d2': 'The systems that buy advertising on behalf of brands, in a fraction of a second.',
    'ab.r3': 'marketplace',
    'ab.d3': 'One of the large global marketplaces where buyers and sellers of ad space meet.',
    'ab.r4': 'new generation',
    'ab.d4': 'The infrastructure behind advertising driven by artificial intelligence.',
    'ab.whyKicker': 'in practice',
    'ab.whyH2': 'What that means for you',
    'ab.w1h': 'We know when you are being told stories',
    'ab.w1p': 'When a provider explains that something is impossible, too complex or too expensive, we usually know whether that is true — because we have written that kind of system.',
    'ab.w2h': 'We sell no tools',
    'ab.w2p': 'We take no commission from the platforms and no percentage of your advertising spend. The recommendation you get has no commercial motive behind it.',
    'ab.w3h': 'We speak your language',
    'ab.w3p': 'Knowing how the machine works also means being able to explain it without jargon. You should be able to repeat what we just told you, in your own words, in a meeting.',
    'ab.nameK': 'the name',
    'ab.nameH': 'Why "Passerelle"',
    'ab.nameP': 'A passerelle is a footbridge: it joins two banks and is crossed in both directions. On one side, marketing teams who know what they want to achieve; on the other, technical machinery speaking an impenetrable dialect. Our job is to walk people across — then let them cross on their own.',
    'ab.ctaH': 'Rather discuss it in person?',
    'ab.ctaP': 'Based in Paris and New York, we work with brands across France, Europe and the United States.',

    /* ---------- contact ---------- */
    'con.h1': 'Write to us, even without a specific question',
    'con.lede': 'You do not need a brief or the right vocabulary. Describe the situation in your own words: "we cannot see where our budget goes", "our agency is leaving", "people keep mentioning GDPR and we do not know what to do about it". That is a perfectly good starting point.',
    'con.p1': 'Every message is read personally, not by a sales team. Usually a reply within one business day.',
    'con.p2': 'Based in Paris and New York. We work with brands across France, the European Union and the United States — remote-friendly, on-site by arrangement. Conversations in French or English.',
    'con.expectK': 'what to expect',
    'con.e1': 'A first one-hour conversation, free and with no commitment.',
    'con.e2': 'No sales pitch: questions about your situation, and answers to yours.',
    'con.e3': 'A straight answer on whether an engagement makes sense — including when the answer is "not yet" or "not us".',
    'con.e4': 'If we continue: a costed assessment before you commit to anything.',
    'con.prepK': 'before we talk',
    'con.prepH': 'Nothing to prepare',
    'con.prepP': 'If you have them to hand, a rough figure for your annual advertising budget and the names of your current providers save time. If you do not, no matter — we will find them together.'
  };

  /* French copy is captured from the markup on load. */
  var nodes = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-label], [data-i18n-content]');
  var titleKey = document.body.dataset.titleKey;
  var fr = {};

  nodes.forEach(function(el){
    if (el.dataset.i18n) fr[el.dataset.i18n] = el.textContent;
    if (el.dataset.i18nHtml) fr[el.dataset.i18nHtml] = el.innerHTML;
    if (el.dataset.i18nLabel) fr[el.dataset.i18nLabel] = el.getAttribute('aria-label');
    if (el.dataset.i18nContent) fr[el.dataset.i18nContent] = el.getAttribute('content');
  });
  if (titleKey) fr[titleKey] = document.title;

  var dicts = { fr: fr, en: en };
  var buttons = document.querySelectorAll('.lang button');

  function apply(lang){
    var d = dicts[lang] || dicts[DEFAULT_LANG];
    nodes.forEach(function(el){
      var k;
      if ((k = el.dataset.i18n) && d[k] != null) el.textContent = d[k];
      if ((k = el.dataset.i18nHtml) && d[k] != null) el.innerHTML = d[k];
      if ((k = el.dataset.i18nLabel) && d[k] != null) el.setAttribute('aria-label', d[k]);
      if ((k = el.dataset.i18nContent) && d[k] != null) el.setAttribute('content', d[k]);
    });
    if (titleKey && d[titleKey]) document.title = d[titleKey];
    document.documentElement.lang = lang;
    buttons.forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
  }

  buttons.forEach(function(b){
    b.addEventListener('click', function(){ apply(b.dataset.lang); });
  });

  var stored;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch(e){}
  if (stored && dicts[stored] && stored !== DEFAULT_LANG) apply(stored);
})();
