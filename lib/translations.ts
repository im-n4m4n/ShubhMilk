/**
 * ============================================================================
 *  SHUBH MILK — HINDI / ENGLISH COPY  (lib/translations.ts)
 * ============================================================================
 *  Every user-facing sentence on the site lives here, in both languages.
 *  Hindi is the DEFAULT (see defaultLang below) because most of your customers
 *  are local; English is the second language.
 *
 *  HOW TO EDIT (only 3 rules):
 *    1. write inside the quotes " " of the language block you want
 *       (`hi` = Hindi, `en` = English). Keep the key name English/DON'T rename it.
 *    2. Keep both languages in the same shape — if you add a key to `hi`, add it
 *       to `en` too, otherwise the build complains (that is intentional: no
 *       half-translated site).
 *    3. Any placeholder left in the copy is filled from lib/businessConfig.ts
 *       where a component supports it; the ones spelled out here you replace by
 *       hand (they are written in CAPITALS inside square brackets).
 *
 *  Numbers, phone, rates, links and names do NOT belong here — those go in
 *  lib/businessConfig.ts.
 * ============================================================================
 */

import { bottleDeposit, brand, compliance, contact, delivery, offers, payments, rates } from "./businessConfig";

export type Lang = "hi" | "en";

/** Hindi first, by design. Change to "en" if you ever want English default. */
export const defaultLang: Lang = "hi";

export const languages: { key: Lang; label: string }[] = [
  { key: "hi", label: "हिंदी" },
  { key: "en", label: "English" },
];

/** Cookie/localStorage key the language toggle writes to. */
export const langStorageKey = "shubh-milk-lang";

// ─────────────────────────────────────────────────────────────────────────────
//  HINDI (default)
// ─────────────────────────────────────────────────────────────────────────────

