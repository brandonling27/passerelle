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
    "desc.home": "Conseil indépendant pour les marques qui veulent gérer elles-mêmes leur publicité en ligne. Nous construisons et connectons les outils, puis nous formons vos équipes.",
    "desc.services": "Six façons d'intervenir sur votre publicité en ligne, expliquées simplement — et ce que nous ne faisons pas.",
    "desc.approach": "Le déroulé d'une mission en quatre étapes, la différence avec une agence, et les questions que l'on nous pose le plus souvent.",
    "desc.about": "Quinze ans passés à construire les plateformes publicitaires elles-mêmes, chez TripleLift, Martin DSP, PubMatic et Scope3.",
    "desc.contact": "Un premier échange d'une heure, gratuit et sans engagement. Basés à Paris et New York.",

    /* ---------- home ---------- */
    "home.eyebrow": "Publicité en ligne · Paris & New York",
    "home.h1": "Vos équipes savent <em>quoi</em> acheter.<br>Nous construisons <em>comment</em> ça marche.",
    "home.sub": "La publicité en ligne repose sur une machinerie technique que presque personne ne vous explique. Nous la mettons en place, nous la connectons, nous la rendons conforme à la loi — puis nous formons vos équipes pour qu'elles s'en servent sans nous.",
    "home.cta1": "Parlons-en",
    "home.cta2": "Ce que nous faisons",
    "home.plainKicker": "en clair",
    "home.plainH2": "Le problème, sans jargon",
    "home.plainLede": "Beaucoup de marques veulent arrêter de tout déléguer à une agence. L'obstacle n'est presque jamais la stratégie — c'est la plomberie technique en dessous.",
    "home.c1h": "Vous payez sans voir où va l'argent",
    "home.c1p": "Entre votre budget et la publicité réellement affichée, il y a une longue chaîne d'intermédiaires. Quand vous ne contrôlez pas les outils, vous ne pouvez pas vérifier ce qui se passe au milieu.",
    "home.c2h": "Les outils ne se parlent pas",
    "home.c2p": "Vos plateformes publicitaires, votre site et vos données clients doivent être branchés correctement. Mal connectés, vous payez pour toucher des gens qui ne vous intéressent pas.",
    "home.c3h": "La loi a changé, pas vos réglages",
    "home.c3p": "Consentement, RGPD, fin des cookies publicitaires : beaucoup de dispositifs tournent encore sur des réglages qui ne sont plus conformes — et cela se règle dans les outils, pas dans une note juridique.",
    "fig1.kicker": "schéma",
    "fig1.h2": "Où nous intervenons",
    "fig1.lede": "Nous ne remplaçons pas votre équipe marketing et nous ne choisissons pas vos messages. Nous nous occupons de la couche technique entre vos décisions et les outils qui les exécutent.",
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
    "fig1.note": "En clair : votre équipe décide quoi dire et à qui. Nous nous occupons de la tuyauterie qui relie vos outils entre eux, et nous vous apprenons à la faire fonctionner.",
    "home.exploreKicker": "pour aller plus loin",
    "home.exploreH2": "Par où commencer",
    "teaser.k1": "nos interventions",
    "teaser.h1": "Ce que nous faisons",
    "teaser.p1": "Six façons d'intervenir, expliquées simplement — et la liste, tout aussi importante, de ce que nous ne faisons pas.",
    "teaser.k2": "le déroulé",
    "teaser.h2": "Comment ça se passe",
    "teaser.p2": "Les quatre étapes d'une mission, ce qu'elle coûte en temps, et pourquoi elle se termine au lieu de s'éterniser.",
    "teaser.k3": "qui parle",
    "teaser.h3": "À propos",
    "teaser.p3": "Quinze ans passés à construire les plateformes elles-mêmes, plutôt qu'à les utiliser de loin.",
    "teaser.k4": "premier échange",
    "teaser.h4": "Contact",
    "teaser.p4": "Un premier échange sans engagement, même si vous ne savez pas encore formuler le problème.",
    "teaser.go": "Voir le détail →",
    "cta.h2": "Pas sûr d'avoir besoin de nous ?",
    "cta.p": "C'est souvent le bon moment pour en parler. Un premier échange suffit généralement à dire si le sujet nous concerne — et si ce n'est pas le cas, nous vous le dirons.",

    /* ---------- services ---------- */
    "svc.h1": "Six façons d'intervenir",
    "svc.lede": "Vous n'avez pas besoin des six. La plupart des missions commencent par une ou deux, et les autres viennent seulement si elles sont utiles. Chaque intervention est décrite en langage courant ; le terme technique correspondant est indiqué dessous, au cas où votre prestataire l'emploie.",
    "svc.t1": "01 — mise en place",
    "svc.h3a": "Monter votre dispositif",
    "svc.p1": "Vous voulez acheter votre publicité vous-même plutôt que de tout confier à une agence. Nous choisissons les plateformes adaptées à votre taille et à votre budget, nous les installons et nous les paramétrons.",
    "svc.j1": "on dit aussi : choix du DSP, architecture du trading desk",
    "svc.t2": "02 — connexion",
    "svc.h3b": "Faire parler vos outils entre eux",
    "svc.p2": "Vos plateformes doivent échanger des informations correctes, dans le bon ordre. Quand ces branchements sont mal faits, vous payez plus cher pour un résultat moins bon — sans que rien ne signale l'erreur.",
    "svc.j2": "on dit aussi : intégration SSP/DSP, header bidding, bidstream",
    "svc.t3": "03 — conformité",
    "svc.h3c": "Rester dans les clous",
    "svc.p3": "Bandeau de consentement, RGPD, contrôles de la CNIL, disparition des cookies publicitaires. Ce sont des sujets juridiques qui se règlent techniquement : nous faisons la partie technique, en lien avec vos juristes.",
    "svc.j3": "on dit aussi : intégration CMP, mise en conformité RGPD, identité sans cookies",
    "svc.t4": "04 — données",
    "svc.h3d": "Utiliser vos propres données clients",
    "svc.p4": "Vous savez déjà beaucoup de choses sur vos clients. Nous rendons ces informations utilisables dans vos campagnes — légalement, et sans les livrer à des tiers qui n'ont pas à les recevoir.",
    "svc.j4": "on dit aussi : activation des données first-party, audit de la couche de données",
    "svc.t5": "05 — formation",
    "svc.h3e": "Former votre équipe",
    "svc.p5": "Une formation structurée, adaptée au niveau réel de vos équipes, pour qu'elles pilotent le dispositif seules après notre départ. C'est la partie qui fait qu'une mission se termine vraiment.",
    "svc.j5": "on dit aussi : montée en compétences, transfert de compétences",
    "svc.t6": "06 — accompagnement",
    "svc.h3f": "Répondre à vos questions ensuite",
    "svc.p6": "Une fois le dispositif en place, vous aurez des questions ponctuelles : faut-il acheter cet outil ? cette offre est-elle sérieuse ? ce chiffre est-il normal ? Nous restons joignables pour y répondre.",
    "svc.j6": "on dit aussi : conseil technique, arbitrages build-vs-buy",
    "svc.notK": "à savoir",
    "svc.notH": "Ce que nous ne faisons pas",
    "svc.notP": "Nous ne gérons pas vos campagnes au quotidien, nous ne créons pas vos visuels et nous n'achetons pas d'espace publicitaire à votre place. Nous construisons la machinerie et nous vous apprenons à vous en servir ; ce sont vos équipes — ou l'agence que vous gardez — qui l'utilisent ensuite. Si votre besoin relève du quotidien plutôt que de la mise en place, nous vous le dirons dès le premier échange.",
    "svc.ctaH": "Vous ne savez pas dans quelle case vous êtes ?",
    "svc.ctaP": "C'est le cas le plus fréquent. Décrivez la situation avec vos mots — identifier le bon point de départ fait partie du travail.",

    /* ---------- approach ---------- */
    "app.h1": "Une mission qui a une fin",
    "app.lede": "Le but n'est pas que vous ayez besoin de nous longtemps. Une mission se déroule en quatre étapes, et la dernière consiste à vous passer les clés.",
    "app.stepsKicker": "le déroulé",
    "app.stepsH2": "Quatre étapes",
    "app.stepsLede": "Durée typique : de quelques semaines pour un diagnostic seul, à quelques mois pour une mise en place complète avec formation.",
    "app.s1h": "On fait le point",
    "app.s1p": "Un échange d'une heure, gratuit et sans engagement, pour comprendre où vous en êtes. Vous n'avez pas besoin de préparer quoi que ce soit ni de connaître le vocabulaire.",
    "app.s2h": "On établit un diagnostic",
    "app.s2p": "Nous examinons ce qui existe déjà et nous vous remettons un état des lieux lisible : ce qui fonctionne, ce qui ne fonctionne pas, ce que cela coûte, et dans quel ordre s'y prendre.",
    "app.s3h": "On construit",
    "app.s3p": "Mise en place, branchements, conformité. Vous voyez l'avancement à chaque étape, dans un langage que vous pouvez relayer en interne sans traduction.",
    "app.s4h": "On vous passe les clés",
    "app.s4p": "Formation de vos équipes et documentation écrite. À la fin, le dispositif vous appartient et fonctionne sans nous. C'est le point d'arrivée prévu dès le départ.",
    "app.cmpKicker": "la différence",
    "app.cmpH2": "Pourquoi pas simplement une agence ?",
    "app.cmpLede": "Les agences font très bien leur métier. Ce n'est simplement pas le même métier — et sur un point précis, leurs intérêts et les vôtres ne coïncident pas.",
    "app.k1": "Une agence",
    "app.h3a": "Fait tourner vos campagnes",
    "app.p1": "Elle planifie, achète et vous rend compte. C'est utile, et beaucoup de marques ont raison d'en garder une. Mais la partie technique reste chez elle : si vous partez, vous repartez de zéro. Son intérêt est que cela continue, pas que vous deveniez autonome.",
    "app.h3b": "Vous rend autonome, puis s'en va",
    "app.p2": "Nous sommes payés pour installer une capacité chez vous : les outils sont à votre nom, les accès sont les vôtres, vos équipes sont formées. Nous ne prenons pas de commission sur vos achats publicitaires, donc nous n'avons aucun intérêt à ce que vous dépensiez plus.",
    "faq.kicker": "questions fréquentes",
    "faq.h2": "Ce qu'on nous demande le plus souvent",
    "faq.q1": "Faut-il licencier notre agence pour travailler avec vous ?",
    "faq.a1": "Non, et c'est rarement une bonne idée. Beaucoup de nos clients gardent leur agence pour la création et le pilotage quotidien, et internalisent seulement la partie technique et les données. Les deux fonctionnent très bien ensemble une fois que les rôles sont clairs.",
    "faq.q2": "Sommes-nous trop petits pour ce type de mission ?",
    "faq.a2": "Ce n'est pas une question de taille mais de budget publicitaire. En dessous d'un certain montant annuel, internaliser coûte plus cher que cela ne rapporte — et nous vous le dirons franchement plutôt que de vous vendre une mission. Un premier échange suffit généralement à trancher.",
    "faq.q3": "Personne chez nous n'est technique. C'est bloquant ?",
    "faq.a3": "Non. C'est même la situation la plus courante, et c'est précisément pour cela que la formation fait partie de la mission. Nous n'attendons de vous aucun vocabulaire technique : c'est notre travail de traduire, pas le vôtre de deviner.",
    "faq.q4": "Combien cela coûte-t-il ?",
    "faq.a4": "Cela dépend de l'étendue de la mission, et nous préférons l'annoncer après le diagnostic plutôt qu'avant. La facturation se fait au forfait, par étape, avec un montant connu à l'avance — pas au pourcentage de vos dépenses publicitaires. Le premier échange est gratuit.",
    "app.ctaH": "La première étape est un simple échange",
    "app.ctaP": "Une heure, gratuite, sans engagement. Si le sujet ne nous concerne pas, nous vous le dirons — et nous vous orienterons quand nous le pouvons.",

    /* ---------- about ---------- */
    "ab.h1": "Nous avons construit ces plateformes avant de conseiller dessus",
    "ab.lede": "La plupart des consultants en publicité en ligne ont appris le métier côté agence, en utilisant les outils. Nous l'avons appris de l'autre côté : en construisant les outils eux-mêmes, chez les entreprises qui les fabriquent.",
    "ab.pedKicker": "parcours",
    "ab.pedH2": "Quinze ans dans la salle des machines",
    "ab.pedLede": "Des postes d'ingénierie chez ceux qui vendent l'espace publicitaire, chez ceux qui l'achètent, et sur la nouvelle génération d'outils pilotés par l'IA.",
    "ab.r1": "côté sites & médias",
    "ab.d1": "Les systèmes qui permettent aux sites et aux médias de vendre leurs espaces publicitaires.",
    "ab.r2": "côté annonceurs",
    "ab.d2": "Les systèmes qui achètent la publicité pour le compte des marques, en une fraction de seconde.",
    "ab.r3": "place de marché",
    "ab.d3": "L'une des grandes places de marché mondiales où se rencontrent acheteurs et vendeurs d'espaces.",
    "ab.r4": "nouvelle génération",
    "ab.d4": "L'infrastructure de la publicité pilotée par l'intelligence artificielle.",
    "ab.whyKicker": "concrètement",
    "ab.whyH2": "Ce que ça change pour vous",
    "ab.w1h": "Nous savons quand on vous raconte des histoires",
    "ab.w1p": "Quand un prestataire explique qu'une chose est impossible, trop complexe ou trop coûteuse, nous savons généralement si c'est vrai — parce que nous avons écrit ce genre de système.",
    "ab.w2h": "Nous ne vendons aucun outil",
    "ab.w2p": "Nous ne touchons pas de commission des plateformes et nous ne prenons pas de pourcentage sur vos dépenses publicitaires. La recommandation que vous recevez n'a pas d'arrière-pensée commerciale.",
    "ab.w3h": "Nous parlons votre langue",
    "ab.w3p": "Savoir comment marche la machine, c'est aussi savoir l'expliquer sans jargon. Vous devez pouvoir répéter en réunion, avec vos mots, ce que nous venons de vous dire.",
    "ab.nameK": "le nom",
    "ab.nameH": "Pourquoi « Passerelle »",
    "ab.nameP": "Une passerelle relie deux rives et se traverse dans les deux sens. D'un côté, des équipes marketing qui savent ce qu'elles veulent obtenir ; de l'autre, une machinerie technique qui parle un dialecte incompréhensible. Notre travail consiste à faire passer les gens d'une rive à l'autre — puis à les laisser circuler seuls.",
    "ab.ctaH": "Envie d'en discuter de vive voix ?",
    "ab.ctaP": "Basés à Paris et à New York, nous travaillons avec des marques en France, en Europe et aux États-Unis.",

    /* ---------- contact ---------- */
    "con.h1": "Écrivez-nous, même sans question précise",
    "con.lede": "Vous n'avez pas besoin d'un cahier des charges ni du bon vocabulaire. Décrivez la situation avec vos mots : « on ne comprend pas où passe notre budget », « notre agence part », « on nous parle de RGPD et on ne sait pas quoi en faire ». C'est un très bon point de départ.",
    "con.p1": "Chaque message est lu personnellement, et non par un service commercial. Réponse généralement sous 24 heures ouvrées.",
    "con.p2": "Basés à Paris et New York. Nous accompagnons des marques en France, dans l'Union européenne et aux États-Unis — à distance, sur site selon les besoins. Échanges en français ou en anglais.",
    "con.expectK": "à quoi vous attendre",
    "con.e1": "Un premier échange d'une heure, gratuit et sans engagement.",
    "con.e2": "Aucune présentation commerciale : des questions sur votre situation, et des réponses aux vôtres.",
    "con.e3": "Une réponse franche sur l'intérêt d'une mission — y compris quand la réponse est « pas encore » ou « pas nous ».",
    "con.e4": "Si nous continuons : un diagnostic chiffré avant tout engagement de votre part.",
    "con.prepK": "avant l'échange",
    "con.prepH": "Rien à préparer",
    "con.prepP": "Si vous les avez sous la main, le montant approximatif de votre budget publicitaire annuel et le nom de vos prestataires actuels font gagner du temps. Si vous ne les avez pas, ce n'est pas grave — nous les trouverons ensemble."
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
