const fs = require("fs");

const categories = [
  {
    name: "Пицца",
    code: "pizza",
  },
  {
    name: "Роллы",
    code: "rolly",
  },
  {
    name: "Классические роллы",
    code: "classicRolly",
  },
  {
    name: "Суши",
    code: "sushi",
  },
];

const categoriesList = categories.map((category, iCategory) => ({
  id: iCategory + 1,
  name: category.name,
  code: category.code,
}));

fs.writeFileSync(
  "categories.json",
  JSON.stringify({
    head: {
      total: categoriesList.length,
    },
    list: categoriesList,
  })
);
