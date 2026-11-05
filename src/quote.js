async function getQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random");

  if (!response.ok) {
    throw new Error(Quote service returned status ${response.status});
  }

  const data = await response.json();
  return { quote: data.quote, author: data.author };
}

module.exports = { getQuote };