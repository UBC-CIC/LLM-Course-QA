import React from 'react';

import './Form.css';
import Button from './Button';
import Checkbox from './Checkbox';
import Radio from './Radio';

type FormProps = {
    children: React.ReactNode;
    heading: string;
    buttonText: string;
    width: number;
    height: number;
    checkbox: boolean;
    checkboxLabel?: string;
    formSubmission?: () => void;
}

const Form: React.FC<FormProps> = (props: FormProps) => {
    return (
        <div className='form'
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`
            }}>
            <h1 className='form-heading'>{props.heading}</h1>
            {props.children}
            {props.checkbox ? <Radio options={['Student', 'Instructor']} /> : ""}
            <div className='submission-options'>
                {/* <Checkbox visible={props.checkbox} label={props.checkboxLabel ? props.checkboxLabel : ""} /> */}
                <Button
                    className='form-button'
                    width='100%'
                    height={48}
                    fontSize={18}
                    paddingVertical={5}
                    paddingHorizontal={10}
                    backgroundColour='black'
                    textColour='white'
                    borderRadius={4}
                    onHoverColour='gray-700'
                    disabled={false}
                    onDisabledColour='gray-300'
                    onClick={props.formSubmission}>
                    {props.buttonText}
                </Button>
            </div>
        </div >
    );
};

export default Form;