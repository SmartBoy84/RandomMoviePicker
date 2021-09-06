//Pledge before I begin this monster project: I won't be using any other react/css framework or any 3rd party component/module
//Prediction: I'll probably scrap it mid-way and make a glorified calculator instead

import { useState, useEffect } from 'react';
import loading from "./external/reload-cat.gif"

import Quiz from "./components/Quiz"
import Title from "./components/Title";
import Results from "./components/Results"
import { timeout } from 'q';

function App() {
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
    currentMovie != false && changeScreen(2)
  }
    , [currentMovie])

  const addChoice = (choice) => {
    //todo: randomize the choices
    if (Object.keys(choices).includes(Object.keys(choice)[0])) choices = { ...choices, ...choice }
    else console.log("That's not a choice? You ok?")
  }

  const getMovie = async () => {
    console.log("Randomizing...")


    changeScreen(1)
    let movie

    //my epic randomizer
    let argument = Object.keys(choices).reduce((a, c) =>
      !(choices[c][0] == void 0 || (choices[c][0] == "object" && choices[c][0][0] == void 0 || choices[c][0][1] == void 0)) ? { ...a, ...{ [c]: choices[c] } } /* this is a check to see if the user has inputted a value */
        : (Object.keys(randomize).includes(c)) ? { ...a, ...{ [c]: randomize[c]() } }
          : a
      , {})

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

      let finalMovie = movie[Math.floor(Math.random() * movie.length)]
      changeMovie(finalMovie)
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
        : <p style={{fontSize:"3vh", color: "white", fontFamily: "cursive", textAlign: "center"}}>Uh oh, the backend isn't online - if you have the project files then start the backend (stored in [root_folder]/imdb_scraper) and reload this page, if you don't know what this means then ask me (Hamdan)</p>}
    </>
  )
}

export default App;
