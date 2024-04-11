import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { useNavigate } from 'react-router-dom'
import {useSignup} from "../../hooks/useSignup";

import React from 'react';
import './Login.css';

const Signup  = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {signup} = useSignup();
    const navigate = useNavigate();

    const handleSignup = async () => {
        await signup(name, email, password, 'Student' );
        navigate('/')
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='flex items-center justify-center mt-16'>
                <img src="/hand-wave.svg" alt="Hand Wave" className='hand-wave' />
                <p className='text-center text-4xl font-medium leading-[60px] tracking-tighter ml-4'>Sign up for CourseQA!</p>
            </div>

            <p className='text-2xl font-medium leading-9 text-center mt-4'>Sign up</p>
            <div className="w-64">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4" />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
                <Button onClick={handleSignup} className="w-full">Signup</Button>
            </div>
        </div>
    );
};

export default Signup;