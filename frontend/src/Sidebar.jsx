import "./Sidebar.css";
import { MyContext } from "./MyContext";
import { useContext, useEffect } from "react";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);
    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/thread");
            const res = await response.json();
            // console.log(res);
            const filteredData = res.map(thread => ({
                threadId: thread.threadId, 
                title: thread.title
            }));
            // console.log(filteredData);
            setAllThreads(filteredData);
        }
        catch(err) {
            console.log(err);
        }
    }
    // useEffect(() => {
    //     console.log("Sidebar allThreads:", allThreads);
    // }, [allThreads]);
    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        setReply(null);
        try {
            const response = await fetch(`http://localhost:8000/api/thread/${newThreadId}`);
            
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
        }
        catch(err) {
            console.log(err);
        }
    }

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));
            if(threadId === currThreadId) {
                createNewChat();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="sidebar">
            <button onClick={createNewChat}>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"/>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <ul className="history">
                {
                    allThreads?.map((thread) => (
                        <li key={thread.threadId} onClick={() => changeThread(thread.threadId)}>{thread.title}
                        <i className="fa-solid fa-trash" onClick={(e) => {
                            e.stopPropagation(); // stop event bubbling i.e. helps to just click on the child
                            deleteThread(thread.threadId);
                        }}></i></li>
                    ))
                }
                {/* <li key={1}>{allThreads?.[0]?.title} </li> */}
            </ul>

            <div className="sign">
                <p>hello</p>
            </div>
        </div>
    )
}

export default Sidebar;