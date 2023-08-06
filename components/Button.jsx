import React from "react"

export default function Button(props){

    function handleClick(){
        props.changeGameState()
        !props.gameOn ? props.fetchData() : null
    }
    
    const totalScore = props.scoreArray.reduce((total, num) => total + num, 0)

    const buttonEl = props.gameOn ? 
        <button type="submit" className="quizz--btn" onClick={handleClick}>Check answers</button> : 
        <div className="play-again-btn">
            <p className="button-text">You scored {totalScore}/5 correct answers</p>
            <button type="submit" className="quizz--btn" onClick={handleClick}> Play Again </button>
        </div>
    
    return buttonEl
}