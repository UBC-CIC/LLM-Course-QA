import React from 'react';
import './Checkbox.css';

interface CheckboxProps {
    label: string;
    visible: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {

    return (
        <div style={{  display: (props.visible ? "none" : "flex"), flexDirection: "row" }}>
            <input type="checkbox" className="checkbox" name="remember-me" value="1" />
            <p className="checkbox-label">{props.label}</p>
        </div>
    );
};

export default Checkbox;
