import React from "react"
import Button from "./Button.jsx"

export default function Quizz(props){
        
    const [formData, setFormData] = React.useState({})
    const [score, setScore] = React.useState({0: 0})
    const [gameOn, setGameOn] = React.useState(true)

    const questionsArray = props.questions
    
    function handleChange(event){
        const {name, value, checked} = event.target
        const correctAnswer = findCorrectAnswer(name)
        updateScore(name, value, correctAnswer)
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: {
                    correctAnswer: correctAnswer, 
                    chosenAnswer: value, 
                }
            }
        })
    }
    
    function changeGameState(){
        setGameOn(prevState => {
            !gameOn ? setScore({}) : null
            return prevState ? false : true
        })
    }
    
    
    function updateScore(question, answer, correctAnswer){
        setScore((prevScore) => {
            const answerScore = (answer === correctAnswer) ? 1 : 0
            return {
                ...prevScore,
                [question]: answerScore,
            }
        })    
    }
        
    function findCorrectAnswer(question){
        const questionObj = props.questions.find(el => el.question === question)
        return questionObj.correct_answer
    }
    
    
    const questionsList = questionsArray ? questionsArray.map(question => {
        const questionTitle = question.question
        return (
            <div className="question" key={questionTitle}>
            
                <h2 className="question--text">
                    {questionTitle}
                </h2>

                {question.decodedShaffledArray.map((answer) => {
                    
                    // ADD CONDITIONAL STYLING TO INPUTS
                    let isSelected = gameOn && formData[questionTitle] && formData[questionTitle].chosenAnswer === answer
                    isSelected = isSelected === undefined ? false : isSelected
                    
                    const isRight = !gameOn && formData[questionTitle] && formData[questionTitle].correctAnswer === answer
                    const isWrong = !gameOn && formData[questionTitle] && formData[questionTitle].chosenAnswer === answer && !isRight
                    const isInactive = !gameOn && !isRight 
                    
                    const styles = {
                        opacity: 
                            isInactive ? 0.5 : 1,
                        backgroundColor: 
                            isSelected ?  "#D6DBF5" : 
                            isRight ? "#94D7A2" :
                            isWrong ? "#F8BCBC" :
                            isInactive ? "" : "",
                        border: 
                            isSelected ?  "1px solid #4D5B9E" : 
                            isRight ? "1px solid #94D7A2" :
                            isWrong ? "1px solid #F8BCBC" :
                            isInactive ? "1px solid #4D5B9E" : "",
                    }  
                    
                    return(
                        <div key={answer} style={{display : "inline-block"}}>
                            <input 
                                    
                                    className="answer--option"
                                    type="radio" 
                                    name={questionTitle}
                                    value={answer}
                                    id={answer}
                                    checked={isSelected}
                                    key={answer + "_input"}
                                    onChange={handleChange}
                            />
                            <label 
                                className="answer--button" 
                                style={styles} 
                                htmlFor={answer} 
                                key={answer + "_label"}> 
                                {answer}
                            </label>
                        </div>
                    )
                })}
                
            </div> 
        )
    }) : ""    
      
    return(
        <div className="container">
            {questionsList}
            <Button 
                scoreArray={Object.values(score)}
                gameOn={gameOn}
                changeGameState={changeGameState}
                fetchData={props.fetchData}
            />
        </div>
    )        
}