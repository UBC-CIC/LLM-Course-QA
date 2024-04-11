import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import React from 'react';
import './Login.css';
import {useLogin} from "../../hooks/useLogin";
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login} = useLogin();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(email, password);
        if(localStorage.getItem('user')) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='flex items-center justify-center mt-16'>
                <img src="/hand-wave.svg" alt="Hand Wave" className='hand-wave' />
                <p className='text-center text-4xl font-medium leading-[60px] tracking-tighter ml-4'>Welcome to the CourseQA!</p>
            </div>
            <p className='text-2xl font-medium leading-9 text-center mt-4'>Log in to your account</p>
            <div className="w-64">
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
                <Button onClick={handleLogin} className="w-full">Login</Button>
                <p className='text-center text-lg my-5 mx-auto text-blue-400 cursor-pointer' onClick={() => navigate('/signup')}> Don't have an account? Sign up</p>
            </div>
        </div>
    );
};

export default Login;