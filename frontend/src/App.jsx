import './App.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { useState } from 'react';
import { MyContext } from './MyContext';
import {v1 as uuidv1} from "uuid";
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null); 
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const providerValue = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, setAllThreads
  };

  return (
    <div className='app'>
      <MyContext.Provider value = {providerValue}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App;