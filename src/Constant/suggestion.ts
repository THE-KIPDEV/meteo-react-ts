type ClothingSuggestion = {
  Hot: string;
  Warm: string;
  Cool: string;
  Cold: string;
};

type WeatherSuggestions = {
  Clear: ClothingSuggestion;
  Rain: ClothingSuggestion;
  [key: string]: ClothingSuggestion;
};

export const clothingSuggestionsMen: WeatherSuggestions = {
  Clear: {
    Hot: "Pour une journée chaude et ensoleillée, portez des vêtements légers comme des shorts, des t-shirts, et des sandales.",
    Warm: "Pour une journée chaude et ensoleillée, optez pour des vêtements légers, mais n'oubliez pas d'appliquer de la crème solaire.",
    Cool: "Pour une journée ensoleillée mais fraîche, habillez-vous avec un pantalon léger, un t-shirt, et une veste légère.",
    Cold: "Par temps froid, portez un manteau chaud, une écharpe, des gants, et des chaussures chaudes.",
  },
  Rain: {
    Hot: "En cas de pluie lors d'une journée chaude, portez un manteau imperméable, un parapluie, et des chaussures imperméables.",
    Warm: "En cas de pluie lors d'une journée chaude, choisissez un manteau imperméable léger et des chaussures imperméables.",
    Cool: "En cas de pluie lors d'une journée fraîche, portez un manteau imperméable, un pantalon, et des chaussures fermées.",
    Cold: "En cas de pluie lors d'une journée froide, portez un manteau imperméable chaud, un pantalon, et des chaussures chaudes.",
  },
};

export const clothingSuggestionsWomen: WeatherSuggestions = {
  Clear: {
    Hot: "Pour une journée chaude et ensoleillée, choisissez des robes légères, des jupes, et des sandales.",
    Warm: "Pour une journée chaude et ensoleillée, optez pour des vêtements légers comme des robes ou des jupes.",
    Cool: "Pour une journée ensoleillée mais fraîche, portez une robe légère avec une veste légère.",
    Cold: "Par temps froid, portez un manteau chaud, une écharpe, des gants, et des bottes d'hiver.",
  },
  Rain: {
    Hot: "En cas de pluie lors d'une journée chaude, portez un manteau imperméable, un parapluie, et des chaussures imperméables.",
    Warm: "En cas de pluie lors d'une journée chaude, choisissez un manteau imperméable léger et des chaussures imperméables.",
    Cool: "En cas de pluie lors d'une journée fraîche, portez un manteau imperméable, un pantalon, et des bottes de pluie.",
    Cold: "En cas de pluie lors d'une journée froide, portez un manteau imperméable chaud, un pantalon, et des bottes d'hiver.",
  },
  // Ajoutez davantage de suggestions de tenues en fonction de la météo "Rain" ici
};
