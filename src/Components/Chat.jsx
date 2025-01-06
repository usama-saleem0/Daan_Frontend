import React, { useEffect, useRef, useState } from "react";
import { baseUrl, socketurl } from "../baseUrl";
import { io } from "socket.io-client";


const Chat = ()=>{

    const socketRef= useRef(null)
    const [user_id,setuserId] = useState('user_id')
    const [gpt_id,setgptId]=useState('1')
    const [Messages,setMessages]=useState([])
    const [prompt,setprompt]=useState('')


    useEffect(()=>{
        socketRef.current=io(socketurl)


        socketRef.current.on('get_previous_messages',(previous_messages)=>{

                // setMessages((prevmessages)=>[...prevmessages,incomingmessage])

                    setMessages(previous_messages)
            console.log(previous_messages,Messages)



        })

        socketRef.current.on('chat_message',(incomingmessage)=>{

            setMessages((previous_messages)=>[...previous_messages,incomingmessage])

        })





        return()=>{

            socketRef.current?.off("previous_messages");
            socketRef?.current.disconnect()
        }

    },[])




    useEffect(()=>{

        if(user_id && gpt_id){
            console.log(gpt_id,user_id,"TS")
            socketRef.current.emit('get_previous_messages',{user_id,gpt_id})

        }



    },[user_id, gpt_id])




    const sendMessage=()=>{
        console.log(prompt,"PROMPT")
        const Message={
            user_id,
            gpt_id,
            message:prompt
        }

        // if(prompt.length>0)
        // {
            socketRef.current.emit('chat_message',Message)
            setprompt('')


        // }
        // else{
        //     alert('Please Enter Input')
        // }


    }


    return(

<section className="chat-main-h">
 
 <>
 TS
 </>

 <div>
        {
            Messages?.map((e,i)=>(

                <div key={i}>
                    <h1>
                        Hello
                    </h1>

                    </div>


            ))
        }

<div>
        <input
        
        placeholder="Search here"
        value={prompt}
        onChange={((e)=>setprompt(e.target.value))}
        
        />

        <button onClick={()=>sendMessage()}>
        Send
        </button>


</div>


 </div>


    </section>

    )





}


export default Chat