const hi = {
  meta: {
    homeTitle: "शुभ मिल्क — काशी का ताज़ा दूध, रोज़ सुबह 7 बजे तक घर पर",
    homeDescription:
      "वाराणसी में गाय, भैंस और A2 देसी गाय का ताज़ा दूध, दही, पनीर और घी की घर तक डिलीवरी। काँच की बोतल, कोई मिलावट नहीं। WhatsApp पर ऑर्डर करें।",
    homeKeywords:
      "वाराणसी दूध डिलीवरी, ताज़ा दूध वाराणसी, A2 गाय का दूध, दही पनीर घी होम डिलीवरी, काशी दूध",
    orderTitle: "ऑर्डर करें — शुभ मिल्क, वाराणसी",
    orderDescription:
      "फॉर्म भरें और WhatsApp पर ऑर्डर भेजें। गाय/भैंस/A2 दूध, दही, पनीर, घी — वाराणसी में घर तक डिलीवरी।",
    subscribeTitle: "महीने का दूध प्लान — शुभ मिल्क",
    subscribeDescription:
      "वीकली, मंथली, फ़ैमिली पैक और होस्टल/कैफ़े प्लान। पहले 2 दिन फ्री ट्रायल। डिलीवरी कभी भी पॉज़ करें।",
    contactTitle: "संपर्क और डिलीवरी क्षेत्र — शुभ मिल्क",
    contactDescription: "वाराणसी में डिलीवरी क्षेत्र, समय, फोन और WhatsApp नंबर।",
    areaTitleTemplate: "{area} में दूध की डिलीवरी — शुभ मिल्क, वाराणसी",
    areaDescriptionTemplate:
      "{area} (पिन कोड {pincode}) में ताज़ा गाय, भैंस और A2 दूध की रोज़ सुबह घर तक डिलीवरी। WhatsApp पर ऑर्डर करें।",
    a2Title: "A2 देसी गाय का दूध वाराणसी में — शुभ मिल्क",
    a2Description:
      "वाराणसी में A2 देसी गाय का दूध, एक ही फार्म से, काँच की बोतल में। रोज़ सुबह डिलीवरी।",
    paneerTitle: "पनीर की होम डिलीवरी — शुभ मिल्क, वाराणसी",
    paneerDescription: "रोज़ सुबह ताज़ा बना मलाई पनीर, वाराणसी में घर तक डिलीवरी।",
    qualityTitle: "क्वालिटी और भरोसा — शुभ मिल्क, वाराणसी",
    qualityDescription:
      "रोज़ की लैब जाँच, FSSAI लाइसेंस, काँच की बोतल और कोई मिलावट नहीं — शुभ मिल्क की क्वालिटी रिपोर्ट देखें।",
    recipesTitle: "घरेलू रेसिपी और त्योहार स्पेशल — शुभ मिल्क",
    recipesDescription:
      "लस्सी, पनीर, खीर, दही और ठंडाई की आसान घरेलू रेसिपी — और त्योहारों के लिए ख़ास।",
    galleryTitle: "गैलरी — शुभ मिल्क, वाराणसी",
    galleryDescription: "हमारा फार्म, गाय-भैंस, डेयरी और डिलीवरी की तस्वीरें।",
    bulkTitle: "थोक ऑर्डर (B2B) — होटल, मिठाई की दुकान, चाय की टपरी — शुभ मिल्क",
    bulkDescription:
      "होटल, मिठाई की दुकान, चाय की टपरी, मंदिर और रेस्टोरेंट के लिए रोज़ाना दूध की सप्लाई। WhatsApp पर रेट पूछें।",
    visitTitle: "फार्म विज़िट बुक करें — शुभ मिल्क, वाराणसी",
    visitDescription:
      "परिवार के साथ फार्म आएँ — गाय-भैंस देखें, दूध निकालें, बच्चों के लिए एजुकेशनल ट्रिप। WhatsApp पर बुक करें।",
    privacyTitle: "प्राइवेसी पॉलिसी — शुभ मिल्क",
    privacyDescription: "शुभ मिल्क आपकी जानकारी कैसे इस्तेमाल करता है।",
    deliveryPolicyTitle: "डिलीवरी पॉलिसी — शुभ मिल्क",
    deliveryPolicyDescription: "डिलीवरी समय, इलाके और नियम।",
    refundPolicyTitle: "रिफंड और कैंसल पॉलिसी — शुभ मिल्क",
    refundPolicyDescription: "ऑर्डर रद्द, पॉज़ और पैसे वापसी के नियम।",
  },

  nav: {
    shop: "दूध और प्रोडक्ट",
    subscribe: "महीने का प्लान",
    areas: "डिलीवरी क्षेत्र",
    order: "ऑर्डर करें",
    contact: "संपर्क",
    quality: "क्वालिटी",
    recipes: "रेसिपी",
    languageToggle: "भाषा बदलें",
  },

  hero: {
    overline: "काशी का दूधवाला · सीधे डेयरी से आपके घर",
    headline: "शुभ मिल्क — काशी का ताज़ा दूध, रोज़ सुबह 7 बजे तक।",
    subheadline:
      "ताज़ा गाय, भैंस और A2 दूध | दही, पनीर, घी | वाराणसी में घर तक डिलीवरी।",
    ctaWhatsApp: "WhatsApp पर ऑर्डर करें",
    ctaCall: "अभी कॉल करें",
    ctaTrial: "फ्री ट्रायल बुक करें",
    note: "पहले 2 दिन फ्री ट्रायल · डिलीवरी सुबह " + delivery.time,
  },

  trustBar: {
    fssai: "FSSAI लाइसेंस: [FSSAI]",
    noAdulteration: "कोई मिलावट नहीं",
    hygienicPacking: "साफ़-सुथरी पैकिंग",
    before7: "रोज़ सुबह 7 बजे से पहले डिलीवरी",
    glassBottle: "काँच की बोतल — वापस करने योग्य",
    labelledNumber: "FSSAI लाइसेंस नंबर: " + compliance.fssai,
  },

  delivery: {
    title: "डिलीवरी क्षेत्र और समय",
    subtitle: "रोज़ सुबह, आपके घर के दरवाज़े पर।",
    timeLabel: "डिलीवरी समय",
    timeValue: delivery.time,
    minOrderLabel: "कम से कम ऑर्डर",
    minOrderValue: delivery.minOrder,
    cutoffLabel: "अगली सुबह के लिए ऑर्डर का आख़िरी समय",
    cutoffValue: delivery.orderCutoff,
    areasLabel: "हम यहाँ डिलीवरी करते हैं",
    notListed: "आपका इलाका लिस्ट में नहीं है? WhatsApp पर बताइए, हम देख लेंगे।",
    checkCta: "अपना पिन कोड WhatsApp पर भेजें",
  },

  products: {
    title: "हमारा दूध और प्रोडक्ट",
    subtitle: "रोज़ सुबह ताज़ा, सीधे डेयरी से।",
    cowMilk: "गाय का दूध",
    buffaloMilk: "भैंस का दूध",
    a2Milk: "A2 देसी गाय का दूध",
    dahi: "दही",
    paneer: "पनीर",
    ghee: "देसी घी",
    butter: "मक्खन",
    khoya: "खोया",
    chaach: "छाछ",
    lassi: "लस्सी",
    addToOrder: "ऑर्डर में जोड़ें",
  },

  pricing: {
    title: "रेट लिस्ट",
    subtitle: "साफ़ रेट, कोई छिपा चार्ज नहीं।",
    perLitre: "प्रति लीटर",
    perKg: "प्रति किलो",
    cow: "गाय का दूध",
    buffalo: "भैंस का दूध",
    a2: "A2 देसी गाय का दूध",
    dahi: "दही",
    paneer: "पनीर",
    ghee: "देसी घी",
    rateCow: rates.cow,
    rateBuffalo: rates.buffalo,
    rateA2: rates.a2,
    rateDahi: rates.dahi,
    ratePaneer: rates.paneer,
    rateGhee: rates.ghee,
    note: "रेट बदलने पर WhatsApp पर पहले सूचना दी जाएगी।",
  },

  plans: {
    title: "महीने का दूध प्लान",
    subtitle: "हर महीने की टेंशन खत्म — दूध रोज़ आता रहेगा।",
    trialName: "फ्री ट्रायल",
    trialDesc: "2 दिन फ्री, कोई शर्त नहीं। पसंद आए तो प्लान शुरू करें।",
    weeklyName: "वीकली प्लान",
    weeklyDesc: "एक हफ़्ते के लिए दूध — पहले आज़माने के लिए।",
    monthlyName: "मंथली प्लान",
    monthlyDesc: "महीने भर का दूध, सबसे सही रेट।",
    familyName: "फ़ैमिली पैक",
    familyDesc: "रोज़ 2–3 लीटर — बड़े परिवार के लिए।",
    b2bName: "होस्टल / PG / कैफ़े / होटल",
    b2bDesc: "बड़ी मात्रा में रोज़ सप्लाई, रेट पर बात करें।",
    price: "रेट: [PLAN_PRICE]",
    trialPrice: "रेट: [PLAN_PRICE_TRIAL]",
    weeklyPrice: "रेट: [PLAN_PRICE_WEEKLY]",
    monthlyPrice: "रेट: [PLAN_PRICE]",
    familyPrice: "रेट: [PLAN_PRICE_FAMILY]",
    b2bPrice: "रेट: [PLAN_PRICE_B2B]",
    ctaStart: "यह प्लान शुरू करें",
    ctaTrial: "फ्री ट्रायल बुक करें",
  },

  subscription: {
    title: "महीने का दूध — कैसे काम करता है",
    subtitle: "डिलीवरी शुरू करें, रोकें, बढ़ाएँ — सब WhatsApp पर, एक मैसेज में।",
    pauseTitle: "डिलीवरी पॉज़ करें",
    pauseDesc:
      "बाहर गए हैं या घर पर कोई नहीं है? WhatsApp पर बता दें, डिलीवरी उतने दिन बंद रहेगी।",
    pauseCta: "पॉज़ करने का मैसेज भेजें",
    extraTitle: "मेहमान या त्योहार के लिए ज़्यादा दूध",
    extraDesc: "शादी, पूजा, त्योहार — जिस दिन ज़्यादा दूध चाहिए, एक दिन पहले बता दें।",
    extraCta: "ज़्यादा दूध माँगें",
    billTitle: "महीने का बिल और UPI रिमाइंडर",
    billDesc:
      "महीने के आख़िर में बिल भेजा जाता है। UPI पर पहले से पेमेंट कर सकते हैं, या डिलीवरी पर नकद दे सकते हैं।",
    billCta: "बिल पूछें",
    autopayTitle: "मंथली बिल का रिमाइंडर",
    autopayDesc: "हर महीने की 1 तारीख़ को WhatsApp पर बिल और UPI QR भेज दिया जाएगा।",
    howTitle: "शुरू कैसे करें",
    howStep1: "WhatsApp पर अपना इलाका और कितना दूध चाहिए बताएँ।",
    howStep2: "पहले 2 दिन फ्री — पसंद आने पर प्लान चालू।",
    howStep3: "रोज़ सुबह दूध दरवाज़े पर, बिल महीने के आख़िर में।",
  },

  order: {
    title: "ऑर्डर करें",
    subtitle: "फॉर्म भरें — WhatsApp खुद खुल जाएगा, आप सिर्फ़ Send दबाएँ।",
    name: "आपका नाम",
    mobile: "मोबाइल नंबर",
    area: "डिलीवरी इलाका",
    address: "पूरा पता (मकान नंबर, लैंडमार्क)",
    milkType: "कौन सा दूध चाहिए",
    quantity: "कितना (लीटर)",
    frequency: "कितने दिन",
    startDate: "कब से शुरू करें",
    paymentPref: "पेमेंट कैसे करेंगे",
    paymentUpi: "UPI (ऐडवांस)",
    paymentCash: "डिलीवरी पर नकद",
    paymentMonthly: "महीने के आख़िर में",
    freqDaily: "रोज़",
    freqAlternate: "एक दिन छोड़कर",
    notes: "कोई ख़ास बात? (जैसे: दूध गाढ़ा चाहिए, गेट पर छोड़ दें)",
    submit: "WhatsApp पर ऑर्डर भेजें",
    success: "धन्यवाद! हम WhatsApp पर कन्फ़र्म करेंगे।",
    whatsappOpening: "WhatsApp खुल रहा है… अगर न खुले तो नीचे वाले बटन से भेजें।",
    upiTitle: "ऐडवांस पेमेंट (UPI)",
    upiDesc: "UPI ID: " + payments.upiId + " · नाम: " + payments.payeeName,
    upiScanText: "QR स्कैन करके UPI से पेमेंट करें (GPay / PhonePe / Paytm)।",
    orCall: "या कॉल करें: " + contact.phoneDisplay,
  },

  payments: {
    title: "पेमेंट और ऑफ़र",
    subtitle: "जैसे आपको आसान लगे — UPI, नकद, या महीने का बिल।",
    upi: "UPI (GPay, PhonePe, Paytm)",
    cash: "डिलीवरी पर नकद",
    monthly: "महीने का बिल",
    referralTitle: "दोस्त को बताएँ, 1 लीटर फ्री",
    referralDesc: offers.referral + " जब आपका दोस्त प्लान शुरू करे, आपको 1 लीटर दूध फ्री।",
    loyaltyTitle: "10वीं डिलीवरी पर 1 लीटर फ्री",
    loyaltyDesc: offers.loyalty + " लगातार डिलीवरी कराने पर हर 10वीं डिलीवरी फ्री।",
    firstOrderTitle: "पहला ऑर्डर ख़ास",
    firstOrderDesc: offers.firstOrder,
  },

  trust: {
    title: "भरोसा ही हमारा काम है",
    subtitle: "जो दिख रहा है, वही है — कोई छिपी बात नहीं।",
    point1Title: "अपनी भैंस, अपनी डेयरी",
    point1Desc: "[FARM_DETAILS] — कहाँ का दूध है, कितनी गाय-भैंस हैं, यहाँ लिखें।",
    point2Title: "FSSAI लाइसेंस",
    point2Desc: "लाइसेंस नंबर " + compliance.fssai + " — हर बोतल पर साफ़ छपा है।",
    point3Title: "काँच की बोतल",
    point3Desc: "काँच की बोतल में दूध — धो कर वापस ले जाते हैं, प्लास्टिक कम।",
    point4Title: "कोई मिलावट नहीं",
    point4Desc: "पानी, पाउडर, केमिकल — कुछ नहीं मिलाया जाता। [TEST_REPORT_NOTE]",
    photoNote: "[PHOTO_NOTE] — डेयरी, गाय-भैंस, बोतल और डिलीवरी की असली फोटो यहाँ लगाएँ।",
  },

  testimonials: {
    title: "हमारे ग्राहक क्या कहते हैं",
    subtitle: "काशी के परिवार, होस्टल और होटल।",
    /* ⚠ These MUST be real customers' own words with their permission.
       Do not publish invented reviews — it is misleading and can cost you
       your Google listing. Fill your own: see TODO.md. */
    t1Quote: "[TESTIMONIAL_1_QUOTE]",
    t1Name: "[TESTIMONIAL_1_NAME]",
    t1Area: "[TESTIMONIAL_1_AREA]",
    t2Quote: "[TESTIMONIAL_2_QUOTE]",
    t2Name: "[TESTIMONIAL_2_NAME]",
    t2Area: "[TESTIMONIAL_2_AREA]",
    t3Quote: "[TESTIMONIAL_3_QUOTE]",
    t3Name: "[TESTIMONIAL_3_NAME]",
    t3Area: "[TESTIMONIAL_3_AREA]",
  },

  faq: {
    title: "अक्सर पूछे जाने वाले सवाल",
    q1: "डिलीवरी कितने बजे होती है?",
    a1: "रोज़ सुबह " + delivery.time + " के बीच। अगर किसी दिन देर हो रही हो, हम WhatsApp पर पहले बता देते हैं।",
    q2: "कम से कम कितना ऑर्डर करना होगा?",
    a2: "कम से कम ऑर्डर: " + delivery.minOrder + "। इससे ज़्यादा कितना भी ले सकते हैं।",
    q3: "महीने का पैसा कैसे देना होगा?",
    a3:
      "तीन तरीक़े हैं — UPI पर ऐडवांस, डिलीवरी पर नकद, या महीने के आख़िर में बिल। महीने की 1 तारीख़ को WhatsApp पर बिल आ जाएगा।",
    q4: "डिलीवरी कैसे पॉज़ करें?",
    a4: "WhatsApp पर एक मैसेज — कब से कब तक बंद रखनी है, बता दें। उतने दिन का पैसा नहीं लगेगा।",
    q5: "बोतल वापस करनी होती है?",
    a5:
      "जी हाँ। काँच की बोतल हम वापस लेते हैं — अगली डिलीवरी के वक़्त खाली बोतल रख दें। बोतल पर एक रिफंडेबल जमा लगता है, जो बोतल वापस करने पर पूरा मिल जाता है।",
    q6: "दूध ताज़ा है या पहले का?",
    a6: "रोज़ सुबह की डिलीवरी उसी सुबह के दूध की होती है — न फ्रीज़ में रखा, न कल का।",
    q7: "बोतल का जमा (डिपॉज़िट) कितना है?",
    a7:
      "बोतल का जमा ₹" + bottleDeposit.amount + " प्रति बोतल है। बोतल वापस करने पर पूरा पैसा आपके खाते में वापस आ जाता है।",
    q8: "क्या मैं दूध की जाँच रिपोर्ट देख सकता/सकती हूँ?",
    a8:
      "हाँ। हर बैच फार्म से निकलने से पहले जाँचा जाता है — MBRT, एंटीबायोटिक और मिलावट के लिए। आज की रिपोर्ट क्वालिटी पेज पर देखें, या WhatsApp पर माँग लें।",
    askMore: "और सवाल है? WhatsApp पर पूछ लीजिए — " + contact.whatsappDisplay,
  },

  sticky: {
    orderOnWhatsApp: "WhatsApp पर ऑर्डर",
    callNow: "कॉल करें",
    bookTrial: "फ्री ट्रायल",
    ariaLabelWhatsApp: "WhatsApp पर ऑर्डर करें (नई विंडो में खुलेगा)",
    ariaLabelCall: "फ़ोन पर कॉल करें",
  },

  footer: {
    tagline: brand.name + " — काशी का ताज़ा दूध, रोज़ सुबह।",
    fssaiLabel: "FSSAI लाइसेंस नंबर: " + compliance.fssai,
    addressLabel: "पता: " + "[ADDRESS]",
    phoneLabel: "फ़ोन: " + contact.phoneDisplay,
    whatsappLabel: "WhatsApp: " + contact.whatsappDisplay,
    areasTitle: "डिलीवरी क्षेत्र",
    linksTitle: "ज़रूरी लिंक",
    orderLink: "ऑर्डर करें",
    planLink: "महीने का प्लान",
    faqLink: "सवाल-जवाब",
    gmbLink: "Google पर हमें ढूँढें",
    instagramLink: "Instagram",
    qualityLink: "क्वालिटी और भरोसा",
    recipesLink: "रेसिपी",
    galleryLink: "गैलरी",
    bulkLink: "थोक ऑर्डर",
    visitLink: "फार्म विज़िट",
    privacyLink: "प्राइवेसी पॉलिसी",
    deliveryPolicyLink: "डिलीवरी पॉलिसी",
    refundPolicyLink: "रिफंड/कैंसल पॉलिसी",
    rights: "सर्वाधिकार सुरक्षित।",
    legalNote: "शुभ मिल्क · वाराणसी में दूध की डिलीवरी।",
  },

  quality: {
    title: "क्वालिटी और भरोसा",
    subtitle: "जो दिख रहा है, वही है — कोई छिपी बात नहीं।",
    labTitle: "आज की जाँच रिपोर्ट",
    labSubtitle: "हर बैच फार्म से निकलने से पहले जाँचा जाता है। पूरी रिपोर्ट WhatsApp पर माँगें।",
    rowFat: "फैट (FAT)",
    rowSnf: "एसएनएफ (SNF)",
    rowProtein: "प्रोटीन",
    rowTemp: "तापमान",
    rowMbrt: "एमबीआरटी (MBRT)",
    rowAdulteration: "मिलावट जाँच",
    batchLabel: "बैच नंबर",
    sampledLabel: "सैंपल का समय",
    reportLabel: "रिपोर्ट अपडेट",
    labLabel: "लैब",
    fssaiTitle: "FSSAI लाइसेंस",
    depositTitle: "बोतल जमा (रिफंडेबल)",
    depositDesc: "हर काँच की बोतल पर एक रिफंडेबल जमा लगता है — बोतल वापस करने पर पूरा पैसा वापस।",
    reportsCta: "पूरी रिपोर्ट WhatsApp पर पाएँ",
  },

  cows: {
    title: "हमारी गायें",
    subtitle: "जिन गाय-भैंस से आपका दूध आता है, उन्हें जानिए।",
    breedLabel: "नस्ल",
    ageLabel: "उम्र",
    adoptTitle: "गाय गोद लें (Adopt a Cow)",
    adoptDesc:
      "गोद लेने के प्लान में आप किसी एक गाय के खर्च का हिस्सा बनते हैं — बदले में उसकी ख़बर और उसी का ताज़ा दूध। रेट और शर्तें WhatsApp पर पूछें।",
    adoptCta: "गोद लेने के बारे में पूछें",
  },

  recipes: {
    title: "घरेलू रेसिपी",
    subtitle: "हमारे दूध, दही और घी से बने आसान घरेलू नुस्खे।",
    timeLabel: "समय",
    itemsLabel: "सामग्री",
    stepsLabel: "विधि",
    productLabel: "इसमें इस्तेमाल हुआ",
    festivalTitle: "त्योहार स्पेशल",
    festivalSubtitle: "त्योहारों के लिए ख़ास — एक दिन पहले WhatsApp पर बता दें।",
  },

  gallery: {
    title: "गैलरी",
    subtitle: "फार्म से आपके दरवाज़े तक — कुछ पल।",
  },

  bulk: {
    title: "थोक ऑर्डर (B2B)",
    subtitle: "होटल, मिठाई की दुकान, चाय की टपरी, मंदिर और रेस्टोरेंट के लिए रोज़ की सप्लाई।",
    whoTitle: "हम किसे सप्लाई करते हैं",
    rateLabel: "रेट",
    rateNote: "थोक रेट मात्रा के हिसाब से तय होता है — WhatsApp पर अपनी रोज़ की ज़रूरत बताएँ, हम रेट और समय बता देंगे।",
    cta: "WhatsApp पर थोक रेट पूछें",
  },

  visit: {
    title: "फार्म विज़िट बुक करें",
    subtitle: "देखिए आपका दूध कहाँ से आता है — गाय, दूध निकालना और काँच की बोतलें। बच्चों के लिए शानदार।",
    name: "आपका नाम",
    mobile: "मोबाइल नंबर",
    date: "किस दिन आना है",
    group: "कितने लोग आएँगे",
    notes: "कुछ और बताना हो तो",
    freeNote: "विज़िट फ्री है — बस एक दिन पहले बता दें ताकि चाय तैयार रहे।",
    submit: "WhatsApp पर विज़िट बुक करें",
    success: "धन्यवाद! हम WhatsApp पर समय कन्फ़र्म करेंगे।",
  },

  policies: {
    privacyTitle: "प्राइवेसी पॉलिसी",
    privacyIntro: "यह पॉलिसी बताती है कि शुभ मिल्क आपकी जानकारी क्या रखता है और क्यों।",
    privacyPoints: [
      "ऑर्डर के लिए हम सिर्फ़ नाम, मोबाइल नंबर और पता रखते हैं।",
      "आपकी बातचीत WhatsApp पर होती है — ऑर्डर कन्फ़र्म करने और डिलीवरी के लिए।",
      "आपकी जानकारी हम किसी को बेचते नहीं।",
      "खाता बंद कराने पर WhatsApp पर बोलें — आपकी जानकारी हम अपने रिकॉर्ड से हटा देंगे।",
    ],
    deliveryTitle: "डिलीवरी पॉलिसी",
    deliveryIntro: "डिलीवरी के समय, इलाके और नियम — साफ़-साफ़।",
    deliveryPoints: [
      "डिलीवरी रोज़ सुबह होती है — इलाके के हिसाब से समय थोड़ा आगे-पीछे हो सकता है।",
      "अगली सुबह के लिए ऑर्डर/बदलाव की आख़िरी समय-सीमा WhatsApp पर बताई जाती है।",
      "घर कोई न हो तो बोतल गेट पर रखने को कह सकते हैं — अपने डिलीवरी भाई से तय कर लें।",
      "किसी दिन देर हो तो हम WhatsApp पर पहले बता देते हैं।",
    ],
    refundTitle: "रिफंड और कैंसल पॉलिसी",
    refundIntro: "पॉज़, कैंसल और पैसे वापसी — बिना झंझट।",
    refundPoints: [
      "डिलीवरी कभी भी पॉज़ करें — WhatsApp पर एक मैसेज। पॉज़ के दिनों का कोई चार्ज नहीं।",
      "प्लान कभी भी बंद करें — बाकी बची ऐडवांस रक़म UPI पर वापस कर दी जाती है।",
      "बोतल का जमा बोतल वापस करने पर पूरा वापस मिलता है।",
      "डिलीवरी ग़ायब या खराब हो तो उसी दिन बताएँ — हम दोबारा भेजेंगे या बिल में काट लेंगे।",
    ],
    reviewNote: "यह शुरुआती ड्राफ़्ट है — पब्लिश करने से पहले अपने हिसाब से ज़रूर जाँच लें।",
  },

  common: {
    loading: "कृपया रुकिए…",
    required: "यह भरना ज़रूरी है",
    invalidMobile: "सही 10 अंकों का मोबाइल नंबर डालें",
    close: "बंद करें",
    yes: "हाँ",
    no: "नहीं",
    seeAll: "सब देखें",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  ENGLISH — same shape as `hi`, enforced by TypeScript
// ─────────────────────────────────────────────────────────────────────────────

type Copy = typeof hi;

const en: Copy = {
  meta: {
    homeTitle: "Shubh Milk — Fresh Milk from Kashi, delivered by 7 AM daily",
    homeDescription:
      "Fresh cow, buffalo and A2 desi cow milk, dahi, paneer and ghee delivered home in Varanasi. Returnable glass bottles, no adulteration. Order on WhatsApp.",
    homeKeywords:
      "milk delivery Varanasi, fresh milk Varanasi, A2 cow milk Varanasi, dahi paneer ghee home delivery, Kashi milk",
    orderTitle: "Place an Order — Shubh Milk, Varanasi",
    orderDescription:
      "Fill the form and send your order on WhatsApp. Cow, buffalo and A2 milk, dahi, paneer, ghee — home delivery in Varanasi.",
    subscribeTitle: "Monthly Milk Plans — Shubh Milk",
    subscribeDescription:
      "Weekly, monthly, family pack and hostel/cafe plans. First 2 days free trial. Pause your delivery any time.",
    contactTitle: "Contact & Delivery Areas — Shubh Milk",
    contactDescription: "Delivery areas, timings, phone and WhatsApp number in Varanasi.",
    areaTitleTemplate: "Milk Delivery in {area} — Shubh Milk, Varanasi",
    areaDescriptionTemplate:
      "Daily morning home delivery of fresh cow, buffalo and A2 milk in {area} (pincode {pincode}). Order on WhatsApp.",
    a2Title: "A2 Desi Cow Milk in Varanasi — Shubh Milk",
    a2Description:
      "Single-farm A2 desi cow milk in returnable glass bottles, delivered every morning in Varanasi.",
    paneerTitle: "Paneer Home Delivery — Shubh Milk, Varanasi",
    paneerDescription: "Fresh malai paneer made every morning and delivered home in Varanasi.",
    qualityTitle: "Quality & Trust — Shubh Milk, Varanasi",
    qualityDescription:
      "Daily lab testing, FSSAI licence, returnable glass bottles and zero adulteration — read our quality report.",
    recipesTitle: "Home Recipes & Festival Specials — Shubh Milk",
    recipesDescription:
      "Easy home recipes for lassi, paneer, kheer, dahi and thandai — plus festival specials.",
    galleryTitle: "Gallery — Shubh Milk, Varanasi",
    galleryDescription: "Our farm, our cows, the dairy and the morning delivery route.",
    bulkTitle: "Bulk Orders (B2B) — Hotels, Sweet Shops, Tea Stalls — Shubh Milk",
    bulkDescription:
      "Daily milk supply for hotels, sweet shops, tea stalls, temples and restaurants. Ask rates on WhatsApp.",
    visitTitle: "Book a Farm Visit — Shubh Milk, Varanasi",
    visitDescription:
      "Bring the family to the farm — meet the cows, try milking, see the glass bottling. A great school-holiday trip. Book on WhatsApp.",
    privacyTitle: "Privacy Policy — Shubh Milk",
    privacyDescription: "How Shubh Milk handles your information.",
    deliveryPolicyTitle: "Delivery Policy — Shubh Milk",
    deliveryPolicyDescription: "Delivery timings, areas and rules.",
    refundPolicyTitle: "Refund & Cancellation Policy — Shubh Milk",
    refundPolicyDescription: "How cancellations, pauses and refunds work.",
  },

  nav: {
    shop: "Milk & Products",
    subscribe: "Monthly Plans",
    areas: "Delivery Areas",
    order: "Order",
    contact: "Contact",
    quality: "Quality",
    recipes: "Recipes",
    languageToggle: "Change language",
  },

  hero: {
    overline: "Kashi's milkman · straight from the dairy to your door",
    headline: "Shubh Milk — Kashi's fresh milk, at your door by 7 AM, every day.",
    subheadline:
      "Fresh Cow, Buffalo & A2 Milk | Dahi, Paneer, Ghee | Home delivery in Varanasi.",
    ctaWhatsApp: "Order on WhatsApp",
    ctaCall: "Call Now",
    ctaTrial: "Book a Free Trial",
    note: "First 2 days free trial · Delivery in the morning, " + delivery.time,
  },

  trustBar: {
    fssai: "FSSAI Licence: [FSSAI]",
    noAdulteration: "No adulteration",
    hygienicPacking: "Hygienic packing",
    before7: "Delivered before 7 AM, daily",
    glassBottle: "Glass bottle — returnable",
    labelledNumber: "FSSAI licence number: " + compliance.fssai,
  },

  delivery: {
    title: "Delivery areas & timings",
    subtitle: "Every morning, at your doorstep.",
    timeLabel: "Delivery time",
    timeValue: delivery.time,
    minOrderLabel: "Minimum order",
    minOrderValue: delivery.minOrder,
    cutoffLabel: "Last time to order for tomorrow morning",
    cutoffValue: delivery.orderCutoff,
    areasLabel: "Where we deliver",
    notListed: "Your area not on the list? Message us on WhatsApp and we will check.",
    checkCta: "Send your pincode on WhatsApp",
  },

  products: {
    title: "Our milk & products",
    subtitle: "Fresh every morning, straight from the dairy.",
    cowMilk: "Cow Milk",
    buffaloMilk: "Buffalo Milk",
    a2Milk: "A2 Desi Cow Milk",
    dahi: "Dahi (Curd)",
    paneer: "Paneer",
    ghee: "Desi Ghee",
    butter: "Butter",
    khoya: "Khoya",
    chaach: "Chaach",
    lassi: "Lassi",
    addToOrder: "Add to order",
  },

  pricing: {
    title: "Rate list",
    subtitle: "Clear rates, no hidden charges.",
    perLitre: "per litre",
    perKg: "per kg",
    cow: "Cow Milk",
    buffalo: "Buffalo Milk",
    a2: "A2 Desi Cow Milk",
    dahi: "Dahi",
    paneer: "Paneer",
    ghee: "Desi Ghee",
    rateCow: rates.cow,
    rateBuffalo: rates.buffalo,
    rateA2: rates.a2,
    rateDahi: rates.dahi,
    ratePaneer: rates.paneer,
    rateGhee: rates.ghee,
    note: "Any rate change will be informed on WhatsApp first.",
  },

  plans: {
    title: "Monthly milk plans",
    subtitle: "No monthly headache — the milk simply keeps coming.",
    trialName: "Free Trial",
    trialDesc: "2 days free, no conditions. Continue only if you like it.",
    weeklyName: "Weekly Plan",
    weeklyDesc: "One week of milk — good for trying us out.",
    monthlyName: "Monthly Plan",
    monthlyDesc: "A full month of milk at the best rate.",
    familyName: "Family Pack",
    familyDesc: "2–3 litres daily — for larger families.",
    b2bName: "Hostel / PG / Cafe / Hotel",
    b2bDesc: "Large daily supply. Talk to us for rates.",
    price: "Rate: [PLAN_PRICE]",
    trialPrice: "Rate: [PLAN_PRICE_TRIAL]",
    weeklyPrice: "Rate: [PLAN_PRICE_WEEKLY]",
    monthlyPrice: "Rate: [PLAN_PRICE]",
    familyPrice: "Rate: [PLAN_PRICE_FAMILY]",
    b2bPrice: "Rate: [PLAN_PRICE_B2B]",
    ctaStart: "Start this plan",
    ctaTrial: "Book a free trial",
  },

  subscription: {
    title: "Monthly milk — how it works",
    subtitle: "Start, pause or increase your delivery — all in one WhatsApp message.",
    pauseTitle: "Pause your delivery",
    pauseDesc:
      "Going out of station or nobody home? Tell us on WhatsApp and delivery stops for those days.",
    pauseCta: "Send a pause message",
    extraTitle: "Extra milk for guests or festivals",
    extraDesc: "Weddings, puja, festivals — tell us a day ahead and we will add extra milk.",
    extraCta: "Request extra milk",
    billTitle: "Monthly bill & UPI reminder",
    billDesc:
      "A bill is sent at the end of the month. You can pay in advance by UPI, or pay cash on delivery.",
    billCta: "Ask for your bill",
    autopayTitle: "Monthly bill reminder",
    autopayDesc: "On the 1st of every month we send your bill and a UPI QR on WhatsApp.",
    howTitle: "How to start",
    howStep1: "Message us on WhatsApp with your area and how much milk you need.",
    howStep2: "First 2 days are free — your plan starts once you are happy.",
    howStep3: "Milk at your door every morning; bill at the end of the month.",
  },

  order: {
    title: "Place an order",
    subtitle: "Fill the form — WhatsApp opens by itself, you only press Send.",
    name: "Your name",
    mobile: "Mobile number",
    area: "Delivery area",
    address: "Full address (house number, landmark)",
    milkType: "Which milk",
    quantity: "How much (litres)",
    frequency: "How often",
    startDate: "Start from",
    paymentPref: "How you would like to pay",
    paymentUpi: "UPI (advance)",
    paymentCash: "Cash on delivery",
    paymentMonthly: "Monthly bill",
    freqDaily: "Daily",
    freqAlternate: "Alternate days",
    notes: "Anything specific? (e.g. thick milk, leave it at the gate)",
    submit: "Send order on WhatsApp",
    success: "Dhanyavaad! We will confirm on WhatsApp.",
    whatsappOpening: "Opening WhatsApp… if it does not open, use the button below.",
    upiTitle: "Advance payment (UPI)",
    upiDesc: "UPI ID: " + payments.upiId + " · Name: " + payments.payeeName,
    upiScanText: "Scan the QR and pay by UPI (GPay / PhonePe / Paytm).",
    orCall: "Or call: " + contact.phoneDisplay,
  },

  payments: {
    title: "Payments & offers",
    subtitle: "However it is easiest for you — UPI, cash, or a monthly bill.",
    upi: "UPI (GPay, PhonePe, Paytm)",
    cash: "Cash on delivery",
    monthly: "Monthly bill",
    referralTitle: "Refer a friend, get 1 litre free",
    referralDesc: offers.referral + " When your friend starts a plan, you get 1 litre of milk free.",
    loyaltyTitle: "1 litre free on your 10th delivery",
    loyaltyDesc: offers.loyalty + " Every 10th delivery on a running plan is free.",
    firstOrderTitle: "First order offer",
    firstOrderDesc: offers.firstOrder,
  },

  trust: {
    title: "Trust is the whole business",
    subtitle: "What you see is what it is — nothing hidden.",
    point1Title: "Our own cattle, our own dairy",
    point1Desc: "[FARM_DETAILS] — write where the milk comes from and how many animals you keep.",
    point2Title: "FSSAI licensed",
    point2Desc: "Licence number " + compliance.fssai + " — printed clearly on every bottle.",
    point3Title: "Glass bottles",
    point3Desc: "Milk in glass bottles — we wash and take them back, so less plastic.",
    point4Title: "No adulteration",
    point4Desc: "No water, no powder, no chemicals. [TEST_REPORT_NOTE]",
    photoNote: "[PHOTO_NOTE] — put real photos of your dairy, cattle, bottles and delivery here.",
  },

  testimonials: {
    title: "What our customers say",
    subtitle: "Families, hostels and hotels across Kashi.",
    /* ⚠ Must be real customers' own words, used with their permission. */
    t1Quote: "[TESTIMONIAL_1_QUOTE]",
    t1Name: "[TESTIMONIAL_1_NAME]",
    t1Area: "[TESTIMONIAL_1_AREA]",
    t2Quote: "[TESTIMONIAL_2_QUOTE]",
    t2Name: "[TESTIMONIAL_2_NAME]",
    t2Area: "[TESTIMONIAL_2_AREA]",
    t3Quote: "[TESTIMONIAL_3_QUOTE]",
    t3Name: "[TESTIMONIAL_3_NAME]",
    t3Area: "[TESTIMONIAL_3_AREA]",
  },

  faq: {
    title: "Frequently asked questions",
    q1: "What time is delivery?",
    a1:
      "Every morning between " + delivery.time + ". If we are running late any day, we tell you on WhatsApp first.",
    q2: "What is the minimum order?",
    a2: "Minimum order: " + delivery.minOrder + ". You can take as much more as you like.",
    q3: "How do I pay every month?",
    a3:
      "Three ways — UPI in advance, cash on delivery, or a monthly bill. Your bill reaches you on WhatsApp on the 1st of the month.",
    q4: "How do I pause delivery?",
    a4:
      "One WhatsApp message saying from when to when. You are not charged for the paused days.",
    q5: "Do I have to return the bottle?",
    a5:
      "Yes please. We take the glass bottles back — leave the empty bottle out at the next delivery. There is a small refundable deposit on each bottle, returned in full when you hand it back.",
    q6: "Is the milk fresh or stored?",
    a6:
      "What you get each morning is that same morning's milk — not stored, not yesterday's.",
    q7: "How much is the bottle deposit?",
    a7:
      "The deposit is ₹" + bottleDeposit.amount + " per bottle. It comes straight back to your account whenever you return the bottle.",
    q8: "Can I see the milk test report?",
    a8:
      "Yes. Every batch is tested before it leaves the farm — MBRT, antibiotics and adulterants. Read today's report on the Quality page, or just ask on WhatsApp.",
    askMore: "More questions? Just ask on WhatsApp — " + contact.whatsappDisplay,
  },

  sticky: {
    orderOnWhatsApp: "Order on WhatsApp",
    callNow: "Call",
    bookTrial: "Free Trial",
    ariaLabelWhatsApp: "Order on WhatsApp (opens in a new window)",
    ariaLabelCall: "Call us",
  },

  footer: {
    tagline: brand.name + " — Kashi's fresh milk, every morning.",
    fssaiLabel: "FSSAI licence number: " + compliance.fssai,
    addressLabel: "Address: " + "[ADDRESS]",
    phoneLabel: "Phone: " + contact.phoneDisplay,
    whatsappLabel: "WhatsApp: " + contact.whatsappDisplay,
    areasTitle: "Delivery areas",
    linksTitle: "Useful links",
    orderLink: "Order",
    planLink: "Monthly plans",
    faqLink: "FAQs",
    gmbLink: "Find us on Google",
    instagramLink: "Instagram",
    qualityLink: "Quality & Trust",
    recipesLink: "Recipes",
    galleryLink: "Gallery",
    bulkLink: "Bulk Orders",
    visitLink: "Farm Visit",
    privacyLink: "Privacy Policy",
    deliveryPolicyLink: "Delivery Policy",
    refundPolicyLink: "Refund/Cancellation Policy",
    rights: "All rights reserved.",
    legalNote: "Shubh Milk · Milk delivery in Varanasi.",
  },

  quality: {
    title: "Quality & Trust",
    subtitle: "What you see is what it is — nothing hidden.",
    labTitle: "Today's test report",
    labSubtitle: "Every batch is tested before it leaves the farm. Ask on WhatsApp for the full report.",
    rowFat: "Fat",
    rowSnf: "SNF",
    rowProtein: "Protein",
    rowTemp: "Temperature",
    rowMbrt: "MBRT",
    rowAdulteration: "Adulteration test",
    batchLabel: "Batch number",
    sampledLabel: "Sampled at",
    reportLabel: "Report updated",
    labLabel: "Lab",
    fssaiTitle: "FSSAI licence",
    depositTitle: "Bottle deposit (refundable)",
    depositDesc: "Each glass bottle carries a small refundable deposit — returned in full when you hand the bottle back.",
    reportsCta: "Get the full report on WhatsApp",
  },

  cows: {
    title: "Our cows",
    subtitle: "Meet the animals behind your morning milk.",
    breedLabel: "Breed",
    ageLabel: "Age",
    adoptTitle: "Adopt a cow",
    adoptDesc:
      "In the adopt-a-cow plan you sponsor one animal's keep — and in return hear her news and drink her milk. Ask on WhatsApp for the amount and terms.",
    adoptCta: "Ask about adopting",
  },

  recipes: {
    title: "Home recipes",
    subtitle: "Easy, honest recipes made with our milk, dahi and ghee.",
    timeLabel: "Time",
    itemsLabel: "You need",
    stepsLabel: "Method",
    productLabel: "Made with",
    festivalTitle: "Festival specials",
    festivalSubtitle: "For festivals — tell us a day ahead on WhatsApp.",
  },

  gallery: {
    title: "Gallery",
    subtitle: "From the farm to your doorstep — a few moments.",
  },

  bulk: {
    title: "Bulk orders (B2B)",
    subtitle: "Daily supply for hotels, sweet shops, tea stalls, temples and restaurants.",
    whoTitle: "Who we supply",
    rateLabel: "Rate",
    rateNote: "Bulk rates depend on quantity — tell us your daily need on WhatsApp and we will confirm rate and timing.",
    cta: "Ask bulk rates on WhatsApp",
  },

  visit: {
    title: "Book a farm visit",
    subtitle: "See where your milk comes from — the cows, the milking, the glass bottles. Children love it.",
    name: "Your name",
    mobile: "Mobile number",
    date: "Which day",
    group: "How many people",
    notes: "Anything else we should know",
    freeNote: "Visits are free — just tell us a day ahead so the chai is ready.",
    submit: "Book the visit on WhatsApp",
    success: "Dhanyavaad! We will confirm the time on WhatsApp.",
  },

  policies: {
    privacyTitle: "Privacy policy",
    privacyIntro: "What Shubh Milk stores about you, and why.",
    privacyPoints: [
      "For orders we keep only your name, mobile number and address.",
      "Your chats happen on WhatsApp — to confirm orders and arrange delivery.",
      "We never sell your information to anyone.",
      "Want your details removed? Message us on WhatsApp and we will delete them from our records.",
    ],
    deliveryTitle: "Delivery policy",
    deliveryIntro: "Timings, areas and rules — plainly stated.",
    deliveryPoints: [
      "Delivery is every morning; the exact time can vary a little by area.",
      "The cut-off for ordering or changing tomorrow's delivery is shared on WhatsApp.",
      "Nobody home? You can ask for bottles to be left at the gate — agree it with your delivery person.",
      "If we are ever late, we tell you on WhatsApp first.",
    ],
    refundTitle: "Refund & cancellation policy",
    refundIntro: "Pauses, cancellations and refunds — without the fine print.",
    refundPoints: [
      "Pause delivery any time with one WhatsApp message. Paused days are never charged.",
      "Stop your plan any time — any advance balance is refunded over UPI.",
      "The bottle deposit is returned in full whenever you return the bottles.",
      "A missing or spoiled delivery? Tell us the same day and we redeliver or adjust your bill.",
    ],
    reviewNote: "This is a starting draft — please review it before you rely on it in public.",
  },

  common: {
    loading: "Please wait…",
    required: "This is required",
    invalidMobile: "Enter a valid 10-digit mobile number",
    close: "Close",
    yes: "Yes",
    no: "No",
    seeAll: "See all",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  ACCESS HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const translations: Record<Lang, Copy> = { hi, en };

/** t("hi") — grab the whole copy block for a language. */
export const t = (lang: Lang): Copy => translations[lang];

/** Runtime guard when reading the language from a cookie/localStorage. */
export const isLang = (value: string | null | undefined): value is Lang =>
  value === "hi" || value === "en";

export type CopyShape = Copy;
