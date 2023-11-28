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

const mockMessages: Message[] = [
    {
        id: 1,
        content: "Hey, what is CPEN 491 about?",
        timestamp: "2021-09-01T12:00:00Z",
        sender: "me"
    },
    {
        id: 2,
        content: `CPEN 491 is a 10 credit capstone course. According to the course syllabus, the course is related to design, analysis, and implementation of solutions in response to a real world computer engineering problem, provided by industry, research laboratories, or other suitable entities. It Includes coverage of topics such as project management.`,
        timestamp: "2021-09-01T12:01:00Z",
        sender: "other"
    },
    {
        id: 3,
        content: "What is each part of the course worth?",
        timestamp: "2021-09-01T12:02:00Z",
        sender: "me"
    },
];

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages(mockMessages);
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }, [messages]);

    const addNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage === '') {
            return;
        }
        mockMessages.push({
            id: mockMessages.length + 1,
            timestamp: new Date().toISOString(),
            sender: 'me',
            content: newMessage
        });

        setNewMessage('');

        const updateMessages = [...mockMessages];
        setMessages(updateMessages);
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

