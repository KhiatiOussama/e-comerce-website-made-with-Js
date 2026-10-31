// One aligned table keeps every supported language complete.
const messages = [
  [
    "meta.title",
    "Store 22 — Made for your everyday.",
    "Store 22 — Pour tous vos jours.",
    "ستور 22 — لكل يوم في حياتك."
  ],
  [
    "nav.men",
    "Men",
    "Homme",
    "رجال"
  ],
  [
    "nav.women",
    "Women",
    "Femme",
    "نساء"
  ],
  [
    "nav.kids",
    "Kids",
    "Enfant",
    "أطفال"
  ],
  [
    "nav.sale",
    "Sale",
    "Soldes",
    "تخفيضات"
  ],
  [
    "nav.contact",
    "Contact",
    "Contact",
    "تواصل معنا"
  ],
  [
    "nav.cart",
    "Shopping bag",
    "Panier",
    "حقيبة التسوق"
  ],
  [
    "nav.login",
    "Log in",
    "Connexion",
    "تسجيل الدخول"
  ],
  [
    "nav.logout",
    "Log out",
    "Déconnexion",
    "تسجيل الخروج"
  ],
  [
    "nav.account",
    "My account",
    "Mon compte",
    "حسابي"
  ],
  [
    "nav.theme",
    "Switch theme",
    "Changer de thème",
    "تغيير المظهر"
  ],
  [
    "nav.language",
    "Language",
    "Langue",
    "اللغة"
  ],
  [
    "nav.menu",
    "Open menu",
    "Ouvrir le menu",
    "فتح القائمة"
  ],
  [
    "nav.closeMenu",
    "Close menu",
    "Fermer le menu",
    "إغلاق القائمة"
  ],
  [
    "nav.admin",
    "Admin",
    "Administration",
    "الإدارة"
  ],
  [
    "common.shopNow",
    "Shop now",
    "Découvrir",
    "تسوق الآن"
  ],
  [
    "common.viewAll",
    "View all",
    "Tout voir",
    "عرض الكل"
  ],
  [
    "common.close",
    "Close",
    "Fermer",
    "إغلاق"
  ],
  [
    "common.cancel",
    "Cancel",
    "Annuler",
    "إلغاء"
  ],
  [
    "common.save",
    "Save",
    "Enregistrer",
    "حفظ"
  ],
  [
    "common.delete",
    "Delete",
    "Supprimer",
    "حذف"
  ],
  [
    "common.edit",
    "Edit",
    "Modifier",
    "تعديل"
  ],
  [
    "common.loading",
    "Loading…",
    "Chargement…",
    "جارٍ التحميل…"
  ],
  [
    "common.search",
    "Search",
    "Rechercher",
    "بحث"
  ],
  [
    "common.price",
    "Price",
    "Prix",
    "السعر"
  ],
  [
    "common.quantity",
    "Quantity",
    "Quantité",
    "الكمية"
  ],
  [
    "common.size",
    "Size",
    "Pointure",
    "المقاس"
  ],
  [
    "common.color",
    "Color",
    "Couleur",
    "اللون"
  ],
  [
    "common.category",
    "Category",
    "Catégorie",
    "الفئة"
  ],
  [
    "common.stock",
    "Stock",
    "Stock",
    "المخزون"
  ],
  [
    "common.all",
    "All",
    "Tout",
    "الكل"
  ],
  [
    "common.optional",
    "Optional",
    "Facultatif",
    "اختياري"
  ],
  [
    "common.home",
    "Home",
    "Accueil",
    "الرئيسية"
  ],
  [
    "common.viewProduct",
    "View shoe",
    "Voir la chaussure",
    "عرض الحذاء"
  ],
  [
    "common.actions",
    "Actions",
    "Actions",
    "الإجراءات"
  ],
  [
    "common.new",
    "New",
    "Nouveau",
    "جديد"
  ],
  [
    "common.items",
    "{count} items",
    "{count} articles",
    "{count} منتجات"
  ],
  [
    "common.goHome",
    "Back to home",
    "Retour à l’accueil",
    "العودة للرئيسية"
  ],
  [
    "common.error",
    "Something went wrong. Please try again.",
    "Une erreur est survenue. Veuillez réessayer.",
    "حدث خطأ. يرجى المحاولة مجددًا."
  ],
  [
    "common.unavailable",
    "Unavailable",
    "Indisponible",
    "غير متوفر"
  ],
  [
    "common.logo",
    "Store 22 home",
    "Accueil Store 22",
    "الرئيسية — ستور 22"
  ],
  [
    "common.skipToContent",
    "Skip to content",
    "Aller au contenu",
    "الانتقال إلى المحتوى"
  ],
  [
    "common.name",
    "Name",
    "Nom",
    "الاسم"
  ],
  [
    "common.description",
    "Description",
    "Description",
    "الوصف"
  ],
  [
    "common.imageUrl",
    "Image URL",
    "URL de l’image",
    "رابط الصورة"
  ],
  [
    "common.sizes",
    "Sizes",
    "Pointures",
    "المقاسات"
  ],
  [
    "common.colors",
    "Colors",
    "Couleurs",
    "الألوان"
  ],
  [
    "common.originalPrice",
    "Original price",
    "Prix d’origine",
    "السعر الأصلي"
  ],
  [
    "home.eyebrow",
    "THE EVERYDAY COLLECTION · 2026",
    "LA COLLECTION DU QUOTIDIEN · 2026",
    "مجموعة لكل يوم · 2026"
  ],
  [
    "home.titleLine1",
    "Good shoes.",
    "Bien chaussé.",
    "حذاء مريح."
  ],
  [
    "home.titleLine2",
    "Great days.",
    "Belle journée.",
    "ويوم جميل."
  ],
  [
    "home.description",
    "A fresh perspective on everyday footwear. Considered designs that move with you, wherever the day takes you.",
    "Un nouveau regard sur les chaussures du quotidien. Des modèles soignés qui vous suivent, où que la journée vous mène.",
    "لمسة جديدة لأحذيتك اليومية. تصاميم مدروسة ترافق خطواتك، أينما يأخذك يومك."
  ],
  [
    "home.shopMen",
    "Shop men",
    "Collection homme",
    "تسوق للرجال"
  ],
  [
    "home.shopWomen",
    "Shop women",
    "Collection femme",
    "تسوق للنساء"
  ],
  [
    "home.featured",
    "The latest rotation.",
    "Votre nouvelle sélection.",
    "اختياراتك الجديدة."
  ],
  [
    "home.newArrivals",
    "New arrivals",
    "Nouveautés",
    "وصل حديثًا"
  ],
  [
    "home.featuredDescription",
    "Fresh silhouettes. Everyday favorites. Your next pair starts here.",
    "De nouvelles lignes. Des essentiels. Votre prochaine paire commence ici.",
    "تصاميم جديدة ومفضلات يومية. زوجك القادم يبدأ من هنا."
  ],
  [
    "home.collectionTitle",
    "Find your everyday.",
    "À chacun son quotidien.",
    "اختر ما يناسب يومك."
  ],
  [
    "home.collectionDescription",
    "For every step, every style, every you.",
    "Pour chaque pas, chaque style, chaque envie.",
    "لكل خطوة، ولكل أسلوب، ولكل ما يشبهك."
  ],
  [
    "home.promoEyebrow",
    "A LITTLE EXTRA, FOR LESS",
    "UN PETIT PLUS, À PRIX DOUX",
    "اختيارات أكثر، بسعر أقل"
  ],
  [
    "home.promoTitle",
    "Your next favorite. For a little less.",
    "Votre prochain coup de cœur. À prix doux.",
    "مفضلتك القادمة. بسعر أقل."
  ],
  [
    "home.promoDescription",
    "Good finds, better prices. Discover selected favorites at up to 30% off.",
    "Belles trouvailles, petits prix. Découvrez une sélection jusqu’à -30 %.",
    "اختيارات جميلة وأسعار أجمل. اكتشف مختارات بخصم حتى 30٪."
  ],
  [
    "home.promoCta",
    "Explore the sale",
    "Découvrir les soldes",
    "اكتشف التخفيضات"
  ],
  [
    "home.menDescription",
    "Built for the everyday.",
    "Pensées pour le quotidien.",
    "مصممة لكل يوم."
  ],
  [
    "home.womenDescription",
    "Your pace. Your style.",
    "Votre rythme. Votre style.",
    "إيقاعك. أسلوبك."
  ],
  [
    "home.kidsDescription",
    "Big adventures. Little feet.",
    "Grandes aventures. Petits pieds.",
    "مغامرات كبيرة لأقدام صغيرة."
  ],
  [
    "home.saleDescription",
    "Good finds, better prices.",
    "Belles trouvailles, petits prix.",
    "اختيارات جميلة بأسعار أجمل."
  ],
  [
    "home.explore",
    "Explore collection",
    "Découvrir la collection",
    "اكتشف المجموعة"
  ],
  [
    "home.heroAlt",
    "Everyday sneaker on a neutral studio background",
    "Basket sur un fond de studio neutre",
    "حذاء يومي على خلفية محايدة"
  ],
  [
    "home.qualityTitle",
    "Made to move",
    "Faites pour bouger",
    "مصممة للحركة"
  ],
  [
    "home.qualityDescription",
    "Comfort from your first step to your last.",
    "Du confort du premier au dernier pas.",
    "راحة من أول خطوة إلى آخرها."
  ],
  [
    "home.deliveryTitle",
    "Delivered with care",
    "Livrées avec soin",
    "نوصله بعناية"
  ],
  [
    "home.deliveryDescription",
    "Free delivery on orders over $100.",
    "Livraison offerte dès 100 $ d’achat.",
    "توصيل مجاني للطلبات فوق 100 دولار."
  ],
  [
    "home.returnsTitle",
    "Find your perfect fit",
    "Trouvez votre pointure",
    "اعثر على مقاسك المثالي"
  ],
  [
    "home.returnsDescription",
    "Easy returns within 30 days.",
    "Retours faciles sous 30 jours.",
    "إرجاع سهل خلال 30 يومًا."
  ],
  [
    "home.featuredLabel",
    "CURATED FOR YOU",
    "CHOISIS POUR VOUS",
    "مختارة لك"
  ],
  [
    "home.categoriesEyebrow",
    "YOUR NEXT STEP",
    "VOTRE PROCHAIN PAS",
    "خطوتك القادمة"
  ],
  [
    "home.scroll",
    "Scroll to explore",
    "Découvrir la collection",
    "مرر للاكتشاف"
  ],
  [
    "home.heroLabel",
    "EVERYDAY COURT / 001",
    "COURT AU QUOTIDIEN / 001",
    "كورت اليومي / 001"
  ],
  [
    "home.stamp",
    "NEW SEASON",
    "NOUVELLE SAISON",
    "موسم جديد"
  ],
  [
    "home.announcement",
    "A fresh step. Free shipping on orders over $100.",
    "Un nouveau pas. Livraison offerte dès 100 $.",
    "خطوة جديدة. توصيل مجاني للطلبات فوق 100 دولار."
  ],
  [
    "home.off",
    "UP TO",
    "JUSQU’À",
    "حتى"
  ],
  [
    "footer.description",
    "Good shoes. Great days. Thoughtfully chosen footwear for wherever life takes you.",
    "Bien chaussé. Belle journée. Des chaussures choisies avec soin pour vous accompagner partout.",
    "حذاء مريح ويوم جميل. أحذية مختارة بعناية لترافقك أينما تأخذك الحياة."
  ],
  [
    "footer.shop",
    "Shop",
    "Boutique",
    "تسوق"
  ],
  [
    "footer.help",
    "Here to help",
    "À votre écoute",
    "نحن لمساعدتك"
  ],
  [
    "footer.newsletter",
    "A step ahead.",
    "Un pas d’avance.",
    "كن دائمًا بخطوة للأمام."
  ],
  [
    "footer.newsletterDescription",
    "Fresh arrivals and a little inspiration. Straight to your inbox.",
    "Nouveautés et un peu d’inspiration. Directement dans votre boîte mail.",
    "أحدث الإصدارات وإلهام جديد. مباشرة إلى بريدك."
  ],
  [
    "footer.emailPlaceholder",
    "Your email address",
    "Votre adresse e-mail",
    "بريدك الإلكتروني"
  ],
  [
    "footer.subscribe",
    "Subscribe",
    "S’inscrire",
    "اشترك"
  ],
  [
    "footer.subscribed",
    "You’re on the list. Welcome to Store 22!",
    "Vous êtes sur la liste. Bienvenue chez Store 22 !",
    "تم تسجيل اشتراكك. أهلًا بك في ستور 22!"
  ],
  [
    "footer.rights",
    "© {year} Store 22. All rights reserved.",
    "© {year} Store 22. Tous droits réservés.",
    "© {year} ستور 22. جميع الحقوق محفوظة."
  ],
  [
    "footer.privacy",
    "Privacy policy",
    "Confidentialité",
    "سياسة الخصوصية"
  ],
  [
    "footer.terms",
    "Terms of service",
    "Conditions d’utilisation",
    "شروط الاستخدام"
  ],
  [
    "footer.shipping",
    "Shipping & returns",
    "Livraison et retours",
    "التوصيل والإرجاع"
  ],
  [
    "footer.admin",
    "Admin access",
    "Accès administrateur",
    "دخول الإدارة"
  ],
  [
    "footer.follow",
    "Follow us",
    "Suivez-nous",
    "تابعنا"
  ],
  [
    "footer.privacyText",
    "Your information stays in this browser. This demo uses localStorage and never sends account or order information to a server.",
    "Vos informations restent dans ce navigateur. Cette démo utilise localStorage et n’envoie aucune donnée de compte ou de commande à un serveur.",
    "تبقى بياناتك في هذا المتصفح. تستخدم هذه النسخة التجريبية التخزين المحلي ولا ترسل بيانات الحساب أو الطلب إلى خادم."
  ],
  [
    "footer.termsText",
    "Store 22 is a demonstration storefront. Checkout is simulated; no real payments or orders are processed.",
    "Store 22 est une boutique de démonstration. Le paiement est simulé ; aucune commande ni transaction réelle n’est effectuée.",
    "ستور 22 متجر تجريبي. إتمام الطلب محاكاة ولا تُنفذ أي عمليات دفع أو طلبات حقيقية."
  ],
  [
    "footer.shippingText",
    "Free shipping on orders over $100 and easy returns within 30 days are illustrative policies for this demo store.",
    "Livraison offerte dès 100 $ et retours sous 30 jours : ces conditions illustrent le fonctionnement de cette boutique de démonstration.",
    "التوصيل المجاني للطلبات فوق 100 دولار والإرجاع خلال 30 يومًا سياسات توضيحية لهذا المتجر التجريبي."
  ],
  [
    "category.menTitle",
    "The men’s collection.",
    "La collection homme.",
    "مجموعة الرجال."
  ],
  [
    "category.womenTitle",
    "The women’s collection.",
    "La collection femme.",
    "مجموعة النساء."
  ],
  [
    "category.kidsTitle",
    "Little feet. Big adventures.",
    "Petits pieds. Grandes aventures.",
    "أقدام صغيرة. مغامرات كبيرة."
  ],
  [
    "category.saleTitle",
    "Good finds. Better prices.",
    "Belles trouvailles. Petits prix.",
    "اختيارات جميلة. أسعار أجمل."
  ],
  [
    "category.menDescription",
    "Everyday essentials with an effortless point of view. Find your next pair.",
    "Des essentiels du quotidien, au style naturel. Trouvez votre prochaine paire.",
    "أساسيات يومية بأناقة بسيطة. اعثر على زوجك القادم."
  ],
  [
    "category.womenDescription",
    "From slow mornings to city evenings. Shoes that move with your day.",
    "Des matins tranquilles aux soirées en ville. Des chaussures qui suivent votre rythme.",
    "من الصباح الهادئ إلى أمسيات المدينة. أحذية تواكب يومك."
  ],
  [
    "category.kidsDescription",
    "Comfortable, playful pairs for every little explorer.",
    "Des paires confortables pour les petits explorateurs.",
    "أحذية مريحة ومرحة لكل مستكشف صغير."
  ],
  [
    "category.saleDescription",
    "Your favorite styles, with a little less on the price tag.",
    "Vos styles préférés, à prix encore plus doux.",
    "تصاميمك المفضلة بأسعار أخف."
  ],
  [
    "category.filters",
    "Filters",
    "Filtres",
    "التصفية"
  ],
  [
    "category.sort",
    "Sort by",
    "Trier par",
    "ترتيب حسب"
  ],
  [
    "category.newest",
    "Newest arrivals",
    "Les plus récentes",
    "الأحدث وصولًا"
  ],
  [
    "category.priceLow",
    "Price: low to high",
    "Prix croissant",
    "السعر: من الأقل للأعلى"
  ],
  [
    "category.priceHigh",
    "Price: high to low",
    "Prix décroissant",
    "السعر: من الأعلى للأقل"
  ],
  [
    "category.clear",
    "Clear filters",
    "Effacer les filtres",
    "مسح الفلاتر"
  ],
  [
    "category.results",
    "{count} shoes",
    "{count} chaussures",
    "{count} أحذية"
  ],
  [
    "category.noResults",
    "No shoes found",
    "Aucune chaussure trouvée",
    "لم نعثر على أحذية"
  ],
  [
    "category.noResultsDescription",
    "Try another size or color, or clear your filters.",
    "Essayez une autre pointure ou couleur, ou effacez les filtres.",
    "جرب مقاسًا أو لونًا آخر، أو امسح الفلاتر."
  ],
  [
    "category.allSizes",
    "All sizes",
    "Toutes les pointures",
    "جميع المقاسات"
  ],
  [
    "category.allColors",
    "All colors",
    "Toutes les couleurs",
    "جميع الألوان"
  ],
  [
    "category.searchPlaceholder",
    "Find your next pair…",
    "Trouvez votre prochaine paire…",
    "ابحث عن زوجك القادم…"
  ],
  [
    "product.addToCart",
    "Add to bag",
    "Ajouter au panier",
    "أضف إلى الحقيبة"
  ],
  [
    "product.description",
    "The details",
    "Les détails",
    "التفاصيل"
  ],
  [
    "product.related",
    "A few more you might like.",
    "Vous aimerez aussi.",
    "قد يعجبك أيضًا."
  ],
  [
    "product.selectSize",
    "Select your size",
    "Choisissez votre pointure",
    "اختر مقاسك"
  ],
  [
    "product.selectColor",
    "Select a color",
    "Choisissez une couleur",
    "اختر لونًا"
  ],
  [
    "product.stock",
    "{count} pairs available",
    "{count} paires disponibles",
    "{count} أزواج متوفرة"
  ],
  [
    "product.outOfStock",
    "Out of stock",
    "Rupture de stock",
    "نفد المخزون"
  ],
  [
    "product.delivery",
    "Free shipping on orders over $100",
    "Livraison offerte dès 100 $",
    "توصيل مجاني للطلبات فوق 100 دولار"
  ],
  [
    "product.returns",
    "Easy returns within 30 days",
    "Retours faciles sous 30 jours",
    "إرجاع سهل خلال 30 يومًا"
  ],
  [
    "product.sizeGuide",
    "Size guide",
    "Guide des pointures",
    "دليل المقاسات"
  ],
  [
    "product.notFound",
    "This pair couldn’t be found.",
    "Cette paire est introuvable.",
    "لم نعثر على هذا الحذاء."
  ],
  [
    "product.notFoundDescription",
    "Explore the collection to find your next favorite.",
    "Découvrez la collection pour trouver votre prochain coup de cœur.",
    "اكتشف المجموعة للعثور على مفضلتك القادمة."
  ],
  [
    "product.chooseSize",
    "Please choose a size.",
    "Veuillez choisir une pointure.",
    "يرجى اختيار المقاس."
  ],
  [
    "product.chooseColor",
    "Please choose a color.",
    "Veuillez choisir une couleur.",
    "يرجى اختيار اللون."
  ],
  [
    "product.sizeLabel",
    "Size · EU",
    "Pointure · EU",
    "المقاس · أوروبي"
  ],
  [
    "product.fit",
    "True to size. Choose your usual fit.",
    "Taille normalement. Choisissez votre pointure habituelle.",
    "مقاس مطابق للمعتاد. اختر مقاسك المعتاد."
  ],
  [
    "product.sizeGuideText",
    "Sizes are shown in EU sizing. Choose your usual size. Between sizes? We recommend sizing up.",
    "Les pointures sont européennes. Choisissez votre pointure habituelle. Entre deux pointures, prenez la plus grande.",
    "المقاسات بالنظام الأوروبي. اختر مقاسك المعتاد. إذا كنت بين مقاسين، اختر الأكبر."
  ],
  [
    "product.increaseQuantity",
    "Increase quantity",
    "Augmenter la quantité",
    "زيادة الكمية"
  ],
  [
    "product.decreaseQuantity",
    "Decrease quantity",
    "Réduire la quantité",
    "تقليل الكمية"
  ],
  [
    "product.care",
    "Care guide",
    "Conseils d’entretien",
    "دليل العناية"
  ],
  [
    "product.careText",
    "Wipe clean with a soft, damp cloth. Air dry away from direct heat.",
    "Nettoyer avec un chiffon doux et humide. Sécher à l’air libre, loin de la chaleur.",
    "امسح بقطعة قماش ناعمة ورطبة. اتركه يجف بعيدًا عن الحرارة."
  ],
  [
    "cart.title",
    "Your shopping bag.",
    "Votre panier.",
    "حقيبة تسوقك."
  ],
  [
    "cart.eyebrow",
    "GOOD CHOICES, ALL TOGETHER",
    "VOS ENVIES RÉUNIES",
    "اختياراتك الجميلة في مكان واحد"
  ],
  [
    "cart.empty",
    "Your next favorite is waiting.",
    "Votre prochain coup de cœur vous attend.",
    "مفضلتك القادمة بانتظارك."
  ],
  [
    "cart.emptyDescription",
    "Your bag is empty. Find a pair that feels like you.",
    "Votre panier est vide. Trouvez une paire qui vous ressemble.",
    "حقيبتك فارغة. اعثر على زوج يعبر عنك."
  ],
  [
    "cart.continueShopping",
    "Continue shopping",
    "Continuer mes achats",
    "متابعة التسوق"
  ],
  [
    "cart.subtotal",
    "Subtotal",
    "Sous-total",
    "المجموع الفرعي"
  ],
  [
    "cart.shipping",
    "Shipping",
    "Livraison",
    "التوصيل"
  ],
  [
    "cart.total",
    "Total",
    "Total",
    "الإجمالي"
  ],
  [
    "cart.checkout",
    "Checkout",
    "Passer commande",
    "إتمام الطلب"
  ],
  [
    "cart.checkoutSuccess",
    "Your demo order is complete. No payment was charged. Thank you for shopping with Store 22!",
    "Votre commande de démonstration est terminée. Aucun paiement n’a été prélevé. Merci de votre visite !",
    "اكتمل طلبك التجريبي. لم يتم تحصيل أي مبلغ. شكرًا لتسوقك من ستور 22!"
  ],
  [
    "cart.remove",
    "Remove",
    "Retirer",
    "إزالة"
  ],
  [
    "cart.added",
    "Added to your bag.",
    "Ajouté à votre panier.",
    "تمت الإضافة إلى حقيبتك."
  ],
  [
    "cart.stockError",
    "The requested quantity is not available.",
    "La quantité demandée n’est pas disponible.",
    "الكمية المطلوبة غير متوفرة."
  ],
  [
    "cart.loginRequired",
    "Log in to add your favorites to your bag.",
    "Connectez-vous pour ajouter vos favoris au panier.",
    "سجل دخولك لإضافة مفضلاتك إلى الحقيبة."
  ],
  [
    "cart.summary",
    "Order summary",
    "Récapitulatif",
    "ملخص الطلب"
  ],
  [
    "cart.demoNote",
    "This is a demo checkout. No payment is required.",
    "Ceci est une commande de démonstration. Aucun paiement n’est demandé.",
    "هذا طلب تجريبي. لا يلزم أي دفع."
  ],
  [
    "cart.removed",
    "Item removed from your bag.",
    "Article retiré du panier.",
    "تمت إزالة المنتج من الحقيبة."
  ],
  [
    "cart.shippingValue",
    "Complimentary in this demo",
    "Offerte dans cette démo",
    "مجاني في هذه النسخة التجريبية"
  ],
  [
    "auth.email",
    "Email address",
    "Adresse e-mail",
    "البريد الإلكتروني"
  ],
  [
    "auth.password",
    "Password",
    "Mot de passe",
    "كلمة المرور"
  ],
  [
    "auth.name",
    "Full name",
    "Nom complet",
    "الاسم الكامل"
  ],
  [
    "auth.confirmPassword",
    "Confirm password",
    "Confirmer le mot de passe",
    "تأكيد كلمة المرور"
  ],
  [
    "auth.loginTitle",
    "Welcome back.",
    "Heureux de vous revoir.",
    "مرحبًا بعودتك."
  ],
  [
    "auth.loginSubtitle",
    "Your next favorite pair is a step away.",
    "Votre prochaine paire préférée est à un pas.",
    "زوجك المفضل القادم على بعد خطوة."
  ],
  [
    "auth.signupTitle",
    "Make yourself at home.",
    "Bienvenue chez vous.",
    "أهلًا بك بيننا."
  ],
  [
    "auth.signupSubtitle",
    "Create an account and find your everyday favorites.",
    "Créez un compte et trouvez vos favoris du quotidien.",
    "أنشئ حسابًا واعثر على مفضلاتك اليومية."
  ],
  [
    "auth.signup",
    "Sign up",
    "S’inscrire",
    "إنشاء حساب"
  ],
  [
    "auth.login",
    "Log in",
    "Se connecter",
    "تسجيل الدخول"
  ],
  [
    "auth.noAccount",
    "New to Store 22?",
    "Nouveau chez Store 22 ?",
    "جديد في ستور 22؟"
  ],
  [
    "auth.haveAccount",
    "Already have an account?",
    "Vous avez déjà un compte ?",
    "لديك حساب بالفعل؟"
  ],
  [
    "auth.signupSuccess",
    "Welcome to Store 22! Your account is ready.",
    "Bienvenue chez Store 22 ! Votre compte est prêt.",
    "أهلًا بك في ستور 22! حسابك جاهز."
  ],
  [
    "auth.loginSuccess",
    "Welcome back!",
    "Heureux de vous revoir !",
    "مرحبًا بعودتك!"
  ],
  [
    "auth.invalidCredentials",
    "The email address or password is incorrect.",
    "L’adresse e-mail ou le mot de passe est incorrect.",
    "البريد الإلكتروني أو كلمة المرور غير صحيحة."
  ],
  [
    "auth.emailExists",
    "An account with this email already exists.",
    "Un compte utilise déjà cette adresse e-mail.",
    "يوجد حساب بهذا البريد الإلكتروني بالفعل."
  ],
  [
    "auth.passwordShort",
    "Your password must contain at least 6 characters.",
    "Votre mot de passe doit contenir au moins 6 caractères.",
    "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل."
  ],
  [
    "auth.passwordMismatch",
    "Your passwords do not match.",
    "Les mots de passe ne correspondent pas.",
    "كلمتا المرور غير متطابقتين."
  ],
  [
    "auth.invalidEmail",
    "Please enter a valid email address.",
    "Veuillez saisir une adresse e-mail valide.",
    "يرجى إدخال بريد إلكتروني صالح."
  ],
  [
    "auth.nameRequired",
    "Please enter a name between 2 and 80 characters.",
    "Veuillez saisir un nom entre 2 et 80 caractères.",
    "يرجى إدخال اسم يتكون من 2 إلى 80 حرفًا."
  ],
  [
    "auth.logoutSuccess",
    "You’ve been logged out.",
    "Vous êtes déconnecté.",
    "تم تسجيل خروجك."
  ],
  [
    "auth.passwordHint",
    "At least 6 characters",
    "Au moins 6 caractères",
    "6 أحرف على الأقل"
  ],
  [
    "auth.forgotNote",
    "Your demo account and session are saved only in this browser.",
    "Votre compte et votre session de démonstration sont enregistrés dans ce navigateur uniquement.",
    "يُحفظ حسابك وجلستك التجريبية في هذا المتصفح فقط."
  ],
  [
    "auth.loginRequired",
    "Please log in to continue.",
    "Veuillez vous connecter pour continuer.",
    "يرجى تسجيل الدخول للمتابعة."
  ],
  [
    "auth.accountReady",
    "Your account is ready. Enjoy the collection.",
    "Votre compte est prêt. Découvrez la collection.",
    "حسابك جاهز. استمتع باكتشاف المجموعة."
  ],
  [
    "auth.unavailable",
    "Open this site on localhost or HTTPS for secure password storage.",
    "Ouvrez le site sur localhost ou en HTTPS pour le stockage sécurisé.",
    "افتح الموقع عبر localhost أو HTTPS للتخزين الآمن."
  ],
  [
    "auth.adminDemoNote",
    "Admin access is stored separately from customer accounts.",
    "L’accès administrateur est indépendant des comptes clients.",
    "يُحفظ دخول الإدارة بشكل منفصل عن حسابات العملاء."
  ],
  [
    "admin.title",
    "Store dashboard.",
    "Tableau de bord.",
    "لوحة إدارة المتجر."
  ],
  [
    "admin.eyebrow",
    "BEHIND THE SCENES",
    "DANS LES COULISSES",
    "خلف الكواليس"
  ],
  [
    "admin.subtitle",
    "Your collection, thoughtfully managed.",
    "Votre collection, gérée avec soin.",
    "مجموعتك، بإدارة مدروسة."
  ],
  [
    "admin.loginTitle",
    "A little behind the scenes.",
    "Un regard en coulisses.",
    "نظرة خلف الكواليس."
  ],
  [
    "admin.loginDescription",
    "Sign in to manage the Store 22 collection.",
    "Connectez-vous pour gérer la collection Store 22.",
    "سجل دخولك لإدارة مجموعة ستور 22."
  ],
  [
    "admin.credentials",
    "Demo admin credentials",
    "Identifiants de démonstration",
    "بيانات دخول الإدارة التجريبية"
  ],
  [
    "admin.login",
    "Sign in as admin",
    "Connexion administrateur",
    "الدخول كمسؤول"
  ],
  [
    "admin.logout",
    "Admin logout",
    "Déconnexion admin",
    "خروج الإدارة"
  ],
  [
    "admin.addShoe",
    "Add shoe",
    "Ajouter une chaussure",
    "إضافة حذاء"
  ],
  [
    "admin.editShoe",
    "Edit shoe",
    "Modifier la chaussure",
    "تعديل الحذاء"
  ],
  [
    "admin.deleteConfirm",
    "Delete “{name}”? This cannot be undone.",
    "Supprimer « {name} » ? Cette action est irréversible.",
    "هل تريد حذف «{name}»؟ لا يمكن التراجع عن هذا الإجراء."
  ],
  [
    "admin.allCategories",
    "All categories",
    "Toutes les catégories",
    "جميع الفئات"
  ],
  [
    "admin.updated",
    "The shoe has been updated.",
    "La chaussure a été modifiée.",
    "تم تحديث الحذاء."
  ],
  [
    "admin.deleted",
    "The shoe has been deleted.",
    "La chaussure a été supprimée.",
    "تم حذف الحذاء."
  ],
  [
    "admin.added",
    "The shoe has been added to your collection.",
    "La chaussure a été ajoutée à votre collection.",
    "تمت إضافة الحذاء إلى مجموعتك."
  ],
  [
    "admin.products",
    "Collection",
    "Collection",
    "المجموعة"
  ],
  [
    "admin.catalog",
    "Your shoe collection",
    "Votre collection de chaussures",
    "مجموعة أحذيتك"
  ],
  [
    "admin.totalStock",
    "Pairs in stock",
    "Paires en stock",
    "الأزواج المتوفرة"
  ],
  [
    "admin.saleProducts",
    "Shoes on sale",
    "Chaussures en solde",
    "الأحذية المخفضة"
  ],
  [
    "admin.searchPlaceholder",
    "Search by name or category…",
    "Rechercher par nom ou catégorie…",
    "ابحث بالاسم أو الفئة…"
  ],
  [
    "admin.noResults",
    "No shoes match your search.",
    "Aucune chaussure ne correspond à votre recherche.",
    "لا توجد أحذية تطابق بحثك."
  ],
  [
    "admin.invalidCredentials",
    "The admin email or password is incorrect.",
    "L’e-mail ou le mot de passe administrateur est incorrect.",
    "بريد الإدارة أو كلمة المرور غير صحيحة."
  ],
  [
    "admin.invalidPrice",
    "Enter a valid price greater than zero.",
    "Saisissez un prix valide supérieur à zéro.",
    "أدخل سعرًا صالحًا أكبر من صفر."
  ],
  [
    "admin.invalidStock",
    "Stock must be a whole number of zero or more.",
    "Le stock doit être un entier positif ou nul.",
    "يجب أن يكون المخزون عددًا صحيحًا يساوي صفرًا أو أكثر."
  ],
  [
    "admin.invalidSizes",
    "Enter valid EU sizes, separated by commas.",
    "Saisissez des pointures EU valides, séparées par des virgules.",
    "أدخل مقاسات أوروبية صالحة، مفصولة بفواصل."
  ],
  [
    "admin.invalidColors",
    "Use black, white, gray, or red, separated by commas.",
    "Utilisez black, white, gray ou red, séparés par des virgules.",
    "استخدم black أو white أو gray أو red مفصولة بفواصل."
  ],
  [
    "admin.invalidName",
    "Please enter a shoe name.",
    "Veuillez saisir un nom de chaussure.",
    "يرجى إدخال اسم الحذاء."
  ],
  [
    "admin.invalidDescription",
    "Please enter a description.",
    "Veuillez saisir une description.",
    "يرجى إدخال وصف."
  ],
  [
    "admin.invalidImage",
    "Enter a valid HTTP or HTTPS image URL.",
    "Saisissez une URL d’image HTTP ou HTTPS valide.",
    "أدخل رابط صورة HTTP أو HTTPS صالحًا."
  ],
  [
    "admin.invalidOriginalPrice",
    "The original price must exceed the current price.",
    "Le prix d’origine doit dépasser le prix actuel.",
    "يجب أن يكون السعر الأصلي أعلى من السعر الحالي."
  ],
  [
    "admin.invalidCategory",
    "Please choose a valid category.",
    "Veuillez choisir une catégorie valide.",
    "يرجى اختيار فئة صالحة."
  ],
  [
    "admin.formHint",
    "Custom product text appears as entered in each language.",
    "Le texte des produits personnalisés s’affiche tel quel dans chaque langue.",
    "يظهر نص المنتج المخصص كما أدخلته في جميع اللغات."
  ],
  [
    "admin.priceHint",
    "Prices in USD. Original price is optional and must be higher.",
    "Prix en USD. Le prix d’origine est facultatif et doit être supérieur.",
    "الأسعار بالدولار. السعر الأصلي اختياري ويجب أن يكون أعلى."
  ],
  [
    "admin.stockHint",
    "A whole number of pairs, starting at zero.",
    "Un nombre entier de paires, à partir de zéro.",
    "عدد صحيح للأزواج، بدءًا من صفر."
  ],
  [
    "admin.sizesHint",
    "Separate EU sizes with commas, e.g. 38, 39, 40.",
    "Séparez les pointures EU par des virgules : 38, 39, 40.",
    "افصل المقاسات بفواصل، مثل 38, 39, 40."
  ],
  [
    "admin.colorsHint",
    "Available values: black, white, gray, red.",
    "Valeurs disponibles : black, white, gray, red.",
    "القيم المتاحة: black, white, gray, red."
  ],
  [
    "admin.imageHint",
    "Use a public HTTP or HTTPS image URL.",
    "Utilisez une URL d’image HTTP ou HTTPS publique.",
    "استخدم رابط صورة HTTP أو HTTPS عامًا."
  ],
  [
    "contact.title",
    "Let’s talk.",
    "Parlons ensemble.",
    "لنتحدث."
  ],
  [
    "contact.eyebrow",
    "WE’RE HERE TO HELP",
    "À VOTRE ÉCOUTE",
    "نحن هنا لمساعدتك"
  ],
  [
    "contact.intro",
    "A question about your next pair? A little feedback? We’d love to hear from you.",
    "Une question sur votre prochaine paire ? Une suggestion ? Nous serions ravis de vous lire.",
    "لديك سؤال عن حذائك القادم؟ أو اقتراح؟ يسعدنا الاستماع إليك."
  ],
  [
    "contact.name",
    "Full name",
    "Nom complet",
    "الاسم الكامل"
  ],
  [
    "contact.email",
    "Email address",
    "Adresse e-mail",
    "البريد الإلكتروني"
  ],
  [
    "contact.message",
    "Your message",
    "Votre message",
    "رسالتك"
  ],
  [
    "contact.send",
    "Send message",
    "Envoyer le message",
    "إرسال الرسالة"
  ],
  [
    "contact.success",
    "Your demo message has been saved in this browser. No email was sent. Thank you!",
    "Votre message de démonstration est enregistré dans ce navigateur. Aucun e-mail n’a été envoyé. Merci !",
    "حُفظت رسالتك التجريبية في هذا المتصفح. لم يُرسل بريد إلكتروني. شكرًا لك!"
  ],
  [
    "contact.storeTitle",
    "Find us in Casablanca.",
    "Retrouvez-nous à Casablanca.",
    "تجدنا في الدار البيضاء."
  ],
  [
    "contact.address",
    "22 Boulevard Anfa, Casablanca, Morocco",
    "22 boulevard Anfa, Casablanca, Maroc",
    "22 شارع أنفا، الدار البيضاء، المغرب"
  ],
  [
    "contact.phone",
    "Call us",
    "Appelez-nous",
    "اتصل بنا"
  ],
  [
    "contact.emailLabel",
    "Email us",
    "Écrivez-nous",
    "راسلنا"
  ],
  [
    "contact.hoursLabel",
    "Opening hours",
    "Horaires d’ouverture",
    "ساعات العمل"
  ],
  [
    "contact.hours",
    "Monday–Saturday · 10:00–20:00",
    "Lundi–samedi · 10 h–20 h",
    "الاثنين–السبت · 10:00–20:00"
  ],
  [
    "contact.note",
    "Illustrative store details. This demo saves messages locally; no email is sent.",
    "Coordonnées fictives. Cette démo enregistre les messages localement ; aucun e-mail n’est envoyé.",
    "بيانات متجر توضيحية. تحفظ هذه النسخة الرسائل محليًا ولا ترسل بريدًا."
  ],
  [
    "contact.invalidMessage",
    "Enter a message of at least 10 characters.",
    "Saisissez un message d’au moins 10 caractères.",
    "أدخل رسالة من 10 أحرف على الأقل."
  ],
  [
    "colors.black",
    "Black",
    "Noir",
    "أسود"
  ],
  [
    "colors.white",
    "White",
    "Blanc",
    "أبيض"
  ],
  [
    "colors.gray",
    "Gray",
    "Gris",
    "رمادي"
  ],
  [
    "colors.red",
    "Red",
    "Rouge",
    "أحمر"
  ],
  [
    "errors.required",
    "Please complete all required fields.",
    "Veuillez remplir tous les champs obligatoires.",
    "يرجى إكمال جميع الحقول المطلوبة."
  ],
  [
    "errors.number",
    "Please enter a valid number.",
    "Veuillez saisir un nombre valide.",
    "يرجى إدخال رقم صالح."
  ],
  [
    "errors.storage",
    "Your browser could not save this change. Free up storage and try again.",
    "Votre navigateur n’a pas pu enregistrer cette modification. Libérez de l’espace et réessayez.",
    "تعذر حفظ التغيير. وفر مساحة تخزين وحاول مجددًا."
  ],
  [
    "errors.notFound",
    "This item could not be found.",
    "Cet article est introuvable.",
    "تعذر العثور على هذا المنتج."
  ],
  [
    "errors.invalidQuantity",
    "Please choose a valid quantity.",
    "Veuillez choisir une quantité valide.",
    "يرجى اختيار كمية صالحة."
  ],
  [
    "errors.invalidSize",
    "Please choose an available size.",
    "Veuillez choisir une pointure disponible.",
    "يرجى اختيار مقاس متوفر."
  ],
  [
    "errors.invalidColor",
    "Please choose an available color.",
    "Veuillez choisir une couleur disponible.",
    "يرجى اختيار لون متوفر."
  ]
];
const aliases = {
  "common.backHome": "common.goHome",
  "common.continueShopping": "cart.continueShopping",
  "common.subtotal": "cart.subtotal",
  "common.total": "cart.total",
  "categories.men": "nav.men",
  "categories.women": "nav.women",
  "categories.kids": "nav.kids",
  "categories.sale": "nav.sale",
  "cart.emptyTitle": "cart.empty",
  "cart.items": "common.items",
  "cart.unavailable": "common.unavailable",
  "cart.invalidQuantity": "errors.invalidQuantity",
  "cart.invalidSize": "errors.invalidSize",
  "cart.invalidColor": "errors.invalidColor",
  "cart.itemNotFound": "errors.notFound",
  "auth.adminLoginTitle": "admin.loginTitle",
  "auth.adminLoginSubtitle": "admin.loginDescription",
  "auth.adminLogin": "admin.login",
  "auth.adminCredentials": "admin.credentials",
  "auth.adminInvalidCredentials": "admin.invalidCredentials",
  "validation.required": "errors.required",
  "validation.email": "auth.invalidEmail",
  "validation.password": "auth.passwordShort",
  "validation.name": "auth.nameRequired",
  "validation.quantity": "errors.invalidQuantity",
  "validation.number": "errors.number",
  "validation.image": "admin.invalidImage",
  "validation.sizes": "admin.invalidSizes",
  "validation.colors": "admin.invalidColors",
  "validation.price": "admin.invalidPrice",
  "validation.originalPrice": "admin.invalidOriginalPrice",
  "validation.message": "contact.invalidMessage",
  "storage.unavailable": "errors.storage",
  "shoes.invalidName": "admin.invalidName",
  "shoes.invalidDescription": "admin.invalidDescription",
  "shoes.invalidPrice": "admin.invalidPrice",
  "shoes.invalidOriginalPrice": "admin.invalidOriginalPrice",
  "shoes.invalidCategory": "admin.invalidCategory",
  "shoes.invalidSizes": "admin.invalidSizes",
  "shoes.invalidColors": "admin.invalidColors",
  "shoes.invalidStock": "admin.invalidStock",
  "shoes.invalidImage": "admin.invalidImage",
  "shoes.notFound": "errors.notFound"
};
export function makeLocale(column) {
  const dictionary = Object.fromEntries(messages.map(([key,...values]) => [key,values[column] ?? values[0]]));
  for (const [key,source] of Object.entries(aliases)) dictionary[key] = dictionary[source];
  return dictionary;
}
export default makeLocale(0);

