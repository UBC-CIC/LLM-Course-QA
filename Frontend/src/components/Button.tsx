import { HTMLAttributes, ReactNode, useState } from 'react'
import {Colour} from '../types/theme'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    icon?: FontAwesomeIconProps['icon'];
    iconSize?: SizeProp;
    iconColour?: Colour;
    width: string | 'fit-content' | '100%';
    height?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontSize: number;
    backgroundColour: Colour;
    borderColour?: Colour;
    border?: boolean;
    textColour: Colour;
    borderRadius?: number;
    onHoverColour: Colour;
    disabled?: boolean;
    onDisabledColour?: Colour;
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {

    const [bgColour, setBgColour] = useState(props.backgroundColour)

    const onHover = () => {
        setBgColour(props.onHoverColour)
    }

    const onLeave = () => {
        setBgColour(props.backgroundColour)
    }

    return (
        <button 
            className={`button ${props.disabled && 'disabled'}`} 
            id="button" 
            onClick={props.onClick} 
            onMouseOver={onHover} 
            onMouseLeave={onLeave} 
            style={{
                width: `${props.width}`,
                height: `${props.height ? props.height + 'px' : 'fit-content'}`,
                fontSize: `${props.fontSize}px`,
                fontFamily: 'open-sans',
                fontWeight: 700,
                backgroundColor: `var(--${bgColour})`,
                transition: 'background-color 0.2s ease-in-out',
                cursor: `${props.disabled ? 'not-allowed' : 'pointer'}`,
                color: `var(--${props.textColour})`,
                padding: `${props.paddingVertical ? props.paddingVertical : 16}px ${props.paddingHorizontal ? props.paddingHorizontal : 24}px`,
                border: `${props.border ? `1px solid var(--${props.borderColour})` : 'none'}`,
                borderRadius: `${props.borderRadius !== undefined ? props.borderRadius : 16}px`
            }} 
            disabled={props.disabled}>
            {props.children}
            {props.icon !== undefined ? <FontAwesomeIcon icon={props.icon} size={props.iconSize} color={props.iconColour}/> : ''}
        </button>
    )
}

export default Button;