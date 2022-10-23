$(document).ready(async function() {
    
    let quotes = await quotesFetch(url);
    addQuote (quotes);
    $("#new-quote").click(() => {
        addQuote (quotes);
    })
     
})

let url = "https://type.fit/api/quotes";
async function quotesFetch(url) {
    let response = await fetch(url);
    let quotes = await response.json();
    return quotes;
}

function addQuote (quotes) {
    let index = Math.round(Math.random() * quotes.length);
    $("#text").text(quotes[index].text)
    $("#author").text(quotes[index].author)
    $("#tweet-quote").prop("href", `https://twitter.com/intent/tweet?text=${quotes[index].text} - ${quotes[index].author}`)


    let rgb1 = Math.round(Math.random() * 255);
    let rgb2 = Math.round(Math.random() * rgb1);
    let rgb3 = Math.round(Math.random() * rgb2);
    let finalColor = `rgb(${rgb1},${rgb2},${rgb3})`;
    $("body").css("background-color", finalColor);
    $("button").css("background-color", finalColor);
    $("p").css("color", finalColor);

}


