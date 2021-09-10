import { useState, useEffect } from 'react';

const Results = ({ movie, goBack }) => {

    const [backClass, back] = useState(false)
    const [randomClass, random] = useState(false)
    const [finalMovie, changeMovie] = useState(void 0)
    const [movieAvailable, changeAvailable] = useState(false)

    const randomMovie = () => {
        if (movie != void 0) {

            let index = Math.floor(Math.random() * movie.length)
            changeMovie(movie[index])
            movie.splice(index, 1)
            random(false)

            changeAvailable(movie.length != 0)
        }

        else changeMovie(void 0) //sorry for the hacky solution - I'm tired
    }

    useEffect(() => randomMovie(), []);

    return (
        <div className="parent" id="question">
            <div id="anim">

                <div id="result_button">

                    <div style={{ backgroundColor: "#18ADE2" }} onAnimationEnd={() => goBack() /*run the preliminary function*/}
                        onClick={() => back(true)} className={`child_element ${backClass ? "anim_press" : ""}`} id="header">
                        <div className="content">Go back</div>
                    </div>

                    {movieAvailable ? <div style={{ backgroundColor: "#F2C607" }} onAnimationEnd={() => randomMovie() /*run the preliminary function*/}
                        onClick={() => random(true)} className={`child_element ${randomClass ? "anim_press" : ""}`} id="header">
                        <div className="content">Reroll</div>
                    </div> : <></>}
                </div>

            </div>
            <div className="child_element" id="progress">
                <div style={{ width: "100%" }} id="step_finished"></div>
                <div id="step_unfinished"></div>
            </div>

            <div className="child_element" id="body">
                <div id="results">
                    {finalMovie == void 0 ?
                        <p>
                            I got nothing. If you chose the random option, try restarting and pressing the button again. Otherwise, if you did custom parameters then don't look at me - blame the peeps who make movies for not having made enough movies(??) ¯\_(ツ)_/¯ or try not setting some parameters (particularly release date)
                        </p>
                        : <>
                            <div>Name: <a style={{ textAlign: "right" }} href={`https://www.imdb.com/title/${finalMovie.imdb_id}/`}>{`${finalMovie.title} (${finalMovie.release_date})`}</a></div>
                            <div>Genres: <div>{finalMovie.genres.join(", ")}</div></div>
                            <div>Run time: <div>{`${finalMovie.run_time}`}</div></div>
                            <div>Certificate: <div>{finalMovie.certificate}</div></div>

                            <div>User rating: <div>{`${finalMovie.rating[0] != void 0 ? `${finalMovie.rating[0]} stars |` : ""} ${parseInt(finalMovie.rating[1]) != NaN ? `${parseInt(finalMovie.rating[1]).toLocaleString()} voters` : ""}`}</div></div>
                            <div>Metascore: <div>{finalMovie.metascore != "" ? `${finalMovie.metascore}%` : ""}</div></div>

                            <div>Box office: <div>{finalMovie.gross}</div></div>
                            <div>Director: <a href={`https://www.imdb.com/name/${Object.values(finalMovie.director)[0]}/`}>{Object.keys(finalMovie.director)[0]}</a></div>
                            <div>Star(s): <div style={{ textAlign: "right", fontSize: "1.4vh" }}>{Object.keys(finalMovie.stars).map(star => <a id={Math.random() * 10000 /* why am I doing this?? */} href={`https://www.imdb.com/name/${finalMovie.stars[star]}/`}>{star}, </a>)}</div></div>

                            <div className="summary">Summary (scroll): <div>{finalMovie.summary}</div></div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Results