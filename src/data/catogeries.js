const categories = [
  "Italian",
  "Japanese",
  "American",
  "Middle Eastern",
  "Mexican",
  "Thai",
  "Indian",
  "French",
  "Greek",
  "Spanish"
];
localStorage.setItem("categories",JSON.stringify(categories))
export default categories;
console.log(categories)