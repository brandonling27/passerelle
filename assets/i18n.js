/*
 * Passerelle Consulting — EN/FR language toggle.
 *
 * English is the default and is authored directly in each page's markup; this
 * script reads it out of the DOM on load, so there is no English dictionary to
 * keep in sync. Only French lives here, keyed by the data-i18n attributes.
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
  var DEFAULT_LANG = 'en';
  var STORAGE_KEY = 'passerelle-lang';

  var fr = {
    /* ---------- shared ---------- */
    "a11y.skip": "Aller au contenu principal",
    "lang.aria": "Choix de la langue",
    "nav.home": "Accueil",
    "nav.services": "Ce que nous faisons",
    "nav.approach": "Comment ça se passe",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "foot.left": "PASSERELLE CONSULTING — CONSEIL EN PUBLICITÉ EN LIGNE",
    "cta.btn": "Prendre contact",

    /* ---------- page titles & meta ---------- */
    "title.home": "Passerelle Consulting — Reprenez la main sur votre publicité en ligne",
    "title.services": "Ce que nous faisons — Passerelle Consulting",
    "title.approach": "Comment ça se passe — Passerelle Consulting",
    "title.about": "À propos — Passerelle Consulting",
    "title.contact": "Contact — Passerelle Consulting",
    "desc.home": "Nous mettons en place la machinerie derrière votre publicité en ligne, nous la connectons, nous la rendons conforme — puis nous la confions à vos équipes.",
    "desc.services": "Comment nous intervenons sur votre publicité en ligne, en langage clair — et ce que nous ne faisons pas.",
    "desc.approach": "Quatre étapes, la différence avec une agence, et les questions que l'on nous pose le plus souvent.",
    "desc.about": "À l'intérieur des plateformes publicitaires elles-mêmes — support, solutions et ingénierie chez TripleLift, PubMatic, Martin DSP et Scope3.",
    "desc.contact": "Un premier échange d'une heure, gratuit et sans engagement. Basés à Paris et New York.",

    /* ---------- home ---------- */
    "home.eyebrow": "Publicité en ligne · Paris & New York",
    "home.h1": "Vos équipes savent <em>quoi</em> acheter.<br>Nous construisons <em>comment</em> ça marche.",
    "home.sub": "Nous mettons en place la machinerie derrière votre publicité, nous la connectons, nous la rendons conforme — puis nous la confions à vos équipes.",
    "home.cta1": "Parlons-en",
    "home.cta2": "Ce que nous faisons",

    "fact.c1": "points de la chaîne publicitaire où nous avons travaillé",
    "fact.c2": "de commission sur vos achats, jamais",
    "fact.c3": "du dispositif finit à votre nom",

    "home.plainKicker": "en clair",
    "home.plainH2": "Le problème, sans jargon",
    "home.c1h": "Vous ne voyez pas où va l'argent",
    "home.c1p": "Une longue chaîne d'intermédiaires sépare votre budget de la publicité réellement affichée.",
    "home.c2h": "Les outils ne se parlent pas",
    "home.c2p": "Mal branchées, vos plateformes vous font payer pour toucher les mauvaises personnes.",
    "home.c3h": "La loi a bougé, pas vos réglages",
    "home.c3p": "Le consentement et le RGPD se règlent dans les outils, pas dans une note juridique.",

    "fig1.kicker": "schéma",
    "fig1.h2": "Où nous intervenons",
    "fig1.left": "fig. 1 — notre place dans le dispositif",
    "fig1.right": "vos décisions → la technique → les outils",
    "fig1.alt": "Schéma : votre équipe marketing d'un côté, Passerelle au centre, et de l'autre les outils d'achat média, d'inventaire, de consentement et de données clients",
    "fig1.brand": "VOTRE MARQUE",
    "fig1.brandSub": "équipe marketing",
    "fig1.core1": "mise en place · conformité",
    "fig1.core2": "connexion des outils",
    "fig1.n1": "Achat média",
    "fig1.n2": "Espaces pub",
    "fig1.n3": "Consentement",
    "fig1.n4": "Données clients",
    "fig1.note": "Votre équipe décide quoi dire et à qui. Nous nous occupons de la tuyauterie en dessous.",

    "home.exploreKicker": "pour aller plus loin",
    "home.exploreH2": "Par où commencer",
    "teaser.k1": "nos interventions",
    "teaser.h1": "Ce que nous faisons",
    "teaser.p1": "Comment nous intervenons — et ce que nous ne faisons pas.",
    "teaser.k2": "le déroulé",
    "teaser.h2": "Comment ça se passe",
    "teaser.p2": "Quatre étapes, puis nous vous passons les clés.",
    "teaser.k3": "qui parle",
    "teaser.h3": "À propos",
    "teaser.p3": "À l'intérieur des plateformes, pas à côté.",
    "teaser.k4": "premier échange",
    "teaser.h4": "Contact",
    "teaser.p4": "Une heure, gratuite, sans argumentaire.",
    "teaser.go": "Voir le détail →",
    "cta.h2": "Pas sûr d'avoir besoin de nous ?",
    "cta.p": "Un échange suffit généralement à trancher — et si ce n'est pas notre sujet, nous vous le dirons.",

    /* ---------- services ---------- */
    "svc.h1": "Comment nous intervenons",
    "svc.lede": "Vous n'aurez pas besoin de tout. La plupart des missions commencent par un ou deux volets. Le terme technique figure dessous, au cas où votre prestataire l'emploie.",
    "svc.t1": "01 — mise en place",
    "svc.h3a": "Monter votre dispositif",
    "svc.p1": "Nous choisissons les plateformes adaptées à votre budget, nous les installons et les paramétrons.",
    "svc.j1": "on dit aussi : choix du DSP, architecture du trading desk",
    "svc.t2": "02 — connexion",
    "svc.h3b": "Faire parler vos outils",
    "svc.p2": "Mal branchés, vous payez plus cher pour un résultat moins bon — sans que rien ne le signale.",
    "svc.j2": "on dit aussi : intégration SSP/DSP, header bidding, bidstream",
    "svc.t3": "03 — conformité",
    "svc.h3c": "Rester dans les clous",
    "svc.p3": "Des questions juridiques aux réponses techniques. Nous faisons la partie technique, avec vos juristes.",
    "svc.j3": "on dit aussi : intégration CMP, mise en conformité RGPD, identité sans cookies",
    "svc.t4": "04 — données",
    "svc.h3d": "Exploiter vos données clients",
    "svc.p4": "Utilisables dans vos campagnes — légalement, et sans les livrer à des tiers.",
    "svc.j4": "on dit aussi : activation des données first-party, audit de la couche de données",
    "svc.t5": "05 — formation",
    "svc.h3e": "Former votre équipe",
    "svc.p5": "Pour qu'elle pilote sans nous. C'est ce qui permet à une mission de se terminer.",
    "svc.j5": "on dit aussi : montée en compétences, transfert de compétences",
    "svc.t6": "06 — accompagnement",
    "svc.h3f": "Répondre à vos questions ensuite",
    "svc.p6": "Faut-il acheter cet outil ? Ce chiffre est-il normal ? Nous restons joignables.",
    "svc.j6": "on dit aussi : conseil technique, arbitrages build-vs-buy",
    "svc.notK": "à savoir",
    "svc.notH": "Ce que nous ne faisons pas",
    "svc.notP": "Nous ne gérons pas vos campagnes, ne créons pas vos visuels et n'achetons pas d'espace pour vous. Nous construisons la machinerie ; vos équipes — ou l'agence que vous gardez — s'en servent.",
    "svc.ctaH": "Vous ne savez pas dans quelle case vous êtes ?",
    "svc.ctaP": "C'est le point de départ habituel. Décrivez-le avec vos mots.",

    /* ---------- approach ---------- */
    "app.h1": "Une mission qui a une fin",
    "app.lede": "Quatre étapes. La dernière consiste à vous passer les clés.",
    "app.stepsKicker": "le déroulé",
    "app.stepsH2": "Quatre étapes",
    "app.stepsLede": "Quelques semaines pour un diagnostic seul ; quelques mois pour une mise en place complète avec formation.",
    "app.s1h": "On fait le point",
    "app.s1p": "Une heure gratuite. Rien à préparer, aucun vocabulaire requis.",
    "app.s2h": "On établit un diagnostic",
    "app.s2p": "Ce qui marche, ce qui ne marche pas, ce que ça coûte, dans quel ordre s'y prendre.",
    "app.s3h": "On construit",
    "app.s3p": "Mise en place, branchements, conformité — avec un suivi que vous pouvez relayer en interne.",
    "app.s4h": "On vous passe les clés",
    "app.s4p": "Formation et documentation. Le dispositif est à vous et tourne sans nous.",
    "app.cmpKicker": "la différence",
    "app.cmpH2": "Pourquoi pas simplement une agence ?",
    "app.cmpLede": "Les agences font bien leur métier. Ce n'est simplement pas celui-ci.",
    "app.k1": "Une agence",
    "app.a1": "Planifie, achète et rend compte de votre média",
    "app.a2": "Garde la couche technique chez elle",
    "app.a3": "Vous repartez de zéro si vous partez",
    "app.a4": "Rémunérée tant que ça continue",
    "app.b1": "Installe la compétence dans votre équipe",
    "app.b2": "Outils et accès à votre nom",
    "app.b3": "Vos équipes formées pour piloter",
    "app.b4": "Aucune commission sur vos achats",
    "faq.kicker": "questions fréquentes",
    "faq.h2": "Ce qu'on nous demande le plus",
    "faq.q1": "Faut-il licencier notre agence ?",
    "faq.a1": "Non, et c'est rarement une bonne idée. La plupart de nos clients gardent leur agence pour la création et le quotidien, et n'internalisent que la partie technique.",
    "faq.q2": "Sommes-nous trop petits ?",
    "faq.a2": "C'est une question de budget publicitaire, pas de taille. En dessous d'un certain montant, cela coûte plus que ça ne rapporte — et nous vous le dirons plutôt que de vous vendre une mission.",
    "faq.q3": "Personne n'est technique chez nous. Gênant ?",
    "faq.a3": "Non — c'est la situation habituelle, et la raison pour laquelle la formation fait partie du travail. Traduire est notre métier, pas à vous de deviner.",
    "faq.q4": "Combien cela coûte-t-il ?",
    "faq.a4": "Un forfait par étape, connu à l'avance — jamais un pourcentage de vos achats. Nous chiffrons après le diagnostic. Le premier échange est gratuit.",
    "app.ctaH": "La première étape est un simple échange",
    "app.ctaP": "Une heure, gratuite, sans engagement.",

    /* ---------- about ---------- */
    "ab.h1": "Nous avons travaillé dans ces plateformes avant de conseiller dessus",
    "ab.lede": "Des postes chez les entreprises qui les fabriquent — en support, en solutions et en ingénierie.",
    "ab.pedKicker": "parcours",
    "ab.pedH2": "Du temps passé dans la salle des machines",
    "ab.figL": "fig. 2 — où se situe cette expérience",
    "ab.figR": "la chaîne que parcourt votre budget",
    "ab.figAlt": "Schéma de la chaîne publicitaire, du côté vente au côté achat, avec TripleLift côté éditeurs, PubMatic sur la place de marché, Martin DSP côté annonceurs, et Scope3 comme couche IA au-dessus",
    "ab.figSell": "CÔTÉ VENTE",
    "ab.figBuy": "CÔTÉ ACHAT",
    "ab.figAi": "la couche IA au-dessus",
    "ab.figR1": "côté éditeurs",
    "ab.figR2": "place de marché",
    "ab.figR3": "côté annonceurs",
    "ab.figNote": "La plupart des consultants n'ont jamais vu qu'un seul bout de cette chaîne. Nous avons travaillé en trois points.",
    "ab.whyKicker": "concrètement",
    "ab.whyH2": "Ce que ça change pour vous",
    "ab.w1h": "Nous savons quand on vous raconte des histoires",
    "ab.w1p": "« Impossible », « trop complexe », « trop cher » — nous avons travaillé sur ce genre de système.",
    "ab.w2h": "Nous ne vendons aucun outil",
    "ab.w2p": "Aucune commission des plateformes, aucun pourcentage sur vos achats. Aucune arrière-pensée.",
    "ab.w3h": "Nous parlons votre langue",
    "ab.w3p": "Vous devez pouvoir répéter en réunion, avec vos mots, ce que nous vous avons dit.",
    "ab.nameK": "le nom",
    "ab.nameH": "Pourquoi « Passerelle »",
    "ab.nameP": "Une passerelle relie deux rives et se traverse dans les deux sens. Notre travail : vous faire traverser, puis vous laisser circuler seul.",
    "ab.ctaH": "Envie d'en discuter de vive voix ?",
    "ab.ctaP": "Paris et New York. Des clients en France, en Europe et aux États-Unis.",

    /* ---------- contact ---------- */
    "con.h1": "Écrivez-nous, même sans question précise",
    "con.lede": "« On ne voit pas où passe notre budget. » « Notre agence part. » C'est un point de départ suffisant.",
    "con.p1": "Lu personnellement, pas par un service commercial. Réponse généralement sous un jour ouvré.",
    "con.p2": "Paris et New York. En français ou en anglais.",
    "con.expectK": "à quoi vous attendre",
    "con.e1": "Une heure, gratuite, sans engagement.",
    "con.e2": "Pas d'argumentaire — des questions, et des réponses aux vôtres.",
    "con.e3": "Une réponse franche, y compris « pas encore » ou « pas nous ».",
    "con.e4": "Si nous continuons : un diagnostic chiffré avant tout engagement.",
    "con.prepK": "avant l'échange",
    "con.prepH": "Rien à préparer",
    "con.prepP": "Un budget publicitaire annuel approximatif et vos prestataires actuels font gagner du temps — sinon, nous les trouverons ensemble."
  };

  /* English copy is captured from the markup on load. */
  var nodes = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-label], [data-i18n-content]');
  var titleKey = document.body.dataset.titleKey;
  var en = {};

  nodes.forEach(function(el){
    if (el.dataset.i18n) en[el.dataset.i18n] = el.textContent;
    if (el.dataset.i18nHtml) en[el.dataset.i18nHtml] = el.innerHTML;
    if (el.dataset.i18nLabel) en[el.dataset.i18nLabel] = el.getAttribute('aria-label');
    if (el.dataset.i18nContent) en[el.dataset.i18nContent] = el.getAttribute('content');
  });
  if (titleKey) en[titleKey] = document.title;

  var dicts = { en: en, fr: fr };
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
