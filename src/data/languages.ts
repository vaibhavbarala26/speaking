interface Language {
    name: string;
    variants?: string[]; // Optional property for languages with variants
  }
  
  interface LanguageData {
    languages: Language[];
  }
  
  export const languageData: LanguageData = {
    languages: [
      { name: "English" },
      { name: "Hindi" },
      { name: "Korean" },
      { name: "Arabic" },
      { name: "Bahasa Indonesia" },
      { name: "Bengali" },
      { name: "Bulgarian" },
      { name: "Chinese", variants: ["Simplified", "Traditional"] },
      { name: "Croatian" },
      { name: "Czech" },
      { name: "Danish" },
      { name: "Dutch" },
      { name: "Estonian" },
      { name: "Farsi" },
      { name: "Finnish" },
      { name: "French" },
      { name: "German" },
      { name: "Gujarati" },
      { name: "Greek" },
      { name: "Hebrew" },
      { name: "Japanese" },
      { name: "Hungarian" },
      { name: "Italian" }
    ]
  };
  
  // Example of how to access the data
  console.log(languageData.languages);
  