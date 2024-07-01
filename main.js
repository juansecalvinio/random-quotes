import "./style.css"

document.addEventListener("DOMContentLoaded", function () {
  const quoteText = document.getElementById("text");
  const quoteAuthor = document.getElementById("author");
  const quoteError = document.getElementById("error");
  const newQuoteButton = document.getElementById("new-quote");
  const tweetQuoteButton = document.getElementById("tweet-quote");

  newQuoteButton.addEventListener("click", function () {
    fetch("https://api.quotable.io/random", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        if (data.statusCode === 404) {
          throw new Error(data.statusMessage);
        }
        const quote = data;
        quoteText.textContent = `"${quote.content}"`;
        quoteAuthor.textContent = `- ${quote.author}`;

        tweetQuoteButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `"${quote.content}" - ${quote.author}`
        )}`;
      })
      .catch((error) => {
        console.error("Error fetching the quote: ", error);
        quoteText.style.display = "none";
        quoteAuthor.style.display = "none";
        quoteError.style.display = "flex";
        quoteError.textContent =
          "En este momento no pudimos obtener una frase. Intentá nuevamente más tarde.";
      });
  });

  newQuoteButton.click();
});
