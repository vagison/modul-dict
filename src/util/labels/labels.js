const appLabels = {
  ENG: {
    title: "Modul Technical Dictionary",
    logoutError: "There was a problem during signing out!",
  },
  ARM: {
    title: "Մոդուլ տեխնիկական բառարան",
    logoutError: "Ելք կատարելու ընթացքում առաջացել է խնդիր:",
  },
};

const aboutUsLabels = {
  ENG: {
    aboutUsTitle: "About us",
    aboutUsContent:
      '"MODUL" LLC was founded in 2015 as an independent consulting engineering company. The company carries out investigation and design of construction projects, independent expertise of design documents, technical supervision over construction works, consulting services and project management in accordance with the RA legislation, international contracts (FIDIC) and guidelines.',
    aboutProjectTitle: "About dictionary",
    aboutProjectContent: "This English-Armenian / Armenian-English online technical dictionary includes more than 5000 entries (including: words, phrases and abbreviations) that are widely used in various technical fields. The database is created based on our company's years of experience in the field of technical documentation and translation.",
  },
  ARM: {
    aboutUsTitle: "Մեր մասին",
    aboutUsContent:
      "«Մոդուլ» ՍՊ Ընկերությունը հիմնադրվել է 2015 թվականին որպես անկախ ինժեներախորհրդատվական կազմակերպություն: Ընկերությունն իրականացնում է շինարարական աշխատանքների ծրագրերի ուսումնասիրություն և նախագծում, նախագծային փաստաթղթերի անկախ փորձաքննություն, շինարարական աշխատանքների որակի տեխնիկական հսկողություն, խորհրդատվական ծառայություներ և ծրագրերի կառավարում` ՀՀ օրենսդրության, միջազգային պայմանագրերի (FIDIC) և ուղեցույցների պահանջների համաձայն:",
    aboutProjectTitle: "Բառարանի մասին",
    aboutProjectContent:
      "Անգլերեն-հայերեն / հայերեն-անգլերեն առցանց այս բառարանը ներառում է տեխնիկական մի շարք ոլորտների ավելի քան 5000 բառ, բառակապակցություն և հապավում։ Բազայի ձևավորման հիմքում ընկած է մեր ընկերության տարիների փորձը տեխնիկական փաստաթղթերի կազմման ու թարգմանության ոլորտներում։",
  },
};

const addTranslationLabels = {
  ENG: {
    title: "Add a translation",
    englishWord: "English word",
    armenianWord: "Armenian word",
    partOfSpeech: "Part of Speech",
    englishArmenianQuality: "English to Armenian quality",
    armenianEnglishQuality: "Armenian to English quality",
    fields: "Fields",
    pronunciation: "Pronunciation",
    englishAbbreviation: "English Abbreviation",
    armenianAbbreviation: "Armenian Abbreviation",
    addExamples: "add examples",
    registerTranslation: "Register",
    englishExampleNo: "English example No. ",
    armenianExampleNo: "Armenian example No. ",
    incorrectUser: `
      Please log-in before editing any data!
      `,
    existingWord: `
      The translation you are about to register is already present 
      in the database.
      Please modify the existing one, or register another translation!
      `,
    incorrectData: `
      The translation you are about to register has some inaccuracies.
      Please fill the registration form properly!
      `,
  },
  ARM: {
    title: "Ավելացնել թարգմանություն",
    englishWord: "Անգլերեն բառ",
    armenianWord: "Հայերեն բառ",
    partOfSpeech: "Խոսքի մաս",
    englishArmenianQuality: "Անգլերեն - Հայերեն որակ",
    armenianEnglishQuality: "Հայերեն - Անգլերեն որակ",
    fields: "Ոլորտներ",
    pronunciation: "Արտասանություն",
    englishAbbreviation: "Անգլերեն հապավում",
    armenianAbbreviation: "Հայերեն հապավում",
    addExamples: "ավելացնել օրինակներ",
    registerTranslation: "Գրանցել",
    englishExampleNo: "Անգլերեն օրինակ No. ",
    armenianExampleNo: "Հայերեն օրինակ No. ",
    incorrectUser: `
      Տվյալները փոփոխելու համար խնդրում ենք մուտք 
      գործել համակարգ։
      `,
    existingWord: `
      Գրանցվող թարգմանությունն արդեն առկա է բազայում։
      Խնդրում ենք ձևափոխել առկա տարբերակը, կամ գրանցել 
      նոր թարգմանություն:
      `,
    incorrectData: `
      Գրանցվող թարգմանությունն ունի թերի լրացված դաշտեր։
      Խնդրում ենք ուղղել թերությունները, այնուհետև 
      անցնել գրանցմանը։
      `,
  },
};

