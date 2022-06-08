const fs = require("fs");

fs.readFile("products.json", "utf8", function (err, data) {
  if (err) throw err;
  const products = JSON.parse(data);
  const newProducts = products.listing.map((product, index) => {
    let id = index + 1;
    return {
      id,
      ...product,
    };
  });
  products.listing = newProducts;
  fs.writeFileSync("products.json", JSON.stringify(products));
});
