// import "./Chat.css";
// import { useContext, useState, useEffect } from "react";
// import { MyContext } from './MyContext';
// //react-markdown
// //rehype-highlight
// import ReactMarkdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css"



// function Chat({ setLoading }) {
//     const { newChat, prevChats, reply} = useContext(MyContext);
//     const [latestReply, setLatestReply] = useState("");

//     useEffect(() => {
//         if(!prevChats?.length) return;
//         const content = reply.split(" ");
//         let idx = 0;
//         const interval = setInterval(() => {
//             setLatestReply(content.slice(0, idx + 1).join(" "));
//             idx++;
//             if(idx >= content.length) {
//                 clearInterval(interval);
//                 setLoading(false);
//             }
//         }, 40);
//         return () => clearInterval(interval);
//     }, [prevChats, reply])
//     return (
//         <>
//             {newChat && prevChats.length == 0 && <h1>What's on your mind today</h1>}
//             <div className="chats">
//                 {
//                     prevChats?.slice(0, -1).map((chat, idx) => 
//                         <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
//                             {
//                                 chat.role === "user" ? 
//                                 <p className="userMessage">{chat.content}</p> :
//                                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
//                             }
//                         </div>
//                     )
//                 }
//                 {
//                     prevChats.length > 0 && (
//                         latestReply !== "" ? (
//                             <div className="gptDiv">
//                                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//                                     {latestReply}
//                                 </ReactMarkdown>
//                             </div>
//                         ) : (
//                             <div className="gptDiv">
//                                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
//                                     {prevChats[prevChats.length - 1]?.content}
//                                 </ReactMarkdown>
//                             </div>
//                         )
//                     )
//                 }
//             </div>
//         </>
//     )
// }
// export default Chat;


import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat({ setLoading }) {
    const { newChat, prevChats, reply } = useContext(MyContext);

    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        // No new reply -> show stored chat normally
        if (!reply) {
            setLatestReply(null);
            return;
        }

        // Start new typing animation
        setLatestReply("");

        const words = reply.split(" ");
        let idx = 0;

        const interval = setInterval(() => {
            setLatestReply(words.slice(0, idx + 1).join(" "));

            idx++;

            if (idx >= words.length) {
                clearInterval(interval);
                setLoading(false);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [reply, setLoading]);

    return (
        <>
            {newChat && prevChats.length === 0 && (
                <h1>What's on your mind today</h1>
            )}

            <div className="chats">

                {prevChats
                    ?.slice(0, -1)
                    .map((chat, idx) => (
                        <div
                            key={idx}
                            className={
                                chat.role === "user"
                                    ? "userDiv"
                                    : "gptDiv"
                            }
                        >
                            {chat.role === "user" ? (
                                <p className="userMessage">
                                    {chat.content}
                                </p>
                            ) : (
                                <ReactMarkdown
                                    rehypePlugins={[rehypeHighlight]}
                                >
                                    {chat.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    ))}

                {prevChats.length > 0 && (
                    <div className="gptDiv">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {latestReply !== null
                                ? latestReply
                                : prevChats[prevChats.length - 1]?.content}
                        </ReactMarkdown>
                    </div>
                )}

            </div>
        </>
    );
}

export default Chat;