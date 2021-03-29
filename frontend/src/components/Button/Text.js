import React from "react";

const TextButton = (props) => {
    const getClasses = () => {
        let classes = ["button button--text a a--1 u-c-pointer"];

        switch (props.type) {
            case 1:
                classes.push("button--no-fill--primary");
                break;
            case 2:
                classes.push("button--no-fill--error");
                break;
            case 3:
                classes.push("button--no-fill--warning");
                break;
            case 4:
                classes.push("button--no-fill--info");
                break;
            case 5:
                classes.push("button--no-fill--success");
                break;
            default:
                classes.push("button--no-fill--normal");
        }

        if (props.extraStyle) classes.push(props.extraStyle);

        return classes.join(" ", ", ");
    };

    return (
        <div className={getClasses()} onClick={props.onClickHandler}>
            {props.text}
        </div>
    );
};

export default TextButton;
