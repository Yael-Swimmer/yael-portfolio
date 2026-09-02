// כדי להוסיף איור חדש לחנות - פשוט הוסיפי אובייקט נוסף למערך הזה ושמרי את הקובץ.
// images: מערך של שם/שמות קובץ מתוך תיקיית shop/images. תמונה אחת = בלי קרוסלה.
//         כמה תמונות (למשל האיור + הדמיה בבית) = יופיעו נקודות קטנות למעבר ביניהן.
// categories: מערך של קטגוריות שהאיור מופיע בהן - "home", "kids", "sukkah" ו/או "cards" (אפשר יותר מאחת, למשל ["home", "kids"])
// sizes: מערך של גדלים - כל גודל עם מחיר. למוצרי "sukkah" מספיק גודל אחד במערך - האתר לא יציג בחירת גודל עבורם.
// כפתור "לרכישה" פותח וואטסאפ עם הודעה מוכנה מראש (המספר מוגדר ב-script.js).

const PRODUCTS = [
  {
    id: "icecream-heart",
    title: "גלידה עם לב",
    categories: ["home", "kids"],
    images: ["images/product-icecream-heart.png", "images/product-icecream-heart-real.jpg"],
    description: "איור עדין של גביע גלידה ורוד עם לב קטן, על רקע ירוק רך. הדפס איכותי המתאים לכל פינה בבית.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "icecream-set",
    title: "סט גלידות קיץ",
    categories: ["home", "kids"],
    images: ["images/product-icecream-set.png", { src: "images/product-icecream-set-real.jpg", position: "top" }],
    description: "תשע גלידות בטעמים וצבעים שונים, סידור נקי ומשעשע על רקע אפרסק. מושלם לחדר ילדים או למטבח.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "window-lemons",
    title: "החלון הירוק",
    categories: ["home"],
    images: ["images/product-window-lemons.png", { src: "images/product-window-lemons-real.jpg", position: "top" }],
    description: "סצנת חלון חמה עם עציץ לימונים, קקטוס ותמונה קטנה על הקיר - איור המזמין רוגע הביתה.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "paper-boat",
    title: "סירת נייר",
    categories: ["home", "kids"],
    images: ["images/product-paper-boat.png", "images/product-paper-boat-real.jpg"],
    description: "סירת נייר מפליגה בים בגווני מנטה, עם עוגן בצורת לב. איור רגוע ונוסטלגי.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "yellow-boots",
    title: "מגפי הגשם הצהובים",
    categories: ["home", "kids"],
    images: ["images/product-yellow-boots.png", { src: "images/product-yellow-boots-real.jpg", position: "top" }],
    description: "ילדה צועדת במגפי גשם צהובים וכובע ורוד. איור מלא תנועה וחמימות.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "lavender",
    title: "זר לבנדר",
    categories: ["home"],
    images: ["images/product-lavender.png", { src: "images/product-lavender-real.jpg", position: "top" }],
    description: "זר לבנדר סרוג בסרט טורקיז, איור בוטני עדין על רקע אפרסק בהיר.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "wildflowers-vase",
    title: "פרחי בר באגרטל מנוקד",
    categories: ["home"],
    images: ["images/product-wildflowers-vase.png", { src: "images/product-wildflowers-vase-real.jpg", position: "top" }],
    description: "אגרטל קרמי מנוקד עם פרחי בר עדינים, על רקע צהוב רך. איור בוטני שקט ואלגנטי.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "daisies-vase",
    title: "חרצית ואגרטל קרם",
    categories: ["home"],
    images: ["images/product-daisies-vase.png", "images/product-daisies-vase-real.jpg"],
    description: "אגרטל קרמי עגלגל עם זר חרציות לבנות ופרחי בר, על רקע מנטה רגוע.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "mint-coat-girl",
    title: "מעיל מנטה",
    categories: ["home", "kids"],
    images: ["images/product-mint-coat-mockup.jpg?v=2", "images/product-mint-coat-girl.png"],
    description: "איור עדין בגווני מנטה ופסטל, דמות ילדה במעיל עם עניבת פרפר. מושלם לחדר ילדים.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "girl-flower-boat",
    title: "ילדה עם פרח וסירת נייר",
    categories: ["home", "kids"],
    images: ["images/product-girl-flower-boat.jpg"],
    description: "פורטרט עדין של ילדה עם זר פרחים בשיער וסירת נייר עם דגל לב, בגווני אלמוג וקורל.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "yeshena-velibi-er",
    title: "ישנה ולבי ער",
    categories: ["home"],
    images: ["images/product-yeshena-velibi-er.jpg"],
    description: "פורטרט עם זר פרחים והכיתוב \"ישנה ולבי ער\" (שיר השירים), בגווני צהוב ואפרסק.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "alefbet-poster",
    title: "פוסטר אלף-בית",
    categories: ["home", "kids"],
    images: ["images/product-alefbet-poster.jpg", { src: "images/product-alefbet-poster-real.jpg", position: "top" }],
    description: "פוסטר אלף-בית מאויר לחדר ילדים, כל אות מלווה במילה ואיור צבעוני.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "strawberry",
    title: "ענף תותי שדה",
    categories: ["home"],
    images: ["images/product-strawberry.jpg"],
    description: "איור בוטני של ענף תותי שדה במסגרת עדינה בגווני אפרסק וורוד.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "beach-chair",
    title: "כיסא חוף ושמשייה",
    categories: ["home"],
    images: ["images/product-beach-chair.jpg"],
    description: "כיסא נוח ושמשיית פסים תחת שמיים ירוקים רכים - איור קיצי ורגוע.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "tulips-bouquet",
    title: "זר צבעונים",
    categories: ["home"],
    images: ["images/product-tulips-bouquet.jpg"],
    description: "זר צבעונים עטוף בנייר מנוקד, איור רך בגווני אדום וירוק.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "pink-window",
    title: "החלון הוורוד",
    categories: ["home"],
    images: ["images/product-pink-window.jpg", { src: "images/product-pink-window-real.jpg", position: "top" }],
    description: "סצנת חלון ורוד עם לבנדר, אגרטל פרחים וספל תה - איור המזמין רוגע הביתה.",
    sizes: [
      { label: "A4", price: 89 },
      { label: "A3", price: 120 }
    ]
  },
  {
    id: "sukkah-arbaat-haminim",
    title: "ארבעת המינים",
    categories: ["sukkah"],
    images: ["images/product-sukkah-arbaat-haminim.jpg"],
    description: "פוסטר \"ושמחת בחגך\" עם איור ארבעת המינים במסגרת עדינה בגווני ירוק וזהב.",
    sizes: [
      { label: "A3", price: 112 }
    ]
  },
  {
    id: "sukkah-zman-simchateinu",
    title: "זמן שמחתנו",
    categories: ["sukkah"],
    images: ["images/product-sukkah-zman-simchateinu.jpg"],
    description: "פוסטר עדין ומינימלי עם הכיתוב \"זמן שמחתנו\", מסגרת פרחונית בגווני ירוק ורוד.",
    sizes: [
      { label: "A3", price: 112 }
    ]
  },
  {
    id: "sukkah-shivat-haminim",
    title: "שבעת המינים",
    categories: ["sukkah"],
    images: ["images/product-sukkah-shivat-haminim.jpg"],
    description: "פוסטר שבעת המינים עם פסוק מספר דברים, מאויר בקווי מתאר עדינים וצבעי מים.",
    sizes: [
      { label: "A3", price: 112 }
    ]
  },
  {
    id: "sukkah-vahareikoti",
    title: "והריקתי לכם ברכה",
    categories: ["sukkah"],
    images: ["images/product-sukkah-vahareikoti.png"],
    description: "פוסטר עם הפסוק \"והריקתי לכם ברכה עד בלי די\" (מלאכי ג', י'), במסגרת פרחונית בגווני ורוד.",
    sizes: [
      { label: "A3", price: 112 }
    ]
  },
  {
    id: "card-window",
    title: "החלון הירוק",
    categories: ["cards"],
    images: ["images/product-card-window.jpg"],
    description: "כרטיס ברכה עם סצנת חלון חמה - מתנה קטנה ואישית לחג הקרוב או לאדם אהוב.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-lavender",
    title: "זר לבנדר",
    categories: ["cards"],
    images: ["images/product-card-lavender.jpg"],
    description: "כרטיס ברכה עם זר לבנדר עדין - מושלם לסבתא, אחות או חברה טובה.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-sunglasses",
    title: "טיול בשמש",
    categories: ["cards"],
    images: ["images/product-card-sunglasses.jpg"],
    description: "כרטיס ברכה עם ילדה במשקפי שמש ושמלה צהובה - פינוק קטן וצבעוני לדרך.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-flowers-walk",
    title: "זר פרחים בדרך",
    categories: ["cards"],
    images: ["images/product-card-flowers-walk.jpg"],
    description: "כרטיס ברכה עם דמות הולכת עם זר פרחים גדול - מתנה חמה למישהי שאוהבים.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-yeshena",
    title: "ישנה ולבי ער",
    categories: ["cards"],
    images: ["images/product-card-yeshena.jpg"],
    description: "כרטיס ברכה עם דיוקן וזר פרחים והפסוק \"ישנה ולבי ער\" משיר השירים.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-yellow-boots",
    title: "מגפי הגשם הצהובים",
    categories: ["cards"],
    images: ["images/product-card-yellow-boots.jpg"],
    description: "כרטיס ברכה עם ילדה צועדת במגפי גשם צהובים - חמימות קטנה לכל מזג אוויר.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-chag-sameach",
    title: "חג שמח",
    categories: ["cards"],
    images: ["images/product-card-chag-sameach.jpg"],
    description: "כרטיס ברכה כללי לחג עם ספלי תה צבעוניים והכיתוב \"חג שמח\".",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-beach-chair",
    title: "כיסא חוף ושמשייה",
    categories: ["cards"],
    images: ["images/product-card-beach-chair.jpg"],
    description: "כרטיס ברכה עם סקיצת כיסא חוף ושמשייה - לברכה קלילה ורגועה.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-paper-boat",
    title: "סירת נייר",
    categories: ["cards"],
    images: ["images/product-card-paper-boat.jpg"],
    description: "כרטיס ברכה עם דיוקן ילדה וסירת נייר - מתנה קטנה ומיוחדת.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-lemons",
    title: "הדפס לימונים",
    categories: ["cards"],
    images: ["images/product-card-lemons.jpg"],
    description: "כרטיס ברכה עם הדפס לימונים צהוב ושמח - מתאים לכל אירוע.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "card-icecream-heart",
    title: "גלידה עם לב",
    categories: ["cards"],
    images: ["images/product-card-icecream-heart.jpg"],
    description: "כרטיס ברכה עם גביע גלידה ולב קטן - פינוק מתוק לכל אחת שאוהבים.",
    sizes: [
      { label: "כרטיס ברכה", price: 18 }
    ]
  },
  {
    id: "cup-a",
    title: "ופשוטים הדברים",
    categories: ["cups"],
    images: [
      "images/cup-a-1.jpg",
      { src: "videos/cup-A_2.mp4", type: "video" }
    ],
    description: "ספל אמייל עם איור ילדים הולכים והכיתוב \"ופשוטים הדברים\". לשטיפה ידנית בלבד, לא במדיח.",
    sizes: [
      { label: "ספל", price: 79 }
    ]
  },
  {
    id: "cup-b",
    title: "לשמור ולאהוב",
    categories: ["cups"],
    images: [
      "images/cup-b-1.jpg",
      "images/cup-b-2.jpg",
      { src: "videos/cup-B_3.mp4", type: "video" }
    ],
    description: "ספל אמייל עם איור סירת נייר ולב, וכיתוב עדין על שמירה ואהבה. לשטיפה ידנית בלבד, לא במדיח.",
    sizes: [
      { label: "ספל", price: 79 }
    ]
  },
  {
    id: "cup-c",
    title: "רק מה שאת אוהבת",
    categories: ["cups"],
    images: [
      "images/cup-c-1.jpg",
      "images/cup-c-2.jpg",
      { src: "videos/cup-C_3.mp4", type: "video" }
    ],
    description: "ספל אמייל עם סקיצת כיסא חוף ושמשייה והכיתוב \"רק מה שאת אוהבת\". לשטיפה ידנית בלבד, לא במדיח.",
    sizes: [
      { label: "ספל", price: 79 }
    ]
  },
  {
    id: "cup-d",
    title: "המלכה של העולם",
    categories: ["cups"],
    images: [
      "images/cup-d-1.jpg",
      { src: "videos/cup-D_2.mp4", type: "video" }
    ],
    description: "ספל אמייל עם איור זר פרחים והכיתוב \"המלכה של העולם\" - מושלם גם לשתייה קרה וגם כעציץ קטן. לשטיפה ידנית בלבד, לא במדיח.",
    sizes: [
      { label: "ספל", price: 79 }
    ]
  }
];
