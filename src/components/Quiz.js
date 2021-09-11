import { useState, useEffect } from 'react';

//there's probably a better way to do this but eh
import g from "../external/certificates/general.png"
import pg from "../external/certificates/parental.png"
import m from "../external/certificates/mature.png"
import r from "../external/certificates/r18.png"

import disney from "../external/logos/disney.png"
import dreamworks from "../external/logos/dreamworks.png"
import fox from "../external/logos/fox.png"
import mgm from "../external/logos/mgm.png"
import paramount from "../external/logos/paramount.png"
import sony from "../external/logos/sony.png"
import universal from "../external/logos/universal.png"
import warner_bros from "../external/logos/warner_bros.png"

import countries from "./countries"

//todo: preview selection or go back

//Ha, I bet you've never seen components handled this way before - I call them Hamonents - Hamdan + Components (lord, I'm going insane)
const Quiz = ({ change, getMovie }) => {
    const [step, changeStep] = useState(0)
    const [stageData, changeData] = useState(0)

    const logos = { "20th Century Fox": fox, "DreamWorks": dreamworks, "MGM": mgm, "Paramount": paramount, "Sony": sony, "Universal": universal, "Warner Bros.": warner_bros, "Walt Disney": disney }

    const stages = [
        [
            () => changeData([false, false]), //there is probably a more elegant way to do this but I really can't be bothered - this sets the stage
            () => stageData[0] | stageData[1], //this returns status of the form
            () => void 0, /* store */
            "How do you want to do this?",
            () => (<>
                <div style={{ fontSize: "2.5vh", padding: "0", margin: "0", fontFamily: "cursive", color: "white" }}>Press the red button ^ to submit!</div>
                <div onClick={() => changeData([!stageData[0], false])} style={{ backgroundColor: stageData[0] ? "#33CC33" : "#18ADE2" }} className="step_1 button">Randomize all parameters</div>
                <div onClick={() => changeData([false, !stageData[1]])} style={{ backgroundColor: stageData[1] ? "#33CC33" : "#18ADE2" }} className="step_1 button">Set some parameters</div>
            </>)
        ],
        [ //this is just a template
            () => void 0/* initialize */,
            () => true, /* check */
            () => void 0, /* store */
            "How this works",
            () => (<>
                <div className="step_2">
                    <div style={{ color: "white" }}>*You can now choose more than one choice for each section</div>
                    <div>You'll be asked a few question, answering these questions will imapct the type of movies randomly picked.</div>
                    <div>You can leave questions unanswered and proceed by pressing the header.</div>
                    <div>Also no back button because I'm lazy. Press the button to move on.</div>
                </div>
            </>)
        ],
        [
            () => changeData({ "G": false, "PG": false, "M": false, "R": false })/* initialize */,
            () => true, /* check - this allows me to force user to fill out certain parameters */
            () => change({ "certificates": Object.keys(stageData).filter(choice => stageData[choice]) }), /*choices["colors"] = [stageData[0] ? "Color" : "", stageData[1] ? "Black and White" : ""], /* store */
            "Movie rating classification",
            () => (<>
                <div className="step_3">
                    <div className="button_container">
                        {Object.keys(stageData).map((element, i) =>
                            <div className="step_3_button button" key={i} onClick={() => changeData({ ...stageData, ...{ [element]: !stageData[element] } })} style={{ backgroundColor: stageData[element] ? "#33CC33" : "#18ADE2" }}>{element}</div>
                        )}
                    </div>

                    <div className="rating_description">
                        <div>
                            <div>
                                <img src={g} />
                            </div>
                            <div>
                                <p>The G classification is suitable for everyone - Contains language and themes that are very mild in impact.</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <img src={pg} />
                            </div>
                            <div>
                                <p>PG-rated content is not recommended for viewing by people under the age of 15 without guidance from parents, teachers or guardians</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img src={m} />
                            </div>
                            <div>
                                <p>M-rated films and computer games are not recommended for children under the age of 15 - Includes violence and themes that require a mature outlook.</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img src={r} />
                            </div>
                            <div>
                                <p>R 18+ material is restricted to adults as it contains potentially offensive content that is considered high in impact for viewers.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </>)
        ],
        [ //this is just a template
            () => changeData({ "Action": false, "Adventure": false, "Animation": false, "Biography": false, "Comedy": false, "Crime": false, "Doco": false, "Drama": false, "Family": false, "Fantasy": false, "Film Noir": false, "History": false, "Horror": false, "Music": false, "Musical": false, "Mystery": false, "Romance": false, "Sci-Fi": false, "Sport": false, "Thriller": false, "War": false, "Western": false })/* initialize */,
            () => true,
            () => change({ "genres": Object.keys(stageData).filter(choice => stageData[choice]) }), /* store */
            "What do you feel like?",
            () => (<div className="genres">
                {Object.keys(stageData).map((element, i) => <div key={i} onClick={() => changeData({ ...stageData, ...{ [element]: !stageData[element] } })} style={{ backgroundColor: stageData[element] ? "#33CC33" : "#18ADE2" }} className="step_1 button">{element}</div>)}
            </div>)
        ],
        [ //this is just a template
            () => changeData({ "20th Century Fox": false, "Sony": false, "DreamWorks": false, "MGM": false, "Paramount": false, "Universal": false, "Walt Disney": false, "Warner Bros.": false })/* initialize */,
            () => true, /* check - this allows me to force user to fill out certain parameters */
            () => change({ "companies": Object.keys(stageData).filter(choice => stageData[choice]) }), /* store */
            "By which film company?",
            () => (<div className="companies">
                {Object.keys(stageData).map((element, i) =>
                    <div key={i} onClick={() => changeData({ ...stageData, ...{ [element]: !stageData[element] } })} style={{ backgroundColor: stageData[element] ? "#33CC33" : "#18ADE2" }} className="step_1 button">
                        <img src={logos[element]} />
                    </div>)}
            </div>)
        ],
        [ //this is just a template
            () => changeData([countries, Object.keys(countries)])/* first one is final array, second one is filtered array */,
            () => true, /* check - this allows me to force user to fill out certain parameters */
            () => change({ "countries": Object.keys(stageData[0]).filter(choice => stageData[0][choice] /* this would either be true/false */) }), /* store */
            "From which country?",
            () => (
                <div className="country">
                    <input className="search_bar" type="text" placeholder="Type in a country" onInput={e => changeData([stageData[0], Object.keys(stageData[0]).filter(c => c.toLowerCase().includes(e.target.value.toLowerCase()))])} />
                    <div className="countries">
                        {stageData[1].map((element, i) =>
                            <div key={i} onClick={() => changeData([{ ...stageData[0], ...{ [element]: !stageData[0][element] } }, stageData[1]])} style={{ backgroundColor: stageData[0][element] ? "#33CC33" : "#18ADE2" }} className="step_1 button">
                                {element}
                            </div>)}
                    </div>
                </div>
            )
        ],
        [ //this is just a template
            () => changeData([[], []])/* initialize */,
            () => stageData.filter((a) => !(a == "" || a.length == 0 || a.length == 3)).length == 0, /* check - this allows me to force user to fill out certain parameters */
            () => change({ "release_date": stageData }), /* store */
            "Release date range",
            () => (
                <div className="date">
                   <p> First is earliest [{'>'}] and second is latest [{'<'}] (min should be 1910 and max is today) <span style={{color: "white"}}> <br></br>*If both entries inputted, it becomes a range</span></p>
                    <div className="date_container">
                        <input type="date" name="start"
                            min="1910-01-01" max={new Date().toJSON().slice(0, 10)}
                            onChange={e => changeData([e.target.value.split("-"), stageData[1]])}
                        />

                        <div className="to">To</div>

                        <input type="date" name="start"
                            min="1910-01-01" max={new Date().toJSON().slice(0, 10)}
                            onChange={e => changeData([stageData[0], e.target.value.split("-")])}
                        />
                    </div>
                </div>
            )
        ],
        /*[ //this is just a template
            () => void 0/* initialize ,
            () => true, /* check - this allows me to force user to fill out certain parameters 
            () => void 0, /* store 
            "Header text",
            () => (<>
                {/* body }
            </>)
        ]*/
    ]

    const [Class, toggle] = useState(false)
    useEffect(() => toggle(false), [step]); //Once step number changes, toggle animation to false

    const press = () => {
        stages[step][2]() //run the parsing and storing function

        if ((step == 0 && stageData[0] == true) || step == stages.length - 1) getMovie() //relay the choice back to the main app
        else {
            stages[step + 1][0]() // initialize the next one
            console.log(stageData)
            changeStep(step + 1)
        }
    }

    return (
        <div className="parent" id="question">
            <div id="anim">
                <div
                    onAnimationEnd={() => press() /*run the preliminary function*/}
                    onClick={() => stages[step][1]() ? toggle(true) : alert("Make sure you've filled it out properly!")}
                    className={`child_element ${Class ? "anim_press" : ""}`}
                    id="header">

                    <div className="content">{stages[step][3]}</div>
                </div>
            </div>

            <div className="child_element" id="progress">
                <div style={{ width: `${(step) * 100 / (stages.length)}%` }} id="step_finished"></div>
                <div id="step_unfinished"></div>
            </div>

            <div className="child_element" id="body">
                {stages[step][4]()}
            </div>

        </div>
    )
}

Quiz.defaultProps = {
    question: "No question provided",
    options: <p style={{ fontSize: "10vh", textAlign: "center" }}>Nothing here ;(</p> //It should never get to here
}

export default Quiz