//Pledge before I begin this monster project: I won't be using any other react/css framework or any 3rd party component/module
//Prediction: I'll probably scrap it mid-way and make a glorified calculator instead
//Huh, would ya look at that?

import { useState, useEffect } from 'react';
import loading from "./external/reload-cat.gif"

import Quiz from "./components/Quiz"
import Title from "./components/Title";
import Results from "./components/Results"
import { timeout } from 'q';

function App() {
  //what's my name

  var choices = { "genres": [], "companies": [], "countries": [], "certificates": [], "colors": [], "release_date": [[], []] } //An empty array so that the API can know when ones to randomize

  const returnRandom = (values) => [values[Math.floor(Math.random() * (values.length))]]

  var randomize = {
    "genres": () => returnRandom([
      'Action', 'Adventure', 'Animation',
      'Biography', 'Comedy', 'Crime',
      'Doco', 'Drama', 'Family',
      'Fantasy', 'Film Noir', 'History',
      'Horror', 'Music', 'Musical',
      'Mystery', 'Romance', 'Sci-Fi',
      'Sport', 'Thriller', 'War',
      'Western'
    ]),
    "certificates": () => returnRandom(['G', 'PG', 'M', 'R'])
  }


  const [screen, changeScreen] = useState(0)
  const [currentMovie, changeMovie] = useState(false)

  useEffect(() => {
    console.log(`${currentMovie == false}`)
    currentMovie != false && changeScreen(2)
  }
    , [currentMovie])

  const addChoice = (choice) => {
    console.log(choice)

    if (Object.keys(choices).includes(Object.keys(choice)[0])) {
      let choiceName = Object.keys(choice)[0]

      if (choice[choiceName].length > 0 && choiceName != "release_date") choice = { [choiceName]: [choice[choiceName][Math.floor(Math.random() * choice[choiceName].length)]] } //pick a random choice
      choices = { ...choices, ...choice }
    }
    else console.log("That's not a choice? You ok?")
  }

  const getMovie = async () => {
    console.log("Randomizing...")

    changeScreen(1)
    let movie

    //my epic randomizer
    if (choices.release_date && choices.release_date.length > 2) choices.release_date = [choices.release_date, []]
    let argument = Object.keys(choices).reduce((a, c) => ({ ...a, ...{ [c]: (choices[c][0] == void 0 && Object.keys(randomize).includes(c)) ? randomize[c]() : choices[c] } }), {})

    console.log(argument)

    let newMovie = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(argument)
    })

    if (newMovie.status != 200) {
      changeScreen(3)
    }
    else {
      newMovie = await newMovie.json()
      console.log(newMovie)
      movie = newMovie[2]

      changeMovie(movie != false || movie.length != 0 ? movie : void 0)
    }
  }

  return (
    <>
      {screen !== 3 ?
        <>
          <Title />
          {screen === 0 ?
            <Quiz change={addChoice} getMovie={getMovie} />
            : screen === 1 ?
              <div id="loading"><img src={loading} /></div>
              : <Results movie={currentMovie} goBack={() => changeScreen(0)} />}
        </>
        : <p style={{ fontSize: "3vh", color: "white", fontFamily: "cursive", textAlign: "center" }}>Uh oh, the backend isn't online - if you have the project files then ensure the backend exists (stored in [root_folder]/imdb_scraper) and/or restart the website (ctrl + c and "npm run website") and reload this page, if you don't know what this means then ask me (Hamdan)</p>}
    </>
  )
}

export default App;
