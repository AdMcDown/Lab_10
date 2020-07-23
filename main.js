//each of these will be used to put information in
let div = document.querySelector('div');
let secCov = document.getElementById('covid');
let footer = document.querySelector('footer');

//I used the same published page that holds the i-scream.json file, this way I dont have to make a new one :D
let requestURL = 'https://admcdown.github.io/json-example/products.json';

// MY XHR Object also sends all my information to ask for information back
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

//checks that i got a responds and gathers info
request.onload = function () {
    let products = request.response;
    topDeals(products);
    footerInfo(products);
    newQuote(); //made so it adds a queote at start
}

//Grabs spasific infomation and displays it :P
function topDeals(jObj) {
    let topDeals = jObj['topDeals'];
    for (let deal = 0; deal < topDeals.length; deal++) {

        //all my created items for my page
        let section = document.createElement('section');
        let h3 = document.createElement('h3');
        let h4 = document.createElement('h4');
        let par = document.createElement('p');
        let fh4 = document.createElement('h4'); //h4 for features
        let list = document.createElement('ul');
        let img = document.createElement('img');

        //filling my created items with json data
        h3.textContent = topDeals[deal].name;
        h4.textContent = 'Price: ' + topDeals[deal].price;
        fh4.textContent = 'Features';
        fh4.setAttribute('style', 'text-decoration: underline;'); //looks nicer could have done it in css but i had other h4 elements i didnt wantunderlined so had to set an attribute anyways!
        par.textContent = 'Description: ' + topDeals[deal].description;
        img.setAttribute('src', topDeals[deal].image);
        img.setAttribute('alt', topDeals[deal].image);

        //add into my list the features
        let features = topDeals[deal].features;
        for (let f = 0; f < features.length; f++) {
            let listItem = document.createElement('li');
            listItem.textContent = features[f];
            list.appendChild(listItem);
        }

        div.appendChild(section);
        section.appendChild(h3);
        section.appendChild(img);
        section.appendChild(h4);
        section.appendChild(par);
        section.appendChild(fh4);
        section.appendChild(list);
    }
}

//simple function just to display the company name and info in the footer
function footerInfo(jsonObj) {
    let par = document.createElement('p');

    par.textContent = jsonObj['companyName'] + ' was established in ' + jsonObj['established'] + ', our head office is in ' + jsonObj['headOffice'];

    footer.appendChild(par);
}

let jb = document.getElementById('newQuote');
jb.onclick = newQuote;

//fetch command using RapidApi 
//ok so the jokes were working and everything was going great but then I hit my max for using the api with an on paid plan...
//anyways just did this simple quote one instead and isnt as fun or colourfull as the last one but it has unlimited uses on free plan :P
function newQuote() {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": "12a0bb55d3msh09c3d3afa75ae51p16362ejsnb76059e5e875"
            }
        })
        .then(res => res.json())

        .then(data => {

            setup = data["content"];
            let quote = document.getElementById('quote');
            quote.textContent = setup;
        })


        .catch(err => {
            console.log(err);
        });

}

//test I connected github