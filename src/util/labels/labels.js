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
    aboutProjectContent:
      "This English-Armenian / Armenian-English online technical dictionary includes more than 5000 entities (including: words, phrases and abbreviations) that are widely used in various technical fields. The database is created based on our company's years of experience in the field of technical documentation and translation.",
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
    englishAbbreviation: "English abbreviation",
    armenianAbbreviation: "Armenian abbreviation ",
    addExamples: "add an example",
    englishExampleNo: "English example No. ",
    armenianExampleNo: "Armenian example No. ",
    addDefinitions: "add a definition",
    englishDefinitionNo: "English definition No. ",
    armenianDefinitionNo: "Armenian definition No. ",
    registerTranslation: "Register",
    incorrectUser: `
      Please log-in before editing any data!
      `,
    existingTranslation: `
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
    addExamples: "ավելացնել օրինակ",
    englishExampleNo: "Անգլերեն օրինակ No. ",
    armenianExampleNo: "Հայերեն օրինակ No. ",
    addDefinitions: "ավելացնել սահմանում",
    englishDefinitionNo: "Անգլերեն սահմանում No. ",
    armenianDefinitionNo: "Հայերեն սահմանում No. ",
    registerTranslation: "Գրանցել",
    incorrectUser: `
      Տվյալները փոփոխելու համար խնդրում ենք մուտք 
      գործել համակարգ։
      `,
    existingTranslation: `
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
    title: "Edit the translation",
    englishWord: "English word",
    armenianWord: "Armenian word",
    partOfSpeech: "Part of Speech",
    englishArmenianQuality: "English to Armenian quality",
    armenianEnglishQuality: "Armenian to English quality",
    fields: "Fields",
    pronunciation: "Pronunciation",
    englishAbbreviation: "English abbreviation",
    armenianAbbreviation: "Armenian abbreviation",
    englishExampleNo: "English example No. ",
    armenianExampleNo: "Armenian example No. ",
    addExamples: "add an example",
    englishDefinitionNo: "English definition No. ",
    armenianDefinitionNo: "Armenian definition No. ",
    addDefinitions: "add a definition",
    resetFields: "Reset fields",
    updateTranslation: "Update",
    incorrectUser: `
        Please log-in before editing any data!
        `,
    existingTranslation: `
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
    addExamples: "ավելացնել օրինակ",
    englishDefinitionNo: "Անգլերեն սահմանում No. ",
    armenianDefinitionNo: "Հայերեն սահմանում No. ",
    addDefinitions: "ավելացնել սահմանում",
    resetFields: "Վերականգնել",
    updateTranslation: "Թարմացնել",
    incorrectUser: `
        Տվյալները փոփոխելու համար խնդրում ենք մուտք 
        գործել համակարգ։
        `,
    existingTranslation: `
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

const addRelationLabels = {
  ENG: {
    title: "Add a relation",
    selectLanguage: "Select language",
    languageENG: "ENG",
    languageARM: "ARM",
    comparisonText: "Comparison text",
    relatedWords: "Related elements",
    registerRelation: "Register",
    resetFields: "Reset fields",
    incorrectUser: `
      Please log-in before editing any data!
      `,
    incorrectData: `
      The relation you are about to register has some inaccuracies.
      Please fill the registration form properly!
      `,
  },

  ARM: {
    title: "Ավելացնել համեմատություն",
    selectLanguage: "Ընտրել լեզուն",
    languageENG: "ԱՆԳ",
    languageARM: "ՀԱՅ",
    comparisonText: "Համեմատության տեքստ",
    relatedWords: "Կապակցված տարրեր",
    registerRelation: "Գրանցել",
    resetFields: "Վերականգնել",
    incorrectUser: `
      Տվյալները փոփոխելու համար խնդրում ենք մուտք 
      գործել համակարգ։
      `,
    incorrectData: `
      Գրանցվող համեմատությունն ունի թերի լրացված դաշտեր։
      Խնդրում ենք ուղղել թերությունները, այնուհետև 
      անցնել գրանցմանը։
      `,
  },
};

const editRelationLabels = {
  ENG: {
    title: "Edit the relation",
    comparisonText: "Comparison text",
    relatedWords: "Related elements",
    resetFields: "Reset fields",
    updateRelation: "Update",
    incorrectUser: `
      Please log-in before editing any data!
      `,
    incorrectData: `
      The relation you are about to register has some inaccuracies.
      Please fill the registration form properly!
      `,
  },

  ARM: {
    title: "Խմբագրել համեմատությունը",
    comparisonText: "Համեմատության տեքստ",
    relatedWords: "Կապակցված տարրեր",
    resetFields: "Վերականգնել",
    updateRelation: "Թարմացնել",
    incorrectUser: `
      Տվյալները փոփոխելու համար խնդրում ենք մուտք 
      գործել համակարգ։
      `,
    incorrectData: `
      Գրանցվող համեմատությունն ունի թերի լրացված դաշտեր։
      Խնդրում ենք ուղղել թերությունները, այնուհետև 
      անցնել գրանցմանը։
      `,
  },
};

const navigationLabels = {
  ENG: {
    searchTranslation: "Search",
    addTranslation: "Add a translation",
    addRelation: "Add a relation",
    aboutUs: "About dictionary",
    logIn: "Sign in",
    logOut: "Sign out",
    // editWord: "Edit a word",
  },
  ARM: {
    searchTranslation: "Որոնել",
    addTranslation: "Ավելացնել թարգմանություն",
    addRelation: "Ավելացնել համեմատություն",
    aboutUs: "Բառարանի մասին",
    logIn: "Մուտք",
    logOut: "Ելք",
    // editWord: "Խմբագրել բառը",
  },
};

