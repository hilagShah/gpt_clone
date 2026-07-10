import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./MyContext";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const getReply = async () => {
        setLoading(true);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8000/api/chat", options);
            const resF = await response.json();
            console.log(resF.reply);
            setReply(resF.reply);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(prompt && reply)  {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply]);
    return (
            <div className="chatWindow">
                <div className="navbar">
                    <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>
                    <div className="userIconDiv">
                        <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                    </div>
                </div>
                <Chat setLoading={ setLoading }></Chat>
                {/* <ScaleLoader color="#fff" loading={loading}></ScaleLoader> */}
                <div className="chatInput">
                    <div className="inputBox">
                        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" ? getReply() : ''}placeholder="Ask anything"/>
                        <div id="submit" onClick={getReply}>{loading ? 
                        <ScaleLoader color="#fff" loading={loading}></ScaleLoader> :<i className="fa-solid fa-arrow-up"></i>}</div>
                    </div>
                    <p className="info">
                        SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
                    </p>
                </div>
            </div>
    )
}

export default ChatWindow;