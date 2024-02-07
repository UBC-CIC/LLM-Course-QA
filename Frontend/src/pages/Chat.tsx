import React, { useState, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import './Chat.css';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export type Message = {
    id: number;
    content: string;
    timestamp: string;
    sender: 'me' | 'other' | 'loading';
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }, [messages]);

    const addNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (newMessage === '') {
            return;
        }

        let sentMessage = messages;
        sentMessage.push({
            id: messages.length + 1,
            content: newMessage,
            timestamp: new Date().toISOString(),
            sender: 'me'
        });

        setMessages(sentMessage);


        const course = localStorage.getItem('selectedCourse');
        const courseId = course ? JSON.parse(course).id : null;

        try {
            const response = await fetch('http://127.0.0.1:5000/queries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: newMessage, course_id: courseId })
            });

            const data = await response.json();

            if (response.ok) {
                const answer = data.response;
                console.log(messages)
                let newMessages = messages;
                newMessages.push({
                    id: messages.length + 1,
                    timestamp: new Date().toISOString(),
                    sender: 'other',
                    content: answer
                });
                setMessages(newMessages); 
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setNewMessage('');
    };

    return (
        <div>
            <Header />
            <div className="chat-container">
                {messages.map((message, index) => (
                    <div key={index}>
                        <ChatMessage
                            key={message.id}
                            id={message.id}
                            content={message.content}
                            timestamp={message.timestamp}
                            sender={message.sender}
                        />
                        {index === messages.length - 1 ? <div ref={messagesEndRef} /> : null}
                    </div>
                ))}
            </div>
            <div className="new-message-container">
                <input
                    id='message-input'
                    type="text"
                    value={newMessage}
                    onChange={addNewMessage}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSendMessage();
                        }
                    }} />
                <FontAwesomeIcon
                    className='send-icon'
                    icon={faPaperPlane}
                    onClick={handleSendMessage}
                    size='2x'
                    color='rgb(76, 147, 175)' />
            </div>
        </div>
    );
}

export default Chat;

