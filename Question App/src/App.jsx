import { useEffect, useState } from 'react'
import './App.css'
import { Data } from './data';
const alphabet = ["a","b","c","d","e","f","g","ğ","h","ı","i","j","k","l","m","n","o","ö","p","r","s","ş","t","u","ü","v","y","z"]

function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [resultOuestion, setResultQuestion] = useState(false);
  const [isWrong, setWrong] = useState(false);
  
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  const setKeyword = (keyword) => {
    if(keywords.length < answer.length){
    keywords.push(keyword);
    setKeywords([...keywords]);
    }

    if(keywords.length == answer.length){
      //To join the selected letters.
      if(answer == keywords.join("")){
        alert("Answer is true!");
        setIndex(index + 1);
        setKeywords([]);
        setResultQuestion(true);
      }
      else {
        setWrong(true);
        alert("Answer is wrong!");
      }
    }
  }

  useEffect( () => {
    setWrong(false);
    setResultQuestion(false);
    setAnswer("");
    if(typeof Data[index] !== "undefined") {
    const answer = Data[index].answer.toUpperCase();
    setAnswer(answer);
    setQuestion(Data[index].question);
    //To seperate the answer into letters. 
    const stringToArray = answer.split("");
    //To add a random letter to stringToArray.
    stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    const alphabetToUpperData = stringToArray.map((answer) => answer.toUpperCase());
    setAnswerArray(shuffle(alphabetToUpperData));
    console.log(shuffle(alphabetToUpperData));
    }
  }, [resultOuestion]);

  const removeKeywords = (index) => {
    keywords.splice(index, 1);
    setKeywords([...keywords]);
    //Creates the updated array as a new array.
  }

  return (
    
      <div className="App">
        {/*If answer isn't empty*/}
        {answer !== "" &&
        <div>
          <div>
          <span className="question-name">{question}</span>
          </div>
          <div className="question-area">
          {/* Represents each selected letter from the keywords*/}
          {keywords.map((item, index) => (
            <span className="question" onClick={() => removeKeywords(index)} key={index}>
              {item}
            </span>
          ))}
          </div>
          <div className="button-area">
          {/* Represents each element (letters) in the answerArray using item, and index represents its position. */}
          {answerArray.map((item, index) => (
            <button className="button" key={index} onClick={() => setKeyword(item) }>{item}
            </button>
          ))}
          </div>
        </div>
        }
        {answer == "" &&
             <div className="empty-message">Questions are completed!</div> 
        }
      </div>    
  )
}

export default App;
