const fs = require('fs');

const updateLocale = (file, dataToAdd) => {
  const path = './src/i18n/locales/' + file;
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data = { ...data, ...dataToAdd };
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

updateLocale('en.json', {
  studio: {
    hero_title: "Professional Studio Spaces",
    hero_subtitle: "Fully-equipped studios for podcasts, photography, video production, and content creation",
    capacity: "Up to {{capacity}} people",
    equipment_included: "Equipment Included",
    book_btn: "Book This Studio",
    faq_title: "Frequently Asked Questions",
    faq_1_q: "How far in advance should I book?",
    faq_1_a: "We recommend booking at least 48 hours in advance, but we can often accommodate same-day bookings based on availability.",
    faq_2_q: "What's included in the hourly rate?",
    faq_2_a: "All listed equipment, technical support, Wi-Fi, and basic amenities. Additional services like videographers or photographers can be arranged separately.",
    faq_3_q: "Can I bring my own equipment?",
    faq_3_a: "Absolutely! You're welcome to bring additional gear. Our team can help integrate it with the studio setup.",
    faq_4_q: "Is there a minimum booking time?",
    faq_4_a: "Most studios have a 1-hour minimum. For commercial productions, we offer half-day and full-day packages at discounted rates.",
    dialog_title: "Book {{name}}",
    dialog_desc: "Fill in your details to reserve this studio",
    form_name: "Your Name",
    form_email: "Email",
    form_date: "Date",
    form_time: "Time Slot",
    form_select_time: "Select time",
    form_hours: "Number of Hours",
    hour_single: "hour",
    hour_plural: "hours",
    total_price: "Total Price",
    cancel: "Cancel",
    confirm: "Confirm Booking",
    toast_confirmed: "Booking confirmed for {{name}}!"
  }
});

updateLocale('ar.json', {
  studio: {
    hero_title: "مساحات استوديو احترافية",
    hero_subtitle: "استوديوهات مجهزة بالكامل للبودكاست، التصوير الفوتوغرافي، إنتاج الفيديو، وصناعة المحتوى",
    capacity: "حتى {{capacity}} أشخاص",
    equipment_included: "المعدات المشمولة",
    book_btn: "احجز هذا الاستوديو",
    faq_title: "الأسئلة الشائعة",
    faq_1_q: "كم من الوقت يجب أن أحجز مسبقاً؟",
    faq_1_a: "نوصي بالحجز قبل 48 ساعة على الأقل، ولكن يمكننا غالباً استيعاب حجوزات في نفس اليوم بناءً على التوفر.",
    faq_2_q: "ماذا يشمل سعر الساعة؟",
    faq_2_a: "جميع المعدات المدرجة، الدعم الفني، الواي فاي، والمرافق الأساسية. يمكن ترتيب خدمات إضافية مثل مصوري الفيديو أو الفوتوغرافيين بشكل منفصل.",
    faq_3_q: "هل يمكنني إحضار معداتي الخاصة؟",
    faq_3_a: "بالتأكيد! نرحب بإحضار معدات إضافية. يمكن لفريقنا المساعدة في دمجها مع إعداد الاستوديو.",
    faq_4_q: "هل هناك حد أدنى لوقت الحجز؟",
    faq_4_a: "معظم الاستوديوهات تتطلب حداً أدنى لمدة ساعة واحدة. للإنتاج التجاري، نقدم باقات لنصف يوم ويوم كامل بأسعار مخفضة.",
    dialog_title: "حجز {{name}}",
    dialog_desc: "املأ تفاصيلك لحجز هذا الاستوديو",
    form_name: "اسمك",
    form_email: "البريد الإلكتروني",
    form_date: "التاريخ",
    form_time: "وقت الحجز",
    form_select_time: "اختر الوقت",
    form_hours: "عدد الساعات",
    hour_single: "ساعة",
    hour_plural: "ساعات",
    total_price: "السعر الإجمالي",
    cancel: "إلغاء",
    confirm: "تأكيد الحجز",
    toast_confirmed: "تم تأكيد الحجز لـ {{name}}!"
  }
});

updateLocale('rw.json', {
  studio: {
    hero_title: "Aho Sitidiyo yo Ku Rwego rwo Hejuru",
    hero_subtitle: "Sitidiyo zifite ibikoresho byose bya podcast, gufotora, gukora videwo, no gukora ibihangano",
    capacity: "Abantu kugeza kuri {{capacity}}",
    equipment_included: "Ibikoresho Birimo",
    book_btn: "Fata Iyi Sitidiyo",
    faq_title: "Ibibazo Bikunze Kubazwa",
    faq_1_q: "Nkabanza gufata umwanya mbere y'igihe kingana iki?",
    faq_1_a: "Tugugira inama yo gufata umwanya nibura amasaha 48 mbere, ariko kenshi dushobora kwakira abafata umwanya ku munsi umwe bitewe n'umwanya uhari.",
    faq_2_q: "Igiciro cy'isaha kigizwe n'iki?",
    faq_2_a: "Ibikoresho byose byanditswe, ubufasha bwa tekiniki, Wi-Fi, n'ibikenerwa by'ibanze. Serivisi z'inyongera nk'abafata videwo cyangwa abafotora zishobora gutegurwa ukwabyo.",
    faq_3_q: "Nshobora kuzana ibikoresho byanjye?",
    faq_3_a: "Yego rwose! Urakaza neza kuzana ibindi bikoresho. Ikipe yacu ishobora kugufasha kubihuza n'ibikoresho bya sitidiyo.",
    faq_4_q: "Hari igihe gito gishoboka cyo gufata umwanya?",
    faq_4_a: "Sitidiyo nyinshi zisaba nibura isaha 1. Ku mishinga y'ubucuruzi minini, dutanga ibiciro byagabanyijwe by'igice cy'umunsi n'umunsi wose.",
    dialog_title: "Fata {{name}}",
    dialog_desc: "Uzuza imyirondoro yawe kugira ngo ufate iyi sitidiyo",
    form_name: "Izina Ryawe",
    form_email: "Imeri",
    form_date: "Itariki",
    form_time: "Igihe",
    form_select_time: "Hitamo igihe",
    form_hours: "Umubare w'Amasaha",
    hour_single: "isaha",
    hour_plural: "amasaha",
    total_price: "Igiciro Cyose",
    cancel: "Reka",
    confirm: "Emeza Kufata Umwanya",
    toast_confirmed: "Gufata umwanya byemejwe kuri {{name}}!"
  }
});
