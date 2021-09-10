//***Before reading the following, remember arrow functions don't need "return"***

const express = require('express');
var path = require('path');
const axios = require("axios");
const cheerio = require('cheerio');

const app = express();
app.use(express.json());
app.listen(4000, () => console.log(`Backend started on port ${4000}`))

const countries = { "Afghanistan": "af", "Åland Islands": "ax", "Albania": "al", "Algeria": "dz", "American Samoa": "as", "Andorra": "ad", "Angola": "ao", "Anguilla": "ai", "Antarctica": "aq", "Antigua and Barbuda": "ag", "Argentina": "ar", "Armenia": "am", "Aruba": "aw", "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahamas": "bs", "Bahrain": "bh", "Bangladesh": "bd", "Barbados": "bb", "Belarus": "by", "Belgium": "be", "Belize": "bz", "Benin": "bj", "Bermuda": "bm", "Bhutan": "bt", "Bolivia": "bo", "Bonaire, Sint Eustatius and Saba": "bq", "Bosnia and Herzegovina": "ba", "Botswana": "bw", "Bouvet Island": "bv", "Brazil": "br", "British Indian Ocean Territory": "io", "British Virgin Islands": "vg", "Brunei Darussalam": "bn", "Bulgaria": "bg", "Burkina Faso": "bf", "Burma": "bumm", "Burundi": "bi", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Cape Verde": "cv", "Cayman Islands": "ky", "Central African Republic": "cf", "Chad": "td", "Chile": "cl", "China": "cn", "Christmas Island": "cx", "Cocos (Keeling) Islands": "cc", "Colombia": "co", "Comoros": "km", "Congo": "cg", "Cook Islands": "ck", "Costa Rica": "cr", "Côte d'Ivoire": "ci", "Croatia": "hr", "Cuba": "cu", "Cyprus": "cy", "Czech Republic": "cz", "Czechoslovakia": "cshh", "Democratic Republic of the Congo": "cd", "Denmark": "dk", "Djibouti": "dj", "Dominica": "dm", "Dominican Republic": "do", "East Germany": "ddde", "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv", "Equatorial Guinea": "gq", "Eritrea": "er", "Estonia": "ee", "Ethiopia": "et", "Falkland Islands": "fk", "Faroe Islands": "fo", "Federal Republic of Yugoslavia": "yucs", "Federated States of Micronesia": "fm", "Fiji": "fj", "Finland": "fi", "France": "fr", "French Guiana": "gf", "French Polynesia": "pf", "French Southern Territories": "tf", "Gabon": "ga", "Gambia": "gm", "Georgia": "ge", "Germany": "de", "Ghana": "gh", "Gibraltar": "gi", "Greece": "gr", "Greenland": "gl", "Grenada": "gd", "Guadeloupe": "gp", "Guam": "gu", "Guatemala": "gt", "Guernsey": "gg", "Guinea": "gn", "Guinea-Bissau": "gw", "Guyana": "gy", "Haiti": "ht", "Heard Island and McDonald Islands": "hm", "Holy See (Vatican City State)": "va", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id", "Iran": "ir", "Iraq": "iq", "Ireland": "ie", "Isle of Man": "im", "Israel": "il", "Italy": "it", "Jamaica": "jm", "Japan": "jp", "Jersey": "je", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kiribati": "ki", "Korea": "xko", "Kosovo": "xkv", "Kuwait": "kw", "Kyrgyzstan": "kg", "Laos": "la", "Latvia": "lv", "Lebanon": "lb", "Lesotho": "ls", "Liberia": "lr", "Libya": "ly", "Liechtenstein": "li", "Lithuania": "lt", "Luxembourg": "lu", "Macao": "mo", "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Maldives": "mv", "Mali": "ml", "Malta": "mt", "Marshall Islands": "mh", "Martinique": "mq", "Mauritania": "mr", "Mauritius": "mu", "Mayotte": "yt", "Mexico": "mx", "Moldova": "md", "Monaco": "mc", "Mongolia": "mn", "Montenegro": "me", "Montserrat": "ms", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nauru": "nr", "Nepal": "np", "Netherlands": "nl", "Netherlands Antilles": "an", "New Caledonia": "nc", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "Niue": "nu", "Norfolk Island": "nf", "North Korea": "kp", "North Vietnam": "vdvn", "Northern Mariana Islands": "mp", "Norway": "no", "Oman": "om", "Pakistan": "pk", "Palau": "pw", "Palestine": "xpi", "Palestinian Territory": "ps", "Panama": "pa", "Papua New Guinea": "pg", "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Poland": "pl", "Portugal": "pt", "Pitcairn": "pn", "Puerto Rico": "pr", "Qatar": "qa", "Republic of Macedonia": "mk", "Réunion": "re", "Romania": "ro", "Russia": "ru", "Rwanda": "rw", "Saint Barthélemy": "bl", "Saint Helena": "sh", "Saint Kitts and Nevis": "kn", "Saint Lucia": "lc", "Saint Martin (French part)": "mf", "Saint Pierre and Miquelon": "pm", "Saint Vincent and the Grenadines": "vc", "Samoa": "ws", "San Marino": "sm", "Sao Tome and Principe": "st", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Serbia and Montenegro": "csxx", "Seychelles": "sc", "Siam": "xsi", "Sierra Leone": "sl", "Singapore": "sg", "Slovakia": "sk", "Slovenia": "si", "Solomon Islands": "sb", "Somalia": "so", "South Africa": "za", "South Georgia and the South Sandwich Islands": "gs", "South Korea": "kr", "Soviet Union": "suhh", "Spain": "es", "Sri Lanka": "lk", "Sudan": "sd", "Suriname": "sr", "Svalbard and Jan Mayen": "sj", "Swaziland": "sz", "Sweden": "se", "Switzerland": "ch", "Syria": "sy", "Taiwan": "tw", "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th", "Timor-Leste": "tl", "Togo": "tg", "Tokelau": "tk", "Tonga": "to", "Trinidad and Tobago": "tt", "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Turks and Caicos Islands": "tc", "Tuvalu": "tv", "U.S. Virgin Islands": "vi", "Uganda": "ug", "Ukraine": "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us", "United States Minor Outlying Islands": "um", "Uruguay": "uy", "Uzbekistan": "uz", "Vanuatu": "vu", "Venezuela": "ve", "Vietnam": "vn", "Wallis and Futuna": "wf", "West Germany": "xwg", "Western Sahara": "eh", "Yemen": "ye", "Yugoslavia": "xyu", "Zaire": "zrcd", "Zambia": "zm", "Zimbabwe": "zw" }
const genres = { "Action": "action", "Adventure": "adventure", "Animation": "animation", "Biography": "biography", "Comedy": "comedy", "Crime": "crime", "Doco": "documentary", "Drama": "drama", "Family": "family", "Fantasy": "fantasy", "Film Noir": "film_noir", "History": "history", "Horror": "horror", "Music": "music", "Musical": "musical", "Mystery": "mystery", "Romance": "romance", "Sci-Fi": "sci_fi", "Sport": "sport", "Thriller": "Thriller", "War": "war", "Western": "western" }
const companies = { "20th Century Fox": "fox", "Sony": "columbia", "DreamWorks": "dreamworks", "MGM": "mgm", "Paramount": "paramount", "Universal": "universal", "Walt Disney": "disney", "Warner Bros.": "warner" }
//freshly scraped from IMDB! Uh, yeah, I'm going to loop over both of them; only 500 entries

class string { //look pa, I made a class!
    constructor(def, validation) { //validation is a custom stringChecker function

        this.def = def
        if (def != void 0) this.stylishDef = Object.keys(def) //in order to not have to loop over every object everytime stringChecker() runs and also so my front end can access this directly to display

        this.stringChecker = validation != undefined ? validation //if a custom function exists set stringChecker to that else...
            : typeof (this.def) == "object" ? //if the default value exists and it's an array the cross-check
                (para) =>
                    para.filter((v) => !this.stylishDef.includes(v) | v == "" /*or if v is an empty string*/)/**/.length == 0 ? //if the length is smaller then there was a non-included value in there
                        para.reduce((a, c) => a += `${this.def[c]},`, "").slice(0, -1) //get raw value, add le commas and remove last comma
                        : void 0

                : (para) => typeof (para) == "string" ? para.replaceAll(" ", "+") : void 0 //send undefined if not a string else send string + comma
        //This isn't "spaghetti" code, I promise - I just return the appropriate function where necessary for the class - it was meant to look impressive... Also to make the code more efficient since, after assignment, I know if it should be a string or an array
    }
}

const parameters = {
    "title": new string(void 0), //empty string - can be anything
    "genres": new string(genres),
    "companies": new string(companies),
    "countries": new string(countries),
    "certificates": new string({ "G": "US%3AG", "PG": "US%3APG", "M": "US%3APG-13", "R": "US%3AR" }),
    "colors": new string({ "Color": "color", "Black and White": "black_and_white" }),

    "run_time": new string(void 0, (para) => (para.length == 1 || para.length == 2) && para.filter((c) => isNaN(c)).length == 0 ? para.join(",") : void 0),
    "release_date": new string(void 0, (para) => { //ugh, ibdb is so finicky about release dates
        let today = new Date()
        //    today = [today.getFullYear(), today.getMonth() + 1, today.getDate()]

        //     //we need a full date in there else ibdm does funky things
        //     para[1] = para[1].length < 3 ? [...para[1], ...today.slice(para[1].length)] /*I'm so smart*/ : para[1]

        return para.length > 0 && para.length <= 2 //this check is pretty much redundant but eh...
            && para.filter((c) =>
                c.filter((f) => isNaN(f) && parseInt(f) > 0).length != 0 //all ints?
                || parseInt(c[0]) < 1920 || c[0] > today[0] //year
                || c[1] != undefined && parseInt(c[1]) > 12 //month
                || c[2] != undefined && parseInt(c[2]) > 31 //day
            ).length == 0 ? para.map((c) => c.join("-")).join(",") : void 0

    }), //please don't try comprehending that...

    "default_value_string": "adult=include",
    //the para | 0 is just a simple bitwise operation to turn the boolean into an int
    //in the above the && is just a shortened ternary operator

    generateParameters: function (para) {
        let naughtyList = {} //this is just if I ever feel like publishing this API to github
        console.log(para)
        let finalUrl = Object.keys(para).reduce((a, c) => {
            let transformedPara

            if (!Object.keys(this).includes(c) || (transformedPara = this[c].stringChecker(para[c])) == undefined) {
                console.log(`Error on: ${c}`)
                naughtyList[c] = para[c] //add this to the naughty list
            }
            else
                a += `${c}=${transformedPara}&` //apparently nested functions can access parent obejct's properties?? JS go brrr

            return a
        }, "")
        finalUrl = `https://www.imdb.com/search/title/?${finalUrl}${this.default_value_string}`

        return [Object.keys(naughtyList).length == 0, [naughtyList, finalUrl]] //I'll send both the naughtyList and finalUrl and leave it up to the caller func to determine what to do
    }
}

const scrape = async (link) => {
    if (!link[0]) return link

    console.log(`Scraping: ${link[1][1]}\n\n`)
    let response = await axios.get(link[1][1])
    const $ = cheerio.load(response.data)

    const movies = []

    $(".lister-item-content").each((index, element) => {
        let movieHeader = $(element).children("h3")
        let movieName = $(movieHeader).children("a")

        let movieRating = $(element).children("div.ratings-bar").first()
        let movieSub = $(element).children("p.text-muted").first()

        let movieDetails = $(element).children("p.sort-num_votes-visible")

        let moviePeeps = $(element).children("p[class='']").children("a") //the cast/direction element has unset class attribute
        let movieDirector = $(moviePeeps).first()
        let actors = {}
        $(moviePeeps).not(":first").each((i, el) => actors[$(el).text()] = $(el).attr("href").split("/")[2]) //get everything but director's element and form array with two values: star name and href value

        movies.push({
            "imdb_id": movieName.attr("href").split("/")[2],
            "title": movieName.text().trim(),
            "release_date": movieHeader.children("span").last().text().slice(1, -1), //the release year had brackets around it

            "certificate": movieSub.children("span.certificate").text(), //fun fact: the rating for some movies by scrpaing doesn't match the ones of the site but these ones are correct
            "run_time": movieSub.children("span.runtime").text(), //we slice off the " min"
            "genres": movieSub.children("span.genre").text().trim().replace("\n", "").replace(" ", "").split(",").map(c => c.trim()), //remove the initial new line character, the blank space and turn it into an array

            "rating": [
                movieRating.children("div.ratings-imdb-rating").attr("data-value"),
                movieDetails.children("span[name]").first().text().replace(",", "")
            ],
            "metascore": movieRating.children("div.ratings-metascore").children("span").text().trim(),
            "gross": movieDetails.children("span.text-muted").last().text() == "Gross:" ? movieDetails.children("span[name]").last().text().replace(",", "") : "", //if we have a gross office value then return it

            "summary": $(element).children("p.text-muted").last().text().replace("\n", ""),

            "director": { [movieDirector.text()]: movieDirector.attr("href") && movieDirector.attr("href").split("/")[2] },
            "stars": actors
        })
    })

    return [...link, movies] //OH MY GOD FINALLY
}

app.post('/api', async (req, res) => res.send(await scrape(await parameters.generateParameters(req.body)))) //right back at ya
app.get("/api", (req, res) => res.send(parameters))
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./test.html")))
