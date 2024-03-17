import React from 'react';

import './Form.css';
import {Button} from '../button/Button';

type FormProps = {
    children: React.ReactNode;
    heading: string;
    buttonText: string;
    width: number;
    height: number;
    formSubmission?: () => void;
}

const Form: React.FC<FormProps> = (props: FormProps) => {
    return (
      // tailwind wrapper with small border radius
        <div className='form-wrapper border-2 p-6 rounded-lg'>
        <div className='form'
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`
            }}>
            <h1 className='form-heading'>{props.heading}</h1>
            {props.children}
            <div className='submission-options'>
                <Button variant='default' className='mt-6'>
                  {props.buttonText}
                </Button>
            </div>
        </div>
      </div>
    );
};

export default Form;