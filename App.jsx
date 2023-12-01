import React from "react"
import he from "he"
import Quizz from "./components/Quizz.jsx"
import Welcomescreen from "./components/Welcomescreen.jsx"
import { v4 as uuidv4 } from 'uuid'


export default function App(){

    const [questions, setQuestions] = React.useState("")
    const [welcomeState, setWelcomeState] = React.useState(true)
    
    // GET THE DATA VIA API REQUEST AND SAVE TO STATE
    React.useEffect(()=>{
        fetchData()
    }, [])
    
    // FETCH FUNCTION
    function fetchData() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(res => {
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setQuestions(updateQuestions(data.results)))
        .catch(err => console.error('Error:', err));
    }
            
    // FUNCTION TO CREATE UPDATED QUESTIONS ARRAY WITH SHUFFLED ANSWERS
    function updateQuestions(data){
            return data.map((question)=>{
                const allAnswersArray = [question.correct_answer, ...question.incorrect_answers]
                const shuffledAnswersArray = shuffleArray(allAnswersArray)
                const decodedShaffledArray = decodeArray(shuffledAnswersArray)

                    return {
                        Id: uuidv4(),
                        question: he.decode(question.question),
                        decodedShaffledArray: decodedShaffledArray,
                        correct_answer: he.decode(question.correct_answer),
                        chosenAnswer: "",
                    }              
            })
    }
    
    // SHAFFLE ARRAY FUNCTION
    function shuffleArray(array) {
        let shuffledArray = [].concat(array)
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    
    //DECODE ARRAY FUNCTION
    
    function decodeArray(data){
        return data.map((el)=>he.decode(el))
    }
    
    // RENDERING
    
    return (
        <div className="body">
            {
                welcomeState ? 
                <Welcomescreen  
                    changeWelcomeState={()=>setWelcomeState(false)}
                /> 
                :<Quizz 
                    questions={questions} 
                    fetchData={fetchData}
                />
            }
        </div>
    )
}

