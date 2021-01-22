import React,{useState, useEffect, useCallback} from 'react';
import {AnswersList, Chats} from './components/index';
import './assets/styles/styles.css';
import FormDialog from './components/Form/FormDialog';
import {db} from './Firebase/index'

const App = () => {

  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState('init')
  const [dataset, setDataset] = useState({})
  const [open, setOpen] = useState(false)


  // 回答選択後に、その回答に対して次の質問を表示
  const displayNextQuestion = (currentId, dataset) => {

    addChats({
      text: dataset.questions,
      type: 'question'
    });
    setCurrentId(currentId)
    setAnswers(dataset.answers)
  }

  // 回答選択後にその回答がchats表示される
  const selectAnswer = (selectedAnswer, selectedCurrentId) => {
    switch(true){

      case(selectedCurrentId === "contact"):
        handleOpen();
      break;

      case(/＾https:＊/.test(selectedCurrentId)):
        const a = document.createElement("a");
        a.href = selectedCurrentId;
        a.target = "_blank";
        a.click();
      break;

      default:
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })

        setTimeout(()=> displayNextQuestion(selectedCurrentId, dataset[selectedCurrentId]), 500);
      break;
    }
  }

  const addChats = (chat) => {
      setChats(prevChats => {
        return [...prevChats, chat]
      })
  }

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = useCallback(() => {
      setOpen(false)
  },[setOpen]);

  useEffect( () => {
    (async() => {
      const initDataset = {}

      await db.collection('questions').get().then(snapshots => {
          snapshots.forEach( doc => {
            const id = doc.id;
            const data = doc.data()
            initDataset[id] = data;
          })
      })

      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })();
  }, [])

  useEffect( () => {
    const scrollArea = document.getElementById("scroll-area");
    if(scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  })

  return (
    <section className="section">
      <div className="box">
        <Chats chats={chats}/>
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog 
          open={open} handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </div>
    </section>
  );
}

export default App
