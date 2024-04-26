import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { useNavigate } from 'react-router-dom'
import {useSignup} from "../../hooks/useSignup";
import userpool from '@/lib/userpool';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
  } from "@/components/dialog/Dialog"

import React from 'react';
import './Login.css';

const Signup  = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [code, setCode] = React.useState('');

    const {signup} = useSignup();
    const navigate = useNavigate();

    const handleSignup = async () => {
        const attributes = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            }),
            new CognitoUserAttribute({
                Name: 'name',
                Value: name
            })
        ];

        try {
            const result : ISignUpResult = await new Promise((resolve, reject) => {
                userpool.signUp(email, password, attributes, [], (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        if(result){
                            resolve(result);
                        }
                    }
                });
            });

            if (result) {
                let userId = result.userSub;
                await signup(userId);
                setOpen(true);
            }
        }
        catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const handleVerification = async () => {
        const user = new CognitoUser({
            Username: email,
            Pool: userpool
        });

        try {
            const result = await new Promise((resolve, reject) => {
                user.confirmRegistration(code, true, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        if(result){
                            resolve(result);
                        }
                    }
                });
            });

            if (result) {
                setOpen(false);
                navigate('/');
                window.location.reload();
            }
        }
        catch (error) {
            console.error('Verification failed:', error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='flex items-center justify-center mt-16'>
                <img src="/hand-wave.svg" alt="Hand Wave" className='hand-wave' />
                <p className='text-center text-4xl font-medium leading-[60px] tracking-tighter ml-4'>Sign up for CourseQA!</p>
            </div>

            <p className='text-2xl font-medium leading-9 text-center my-4'>Sign up</p>
            <div className="w-64">
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-4" />
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
                <Button onClick={handleSignup} className="w-full">Signup</Button>
            </div>

            <Dialog open={open} >
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Verify your email</DialogTitle>
                    <DialogDescription>
                        Please enter the verification code sent to your email.
                    </DialogDescription>
                        <Input placeholder="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <Button onClick={handleVerification} className="w-full">Verify</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Signup;