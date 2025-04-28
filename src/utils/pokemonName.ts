export const formSuffixes = [
    "male", "female",
    "land", "sky",
    "attack", "defense", "speed",
    "small", "average", "large", "super",
    "full-belly", "hangry",
    "school", "solo",
    "midday", "midnight", "dusk",
    "disguised", "busted",
    "50", "10", "complete", "origin",
    "zero", "hero", "single-strike"
];

export const normalize = (str: string) =>
  str
    .normalize("NFD")           
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase()
    .replace(/[\s\-_.']/g, "")  
    .trim();


export const baseName = (name: string) => {
    for (const suffix of formSuffixes) {
      const suffixPattern = new RegExp(`-${suffix}$`);
      if (suffixPattern.test(name)) {
        return name.replace(suffixPattern, "");
      }
    }
    return name;
};

export   const formatNameFromAPI = (name: string) =>
    baseName(name)
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");