const editTranslationLabels = {
  ENG: {
    title: "Edit translation",
    englishWord: "English word",
    armenianWord: "Armenian word",
    partOfSpeech: "Part of Speech",
    englishArmenianQuality: "English to Armenian quality",
    armenianEnglishQuality: "Armenian to English quality",
    fields: "Fields",
    pronunciation: "Pronunciation",
    englishAbbreviation: "English Abbreviation",
    armenianAbbreviation: "Armenian Abbreviation",
    englishExampleNo: "English example No. ",
    armenianExampleNo: "Armenian example No. ",
    addExamples: "add examples",
    resetFields: "Reset fields",
    updateTranslation: "Update",
    incorrectUser: `
        Please log-in before editing any data!
        `,
    existingWord: `
        The resulting translation that would be after updating is already 
        present in the database.
        Please modify the existing one, or update differently!
        `,
    incorrectData: `
        The translation you are about to register has some inaccuracies.
        Please fill the registration form properly!
        `,
  },
  ARM: {
    title: "Խմբագրել թարգմանությունը",
    englishWord: "Անգլերեն բառ",
    armenianWord: "Հայերեն բառ",
    partOfSpeech: "Խոսքի մաս",
    englishArmenianQuality: "Անգլերեն - Հայերեն որակ",
    armenianEnglishQuality: "Հայերեն - Անգլերեն որակ",
    fields: "Ոլորտներ",
    pronunciation: "Արտասանություն",
    englishAbbreviation: "Անգլերեն հապավում",
    armenianAbbreviation: "Հայերեն հապավում",
    englishExampleNo: "Անգլերեն օրինակ No. ",
    armenianExampleNo: "Հայերեն օրինակ No. ",
    addExamples: "ավելացնել օրինակներ",
    resetFields: "Վերականգնել դաշտերը",
    updateTranslation: "Թարմացնել",
    incorrectUser: `
        Տվյալները փոփոխելու համար խնդրում ենք մուտք 
        գործել համակարգ։
        `,
    existingWord: `
        Գրանցվող թարգմանությունն արդեն առկա է բազայում։
        Խնդրում ենք ձևափոխել առկա տարբերակը, կամ ավելացնել 
        այլ փոփոխություն:
        `,
    incorrectData: `
        Գրանցվող թարգմանությունն ունի թերի լրացված դաշտեր։
        Խնդրում ենք ուղղել թերությունները, այնուհետև 
        անցնել գրանցմանը։
        `,
  },
};

const navigationLabels = {
  ENG: {
    searchTranslation: "Search a word",
    addATranslation: "Add a translation",
    aboutUs: "About dictionary",
    logIn: "Sign in",
    logOut: "Sign out",
    // editWord: "Edit a word",
  },
  ARM: {
    searchTranslation: "Փնտրել բառ",
    addATranslation: "Ավելացնել թարգմանություն",
    aboutUs: "Բառարանի մասին",
    logIn: "Մուտք",
    logOut: "Ելք",
    // editWord: "Խմբագրել բառը",
  },
};

const searchLabels = {
  ENG: {
    title: "Search word",
    searchPlaceholder: "please type here...",
  },
  ARM: {
    title: "Որոնել բառը",
    searchPlaceholder: "մուտքագրել այստեղ․․․",
  },
};

const signInLabels = {
  ENG: {
    title: "Sign In",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    error: "There was a problem during signing in!",
  },
  ARM: {
    title: "Մուտք",
    email: "Էլ․ փոստ",
    password: "Գաղտնաբառ",
    signIn: "Մուտք",
    error: "Մուտք կատարելու ընթացքում առաջացել է խնդիր:",
  },
};

const posLabels = {
  ENG: {
    1: "noun",
    2: "verb",
    3: "adverb",
    4: "adjective",
  },
  ARM: {
    1: "գոյական",
    2: "բայ",
    3: "մակբայ",
    4: "ածական",
  },
};

const fieldLabels = {
  ENG: {
    1: "general",
    2: "structural engineering",
    3: "mechanical engineering",
    4: "electrical engineering",
  },
  ARM: {
    1: "ընդհանուր",
    2: "կառուց․",
    3: "մեխ․",
    4: "էլ․",
  },
};

const translationsLabels = {
  ENG: {
    translations: "Results",
    partOfSpeech: "Part of Speech: ",
    english: "English: ",
    englishAbbreviation: "English Abbreviation: ",
    armenian: "Armenian: ",
    armenianAbbreviation: "Armenian Abbreviation: ",
    quality: "Quality: ",
    // englishArmenianQuality: "English - Armenian quality: ",
    // armenianEnglishQuality: "Armenian - English quality: ",
    fields: "Fields: ",
    pronunciation: "Pronunciation: ",
    examples: "Examples/definitions: ",
    editTranslation: "Edit",
    incorrectUser: `
      Please log-in before editing any data!
      `,
    deleteTranslation: "Delete",
    deletingError: `
      There was an error during deletion, please try again!
      `,
  },
  ARM: {
    translations: "Արդյունքներ",
    partOfSpeech: "Խոսքի մաս` ",
    english: "Անգլերեն՝ ",
    englishAbbreviation: "Անգլերեն հապավում` ",
    armenian: "Հայերեն` ",
    armenianAbbreviation: "Հայերեն հապավում` ",
    quality: "Որակ՝ ",
    // englishArmenianQuality: "Անգլերեն - Հայերեն որակ՝ ",
    // armenianEnglishQuality: "Հայերեն - Անգլերեն որակ՝ ",
    fields: "Ոլորտներ՝ ",
    pronunciation: "Արտասանություն՝ ",
    examples: "Օրինակներ/սահմանումներ․ ",
    editTranslation: "Խմբագրել",
    deleteTranslation: "Ջնջել",
    incorrectUser: `
      Տվյալները փոփոխելու համար խնդրում ենք մուտք 
      գործել համակարգ։
      `,
    deletingError: `
      Թարգմանությունը ջնջելու ընթացքում առաջացել է խնդիր,
      խնդրում ենք կրկին փորձել:`,
  },
};

const footerLabels = {
  ENG: {
    organization: '"Modul" LLC ',
    rights: "All Rights Reserved",
  },
  ARM: {
    organization: '"Մոդուլ" ՍՊԸ ',
    rights: "Բոլոր իրավունքները պահպանված են",
  },
};

export {
  posLabels,
  fieldLabels,
  appLabels,
  aboutUsLabels,
  addTranslationLabels,
  editTranslationLabels,
  navigationLabels,
  searchLabels,
  signInLabels,
  translationsLabels,
  footerLabels,
};
