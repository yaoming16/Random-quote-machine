$(document).ready(async function () {

  let quotes = await quotesFetch(url);
  addQuote(quotes);
  animateCSS("#quote-box", "zoomIn");
  $("#new-quote").click(async () => {
    addQuote(quotes);
    animateCSS("#quote-box", "zoomIn");

  })

})

let url = "https://type.fit/api/quotes";
async function quotesFetch(url) {
  let response = await fetch(url);
  let quotes = await response.json();
  return quotes;
}

function addQuote(quotes) {

  let index = Math.round(Math.random() * quotes.length);
  $("#text").text(quotes[index].text)
  $("#author").text(quotes[index].author)
  $("#tweet-quote").prop("href", `https://twitter.com/intent/tweet?text=${quotes[index].text} - ${quotes[index].author}`)

  let rgb1 = Math.round(Math.random() * 255);
  let rgb2 = Math.round(Math.random() * rgb1);
  let rgb3 = Math.round(Math.random() * rgb2);
  let finalColor = `rgb(${rgb1},${rgb2},${rgb3})`;
  $("body").css("background-color", finalColor);
  $("body").css("transition", "background-color 2s");

  $("button").css("background-color", finalColor);
  $("p").css("color", finalColor);

}


// animate css function to add and remove animation automatically
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });

