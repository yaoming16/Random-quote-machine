$(document).ready(async function () {
  
  let url = "https://api.quotable.io/quotes/random?tags=famous-quotes";
  await addQuote(url);
  animateCSS("#quote-box", "zoomIn");
  $("#new-quote").click(async () => {
    await addQuote(url);
    animateCSS("#quote-box", "zoomIn");

  })

})

async function quoteFetch(url) {
  let response = await fetch(url);
  let quote = await response.json();
  return quote;
}

async function  addQuote(url) {

  // From quote fetch we get an array with all the quotes that we requested
  let quote = await quoteFetch(url);
  quote = quote[0];
  let textToAdd = quote.content;
  let authorToAdd = quote.author;
 
  $("#text").text(textToAdd);
  $("#author").text(authorToAdd);
  $("#tweet-quote").prop("href", `https://twitter.com/intent/tweet?text=${textToAdd} - ${authorToAdd}`);

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

