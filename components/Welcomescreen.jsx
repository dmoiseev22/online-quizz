import React from "react"

export default function Welcomescreen(props){
    return (
        <div className="flex">
            <h1 className="start--h1">Quizzical</h1>
            <p className="start--p">Are you ready for 5 questions?</p>
            <button className="start--btn" onClick={props.changeWelcomeState}> Start Quizz </button>
        </div>
    )
}