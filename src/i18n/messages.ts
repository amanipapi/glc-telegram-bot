const VERSE_REF = "2 Corinthians 3:18";

export type Lang = "am" | "en" | "om" | "ti";

export const verseText: Record<Lang, string> = {
  am: `📖 ${VERSE_REF}\n“እኛ ግን ሁላችን ፊታችን ተገልጦ የጌታን ክብር እንደ መስታወት እያየን…”`,
  en: `📖 ${VERSE_REF}\n“And we all, with unveiled face, beholding the glory of the Lord…”`,
  om: `📖 ${VERSE_REF}`,
  ti: `📖 ${VERSE_REF}`,
};

export const M: Record<Lang, any> = {
  am: {
    welcome: "እንኳን ወደ ግሎሪየስ ላይፍ ቸርች (GLC) በደህና መጡ!",
    pickLang: "ቋንቋ ይምረጡ:",
    mainMenu: "ዋና ሜኑ",
    foundationMenu: "Foundation Classes",
    enterQA: "✅ ወደ Foundation Q&A ገብተዋል። ጥያቄዎን ጻፉ።",
    exitQA: "✅ ከ Foundation Q&A ወጥተዋል።",
    prayerPrompt: "🙏 የጸሎት ጥያቄዎን እባክዎ ይጻፉ።",
    prayerSaved: "✅ የጸሎት ጥያቄዎ ተመዝግቧል። እግዚአብሔር ይባርክዎ።",
    onlyFoundation: "ከFoundation 1 & 2 መማሪያ ብቻ ልመልስ እችላለሁ።",
    back: "⬅ መመለስ",
    exit: "🚪 ውጣ",
  },
  en: {
    welcome: "Welcome to Glorious Life Church (GLC)!",
    pickLang: "Choose a language:",
    mainMenu: "Main Menu",
    foundationMenu: "Foundation Classes",
    enterQA: "✅ You are now in Foundation Q&A mode. Ask your question.",
    exitQA: "✅ You exited Foundation Q&A mode.",
    prayerPrompt: "🙏 Please type your prayer request.",
    prayerSaved: "✅ Your prayer request was saved. God bless you.",
    onlyFoundation: "I can only answer questions from Foundation 1 & 2 materials.",
    back: "⬅ Back",
    exit: "🚪 Exit",
  },
  om: {
    welcome: "Baga nagaan gara Glorious Life Church (GLC) dhuftan!",
    pickLang: "Afaan filadhaa:",
    mainMenu: "Main Menu",
    foundationMenu: "Foundation Classes",
    enterQA: "✅ Foundation Q&A keessa seente. Gaaffii kee barreessi.",
    exitQA: "✅ Foundation Q&A keessaa baate.",
    prayerPrompt: "🙏 Gaaffii kadhannaa kee barreessi.",
    prayerSaved: "✅ Gaaffiin kadhannaa kee galmaa’eera.",
    onlyFoundation: "Foundation 1 & 2 keessaa qofa deebisa.",
    back: "⬅ Back",
    exit: "🚪 Exit",
  },
  ti: {
    welcome: "እንቋዕ ናብ Glorious Life Church (GLC) ብደሓን መፃእኩም!",
    pickLang: "ቋንቋ ምረፅ:",
    mainMenu: "Main Menu",
    foundationMenu: "Foundation Classes",
    enterQA: "✅ ናብ Foundation Q&A ኣቲኻ/ኺ። ሕቶኻ ስደድ።",
    exitQA: "✅ ካብ Foundation Q&A ወፂኻ/ኺ።",
    prayerPrompt: "🙏 ጸሎት ልመናኻ ጻፍ።",
    prayerSaved: "✅ ጸሎት ልመናኻ ተመዝጊቡ ኣሎ።",
    onlyFoundation: "ካብ Foundation 1 & 2 ጥራይ እመልስ።",
    back: "⬅ Back",
    exit: "🚪 Exit",
  },
};
