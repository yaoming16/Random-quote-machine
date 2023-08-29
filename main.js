$(document).ready(async function () {
  
  let allTagsUrl = "https://api.quotable.io/tags";
  let allTags = await getJson(allTagsUrl);
  for (tag of allTags) {
    $("#categorySelect").append(`<option value="${tag.slug}">${tag.name}</option>`)
  }
  let url = setUrl();
  await addQuote(url);
  animateCSS("#quote-box", "zoomIn");
  $("#new-quote").click(async () => {
    url = setUrl();
    await addQuote(url);
    animateCSS("#quote-box", "zoomIn");
  })
})

function setUrl() {
  let category = $("#categorySelect").val().toLowerCase();
  let author = $("#authorInput").val().toLowerCase();
  let url = "https://api.quotable.io/quotes/random?tags=";

  // Check if famous option is selected and add the tag to the url 
  if ($('#famous').is(':checked')) {
    url +='famous-quotes';   
  } 
  

  // Check if a category option is selected and add the tag to the url 
  if (category.trim() && category != "all") {
    if (!url.endsWith("=")) {
      url += `,${category}`;
    } else {
      url += `${category}`;
    }  
  }

  // Check if an author was writen and add the tag to the url
  if (author.trim()) {
    url += "&author=";
    // This for is in case the name of the author has more than one word
    let authorNames = author.split(" ");
    for (i = 0; i < authorNames.length; i++) {
      if (i != authorNames.length - 1) {
        url += `${authorNames[i]}-`;
      } else {
        url += `${authorNames[i]}`;
      }
    }
  }
  console.log(url)
  return url;
}

// Fetch json 
async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}


// Function to get a quote from the API and return the quote text and author in an  Array 
async function quoteFetch(url) {
  let quote = await getJson(url);
  try {
    return [quote[0].content, quote[0].author];
  } catch {
    return ["We could not get a quote with those parameters, please try again with different ones", ""]
  }
}

async function  addQuote(url) {

  // From quote fetch we get an array with all the quotes that we requested
  let quote = await quoteFetch(url);
  let textToAdd = quote[0];
  let authorToAdd = quote[1];
  
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