const searchLabels = {
  ENG: {
    title: "Search word",
    searchPlaceholder: "A word or a phrase",
  },
  ARM: {
    title: "Որոնել բառը",
    searchPlaceholder: "Բառ կամ արտահայտություն",
  },
};

const signInLabels = {
  ENG: {
    title: "Sign in",
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
    1: "HVAC",
    2: "IT",
    3: "acoust.",
    4: "aerohydr.",
    5: "agric.",
    6: "archit.",
    7: "auto.",
    8: "biol.",
    9: "biotechn.",
    10: "br. construct.",
    11: "cables",
    12: "civ. eng.",
    13: "comp.",
    14: "construct.",
    15: "disast.",
    16: "dril.",
    17: "electric.",
    18: "electron.",
    19: "electronic.",
    20: "energ. ind.",
    21: "eng.",
    22: "environ.",
    23: "fish. farm.",
    24: "gen.",
    25: "geol.",
    26: "geophys.",
    27: "hydr. eng.",
    28: "hydrogeol.",
    29: "hydrol.",
    30: "hydrometry",
    31: "ind.",
    32: "law",
    33: "math.",
    34: "mech.",
    35: "met.",
    36: "mining",
    37: "mount.",
    38: "nautic.",
    39: "oceanogr.",
    40: "oil",
    41: "phys.",
    42: "piping",
    43: "progr.",
    44: "road. sign.",
    45: "road. wrk.",
    46: "str. eng.",
    47: "survey.",
    48: "tech.",
    49: "technol.",
    50: "telecom.",
    51: "tools",
    52: "topogr.",
    53: "traf.",
    54: "tun. wrk.",
    55: "vent.",
    56: "weld.",
  },
  ARM: {
    1: "HVAC",
    2: "IT",
    3: "acoust.",
    4: "aerohydr.",
    5: "agric.",
    6: "archit.",
    7: "auto.",
    8: "biol.",
    9: "biotechn.",
    10: "br. construct.",
    11: "cables",
    12: "civ. eng.",
    13: "comp.",
    14: "construct.",
    15: "disast.",
    16: "dril.",
    17: "electric.",
    18: "electron.",
    19: "electronic.",
    20: "energ. ind.",
    21: "eng.",
    22: "environ.",
    23: "fish. farm.",
    24: "gen.",
    25: "geol.",
    26: "geophys.",
    27: "hydr. eng.",
    28: "hydrogeol.",
    29: "hydrol.",
    30: "hydrometry",
    31: "ind.",
    32: "law",
    33: "math.",
    34: "mech.",
    35: "met.",
    36: "mining",
    37: "mount.",
    38: "nautic.",
    39: "oceanogr.",
    40: "oil",
    41: "phys.",
    42: "piping",
    43: "progr.",
    44: "road. sign.",
    45: "road. wrk.",
    46: "str. eng.",
    47: "survey.",
    48: "tech.",
    49: "technol.",
    50: "telecom.",
    51: "tools",
    52: "topogr.",
    53: "traf.",
    54: "tun. wrk.",
    55: "vent.",
    56: "weld.",
  },
};

const resultsLabels = {
  ENG: {
    translations: "Translations:",
    partOfSpeech: "Part of Speech: ",
    english: "English: ",
    englishAbbreviation: "English abbreviation: ",
    armenian: "Armenian: ",
    armenianAbbreviation: "Armenian abbreviation: ",
    quality: "Quality: ",
    fields: "Fields: ",
    pronunciation: "Pronunciation: ",
    examples: "Examples of usage: ",
    definitions: "Definitions: ",
    editTranslation: "Edit",
    removeTranslation: "Remove",
    incorrectUser: `
      Please log-in before editing any data!
      `,
    deletingError: `
      There was an error during deletion, please try again!
      `,
    realatedTerms: "Related terms:",
    editRelation: "Edit",
    removeRelation: "Remove",
    seeAlso: "See also: ",
  },
  ARM: {
    translations: "Թարգմանություններ.",
    partOfSpeech: "Խոսքի մաս` ",
    english: "Անգլերեն՝ ",
    englishAbbreviation: "Անգլերեն հապավում` ",
    armenian: "Հայերեն` ",
    armenianAbbreviation: "Հայերեն հապավում` ",
    quality: "Որակ՝ ",
    fields: "Ոլորտներ՝ ",
    pronunciation: "Արտասանություն՝ ",
    examples: "Կիրառման օրինակներ. ",
    definitions: "Սահմանումներ. ",
    editTranslation: "Խմբագրել",
    removeTranslation: "Հեռացնել",
    incorrectUser: `
      Տվյալները փոփոխելու համար խնդրում ենք մուտք 
      գործել համակարգ։
      `,
    deletingError: `
      Թարգմանությունը ջնջելու ընթացքում առաջացել է խնդիր,
      խնդրում ենք կրկին փորձել:`,
    realatedTerms: "Համեմատություններ․",
    editRelation: "Խմբագրել",
    removeRelation: "Հեռացնել",
    seeAlso: "Այլ արտահայտություններ՝ ",
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
  addRelationLabels,
  editRelationLabels,
  navigationLabels,
  searchLabels,
  signInLabels,
  resultsLabels,
  footerLabels,
};
