let initState = {
  tags: {
    eNer: [
      {
        tag: "DATE",
        description: "Date",
      },
      {
        tag: "LOCATION",
        description: "Location",
      },
      {
        tag: "MONEY",
        description: "Money",
      },
      {
        tag: "O",
        description: "Others",
      },
      {
        tag: "ORGANIZATION",
        description: "Organization",
      },
      {
        tag: "PERCENT",
        description: "Percent",
      },
      {
        tag: "PERSON",
        description: "Person",
      },
      {
        tag: "TIME",
        description: "Time",
      },
    ],
    ePos: [
      { tag: "CC", description: "Coordinating conjunction" },
      { tag: "CD", description: "Cardinal number" },
      { tag: "DT", description: "Determiner" },
      { tag: "EX", description: "Existential there" },
      { tag: "FW", description: "Foreign Word" },
      { tag: "IN", description: "Preposition or subordinating conjunction" },
      { tag: "JJ", description: "Adjective" },
      { tag: "JJR", description: "Adjective, comparative" },
      { tag: "JJS", description: "Adjective, superlative" },
      { tag: "LS", description: "List item marker" },
      { tag: "MD", description: "Modal" },
      { tag: "NN", description: "Noun, singular or mass" },
      { tag: "NNP", description: "Proper noun, singular" },
      { tag: "NNPS", description: "Proper noun, plural" },
      { tag: "NNS", description: "Noun, plural" },
      { tag: "PDT", description: "Predeterminer" },
      { tag: "POS", description: "Possessive ending" },
      { tag: "PRP", description: "Personal pronoun" },
      { tag: "PRP$", description: "Possessive pronoun" },
      { tag: "RB", description: "Adverb" },
      { tag: "RBR", description: "Adverb, comparative" },
      { tag: "RBS", description: "Adverb, superlative" },
      { tag: "RP", description: "Particle" },
      { tag: "SYM", description: "Symbol" },
      { tag: "TO", description: "to" },
      { tag: "UH", description: "Interjection" },
      { tag: "VB", description: "Verb, base form" },
      { tag: "VBD", description: "Verb, past tense" },
      { tag: "VBG", description: "Verb, gerund or present participle" },
      { tag: "VBN", description: "Verb, past participle" },
      { tag: "VBP", description: "Verb, non-3rd person singular present" },
      { tag: "VBZ", description: "Verb, 3rd person singular present" },
      { tag: "WDT", description: "Wh-determiner" },
      { tag: "WP", description: "Wh-pronoun" },
      { tag: "WP$", description: "Possessive wh-pronoun" },
      { tag: "WRB", description: "Wh-adverb" },
    ],
    vNer: [
      {
        tag: "ABB",
        description:
          "The abbreviation of the entity does not belong to the class listed below.",
      },
      { tag: "ABB_DES", description: "Abbreviations of titles" },
      { tag: "ABB_GPE", description: "Abbreviations of geo-political entity" },
      { tag: "ABB_TRM", description: "Abbreviations of terminology entity" },
      {
        tag: "ABB_ORG",
        description: "Abbreviations of organizations, offices, companies",
      },
      {
        tag: "ABB_LOC",
        description: "Abbreviations of places, geographic names",
      },
      { tag: "TTL", description: "Title" },
      { tag: "DES", description: "Designation" },
      { tag: "GPE", description: "Geo-political entity" },
      { tag: "PER", description: "Person" },
      { tag: "ORG", description: "Organization" },
      { tag: "LOC", description: "Location" },
      { tag: "DTM", description: "Date time" },
      { tag: "BRN", description: "Brand" },
      { tag: "MEA", description: "Measurement" },
      { tag: "MON", description: "Money" },
      { tag: "PEC", description: "Percentage" },
      { tag: "NUM", description: "Number" },
      { tag: "TRM", description: "Terminology" },
    ],
    vPos: [
      { tag: "Nr", description: "Proper noun" },
      { tag: "Nc", description: "Classifier co-noun (loại từ)" },
      { tag: "Nu", description: "Unit noun" },
      { tag: "Nt", description: "Noun of time" },
      { tag: "Nq", description: "Quantifier noun (numerals)" },
      { tag: "Nn", description: "Other nouns" },
      { tag: "Vd", description: "Directional verb" },
      { tag: "Ve", description: "Exist verb" },
      { tag: "Vc", description: 'Copula "là" verb' },
      { tag: "Vv", description: "Other verbs" },
      { tag: "D", description: "Directional co-verb" },
      { tag: "An", description: "Ordinal number" },
      { tag: "Aa", description: "Other adjectives" },
      { tag: "Pd", description: "Demonstrative pronoun" },
      { tag: "Pp", description: "Other pronouns" },
      { tag: "R", description: "Adjunct" },
      { tag: "Cm", description: "Major/minor preposition" },
      { tag: "Cp", description: "Parallel Conjunction" },
      { tag: "Cs", description: "Subordinating conjunction" },
      { tag: "M", description: "Modifier word" },
      { tag: "E", description: "Exclamation word" },
      { tag: "FW", description: "Foreign word" },
      { tag: "ON", description: "Onomatopoeia" },
      { tag: "PU", description: "Punctuation" },
      { tag: "ID", description: "Idioms" },
    ],
  },
};

const TagReducer = (state = initState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};

export default TagReducer;
