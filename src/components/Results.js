import { useState, useEffect } from 'react';

const Results = ({ movie, goBack }) => {
    console.log(movie)

    const [Class, toggle] = useState(false)

    return (
        <div className="parent" id="question">
            <div id="anim">
                <div onAnimationEnd={() => goBack() /*run the preliminary function*/}
                    onClick={() => toggle(true)} className={`child_element ${Class ? "anim_press" : ""}`} id="header">
                    <div className="content">Movie results</div>
                </div>
            </div>
            <div className="child_element" id="progress">
                <div style={{ width: "100%" }} id="step_finished"></div>
                <div id="step_unfinished"></div>
            </div>

            <div className="child_element" id="body">
                <div id="results">
                    {movie == void 0 ?
                        <p>
                            I got nothing. If you chose the random option, try restarting and pressing the button again. Otherwise, if you did custom parameters then don't look at me - blame the peeps who make movies for not having made enough movies(??) ¯\_(ツ)_/¯ or try not setting some parameters (particularly release date)
                        </p>
                        : <>
                            <div>Name: <a style={{ textAlign: "right" }} href={`https://www.imdb.com/title/${movie.imdb_id}/`}>{`${movie.title} (${movie.release_date})`}</a></div>
                            <div>Genres: <div>{movie.genres.join(", ")}</div></div>
                            <div>Run time: <div>{`${movie.run_time}`}</div></div>
                            <div>Certificate: <div>{movie.certificate}</div></div>

                            <div>User rating: <div>{`${movie.rating[0] != void 0 ? `${movie.rating[0]} stars |` : ""} ${parseInt(movie.rating[1]) != NaN ? `${parseInt(movie.rating[1]).toLocaleString()} voters` : ""}`}</div></div>
                            <div>Metascore: <div>{movie.metascore != "" ? `${movie.metascore}%` : ""}</div></div>

                            <div>Box office: <div>{movie.gross}</div></div>
                            <div>Director: <a href={`https://www.imdb.com/name/${Object.values(movie.director)[0]}/`}>{Object.keys(movie.director)[0]}</a></div>
                            <div>Star(s): <div style={{ textAlign: "right", fontSize: "1.4vh" }}>{Object.keys(movie.stars).map(star => <a id={Math.random() * 10000 /* why am I doing this?? */} href={`https://www.imdb.com/name/${movie.stars[star]}/`}>{star}, </a>)}</div></div>

                            <div className="summary">Summary: <div>{movie.summary}</div></div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Results