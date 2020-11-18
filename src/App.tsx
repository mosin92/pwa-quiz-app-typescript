import React,{useState} from 'react';
import { QuestionCard } from './Components/QuestionCard';
import { FetchQuestion } from './Components/Api';
import { Difficulty, QuestionState } from './Components/Api'
import {GlobalStyle, Wrapper} from '../src/App.style'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctanswer: string;
}

const TOTAL_Q = 10;
function App() {

  const [loading, setloading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [number, setnumber] = useState(0);
  const [useranswer, setanswer] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState(0);
  const [gameover, setgameover] = useState(true);

  // console.log(FetchQuestion(TOTAL_Q, Difficulty.Easy));
  // console.log(questions);
  const GetData= async () =>  {
       
    setloading(true);
    setgameover(false);
    const NewQuestion = await FetchQuestion(TOTAL_Q, Difficulty.Easy);
    setquestions(NewQuestion);
    setscore(0);
    setnumber(0);
    setloading(false);
  }
  
  const CheckAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    if (!gameover) {
      //user answer
      const answer = e.currentTarget.value;
      //check answer against correct answer whether it is correct or not 
      const correct = questions[number].correct_answer === answer;
      if (correct)
        setscore(prev => prev + 1);
      const answerobject= {
        question: questions[number].question,
        answer,
        correct,
        correctanswer:questions[number].correct_answer,
      }
      setanswer(prev => ([...prev, answerobject]));
    }

  }
  function NextQuestion() {
    const nextqusetion = number + 1;
    if (nextqusetion === TOTAL_Q) {
      setgameover(true);
    }
    else {
      setnumber(nextqusetion);
    }
  }

  return (
    <>
      <GlobalStyle/>
    <Wrapper >
      <h1>React Quiz </h1>
      {
        gameover || useranswer.length === TOTAL_Q ? (
      
          <button onClick={GetData}>Start Quiz</button>
        ) : null
      }
      {!gameover ?
        <p>Score : {score}</p> :
        null
      }
      { loading ?
        <p>Loading Questions...</p>
        :
        null
      }
      {
        !gameover && !loading&&(   //Last && is shorthand to handle ternarory operator.we can used follow actuall procedure
       //Fisrt && is basicallly 'And' operator 
          <QuestionCard
      
        QuestionNr={number + 1}
        TotalQuestion={TOTAL_Q}
        Question={questions[number].question}
        Answer={questions[number].answers}
        UserAnswer={useranswer ? useranswer[number] : undefined}
        CallBack={CheckAnswer}
      />
        )}
      {
        !gameover && !loading && useranswer.length === number + 1 && number !== TOTAL_Q - 1 ? (
      
          <button onClick={NextQuestion} >Next Question</button>
        ) : null
      }
    </Wrapper>
      </>
  );
      
}

export default App;
