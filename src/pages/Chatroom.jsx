import React from 'react';
import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import 'bootstrap/dist/css/bootstrap.min.css';


function Chatroom(){
    const[hubConnection, sethubConnection] = useState(null);
    const[text, setText] = useState("");
    const[messageList, setMessageList] = useState([]);

    useEffect(() => {
        createHubConnection();
    }, []);
    const createHubConnection = async () => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7023/Chat')
            .configureLogging(LogLevel.Information)
            .build();
        try {
            await hubConnection.start();
            console.log('Hub connection started');
        } catch (error) {
            console.log(error);
        }
            sethubConnection(hubConnection);
    } 

    useEffect(() => {
        if(hubConnection){
            hubConnection.on('ReceiveMessage', (message) => {
                setMessageList(prevState => {
                    return prevState.concat(message);
                });
            });
        }
    }, [hubConnection]);
    

    const sendMessage = async () => {
        if(hubConnection){
            hubConnection.invoke("SendMessage", text); 
        }
    }

    return(
        <div className='Chatroom'>  
            <header className='Chatroom-header'>
                <h1>Chatroom</h1>
                <input value={text} onChange={(e) => {setText(e.target.value)}}/>
                <button onClick={sendMessage}>Send</button>

                <div>
                    <h2>messages</h2>
                    <ul>
                        {messageList.map((item, index) => {
                            return <li key={index}>{item}</li>
                            })}
                    </ul>
                </div>
            </header>
        </div>

    );
}

export default Chatroom;