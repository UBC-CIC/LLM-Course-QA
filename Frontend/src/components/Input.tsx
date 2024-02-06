import React from 'react';
import './Input.css';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import Utils from '../utils/utils';

type InputProps = {
    icon: FontAwesomeIconProps['icon'];
    placeholder: string;
    width?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    fontSize?: number;
    type?: string;
    state?: string;
    errorText?: string;
    inputId: string;
    placholderIn?: boolean;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
    return (
        <div className="input-container">
            <div className="input" style={{
                marginBottom: props.marginBottom || '24px',
                marginLeft: props.marginLeft || '0px',
                marginRight: props.marginRight || '0px',
            }}>
                <label className="input-label">
                    {props.placholderIn ? "" : props.placeholder}
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input
                            id={props.inputId}
                            onChange={props.onChange}
                            className="text-input"
                            type={props.type || 'text'}
                            placeholder={props.placholderIn ? props.placeholder : ""}
                            style={{
                                width: props.width || '364px',
                                fontSize: props.fontSize ? `${props.fontSize}px` : '20px',
                                borderColor: props.errorText ? '#dc3545' : '#ced4da',
                                color: props.errorText ? '#dc3545' : '#495057',
                                backgroundColor: props.errorText ? '#f8d7da' : '#fff',
                            }}
                        />
                        <div 
                            className="icon-container"
                            style={{
                                cursor: props.onClick ? "pointer" : "default",
                                backgroundColor: props.onClick ? '#fff' : "#e9ecef",
                            }}
                            onClick={props.onClick}>
                            <FontAwesomeIcon 
                                icon={props.icon} 
                                fontSize={(props.fontSize) ? `${props.fontSize*1.3}px` : "24px"} 
                                color={"#495057"} />
                        </div>
                    </div>
                    <p className="input-error" id={`${props.inputId}-error`}>{props.errorText}</p>
                </label>
            </div>
        </div>
    );
}

export default Input;
