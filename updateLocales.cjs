const fs = require('fs');

const updateLocale = (file, dataToAdd) => {
  const path = './src/i18n/locales/' + file;
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data = { ...data, ...dataToAdd };
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

updateLocale('en.json', {
  shop: {
    hero_title: "Premium Equipment",
    hero_subtitle: "Professional photography and videography gear from the world's leading brands",
    search_placeholder: "Search equipment...",
    category: "Category",
    brand: "Brand",
    sort_by: "Sort by",
    sort_featured: "Featured",
    sort_price_low: "Price: Low to High",
    sort_price_high: "Price: High to Low",
    sort_rating: "Top Rated",
    sort_name: "Name",
    active_filters: "Active filters:",
    showing_products: "Showing {{count}} of {{total}} products",
    out_of_stock: "Out of Stock",
    add: "Add",
    add_to_cart: "Add to Cart",
    no_results: "No products found matching your criteria",
    clear_filters: "Clear Filters",
    toast_added_cart: "{{name}} added to cart",
    toast_added_wishlist: "{{name}} added to wishlist",
    toast_already_wishlist: "Already in wishlist"
  },
  cart: {
    empty_title: "Your cart is empty",
    empty_subtitle: "Start shopping to add items to your cart",
    browse_btn: "Browse Equipment",
    title: "Shopping Cart",
    items_count: "{{count}} items in your cart",
    each: "each",
    order_summary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    free: "Free",
    tax: "Tax (18%)",
    total: "Total",
    checkout_btn: "Proceed to Checkout",
    continue_btn: "Continue Shopping",
    toast_checkout: "Order placed successfully! We'll contact you shortly.",
    toast_removed: "Item removed from cart"
  },
  wishlist: {
    empty_title: "Your wishlist is empty",
    empty_subtitle: "Save your favorite items for later",
    title: "My Wishlist",
    items_count: "{{count}} items saved",
    toast_removed: "Removed from wishlist"
  }
});

updateLocale('ar.json', {
  shop: {
    hero_title: "معدات متميزة",
    hero_subtitle: "معدات تصوير فوتوغرافي وفيديو احترافية من أفضل العلامات التجارية في العالم",
    search_placeholder: "البحث عن المعدات...",
    category: "الفئة",
    brand: "العلامة التجارية",
    sort_by: "ترتيب حسب",
    sort_featured: "مميز",
    sort_price_low: "السعر: من الأقل للأعلى",
    sort_price_high: "السعر: من الأعلى للأقل",
    sort_rating: "الأعلى تقييماً",
    sort_name: "الاسم",
    active_filters: "الفلاتر النشطة:",
    showing_products: "عرض {{count}} من {{total}} منتج",
    out_of_stock: "نفد من المخزون",
    add: "إضافة",
    add_to_cart: "أضف إلى السلة",
    no_results: "لم يتم العثور على منتجات تطابق معاييرك",
    clear_filters: "مسح الفلاتر",
    toast_added_cart: "تمت إضافة {{name}} إلى السلة",
    toast_added_wishlist: "تمت إضافة {{name}} إلى المفضلة",
    toast_already_wishlist: "موجود بالفعل في المفضلة"
  },
  cart: {
    empty_title: "عربة التسوق فارغة",
    empty_subtitle: "ابدأ التسوق لإضافة منتجات إلى عربة التسوق",
    browse_btn: "تصفح المعدات",
    title: "عربة التسوق",
    items_count: "{{count}} منتجات في عربتك",
    each: "لكل قطعة",
    order_summary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    free: "مجاني",
    tax: "الضريبة (18%)",
    total: "الإجمالي",
    checkout_btn: "المتابعة للدفع",
    continue_btn: "متابعة التسوق",
    toast_checkout: "تم تأكيد الطلب بنجاح! سنتصل بك قريباً.",
    toast_removed: "تم إزالة العنصر من السلة"
  },
  wishlist: {
    empty_title: "قائمة المفضلة فارغة",
    empty_subtitle: "احفظ منتجاتك المفضلة لوقت لاحق",
    title: "قائمة المفضلة",
    items_count: "{{count}} عناصر محفوظة",
    toast_removed: "تمت الإزالة من المفضلة"
  }
});

updateLocale('rw.json', {
  shop: {
    hero_title: "Ibikoresho byo ku Rwego rwo Hejuru",
    hero_subtitle: "Ibikoresho byo gufotora no gufata videwo byabigize umwuga bituruka mu nganda zikomeye ku isi",
    search_placeholder: "Shakisha ibikoresho...",
    category: "Icyiciro",
    brand: "Uruganda",
    sort_by: "Panga ukurikije",
    sort_featured: "Ibyatoranyijwe",
    sort_price_low: "Igiciro: Gito kugeza Kinini",
    sort_price_high: "Igiciro: Kinini kugeza Gito",
    sort_rating: "Amanota yo Hejuru",
    sort_name: "Izina",
    active_filters: "Akayunguruzo kakoreshejwe:",
    showing_products: "Kwerekana {{count}} kuri {{total}} by'ibicuruzwa",
    out_of_stock: "Byashize",
    add: "Ongeramo",
    add_to_cart: "Shyira mu Ikarita",
    no_results: "Nta bicuruzwa byabonetse bihuye n'ibyo washakishije",
    clear_filters: "Siba Akayunguruzo",
    toast_added_cart: "{{name}} yongewe mu ikarita",
    toast_added_wishlist: "{{name}} yongewe mu byo wifuza",
    toast_already_wishlist: "Ibisanzwe mu byo wifuza"
  },
  cart: {
    empty_title: "Ikarita yawe irimo ubusa",
    empty_subtitle: "Tangira guhaha kugira ngo wongere ibintu mu ikarita yawe",
    browse_btn: "Reba Ibikoresho",
    title: "Ikarita yo Guhaha",
    items_count: "Ibintu {{count}} mu ikarita yawe",
    each: "imwe",
    order_summary: "Incamake ya Komande",
    subtotal: "Igiteranyo",
    shipping: "Kugezwaho",
    free: "Ubuntu",
    tax: "Umusoro (18%)",
    total: "Igiteranyo Cyose",
    checkout_btn: "Komeza Wishyure",
    continue_btn: "Komeza Guhaha",
    toast_checkout: "Komande yawe yakiriwe neza! Turaguhamagara vuba.",
    toast_removed: "Ikintu cyakuwe mu ikarita"
  },
  wishlist: {
    empty_title: "Urutonde rw'ibyo wifuza rurimo ubusa",
    empty_subtitle: "Bika ibintu ukunda kugira ngo uzabirebe nyuma",
    title: "Ibyo Nifuza",
    items_count: "Ibintu {{count}} byabitswe",
    toast_removed: "Cyakuwe mu byo wifuza"
  }
});
