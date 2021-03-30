import React from 'react';

const Input = (props) => {
    const { value, placeholder } = props;
    const getClasses = () => {
        let classes = ['input'];

        if (props.extraStyle) classes.push(props.extraStyle);

        return classes.join(' ', ', ');
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            className={getClasses()}
            value={value}
            onChange={(e) => props.handleInput(e.target.value)}
        />
    );
};

export default Input;
