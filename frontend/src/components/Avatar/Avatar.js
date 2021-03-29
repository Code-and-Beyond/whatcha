const Avatar = (props) => {
    const { src, extraStyle, size, alt } = props;
    const getClasses = (props) => {
        let classes = ["avatar"];

        if (extraStyle) classes.push(extraStyle);

        return classes.join(" ", ", ");
    };

    return (
        <img
            src={src}
            className={getClasses()}
            style={{ height: size, width: size }}
            alt={alt}
        />
    );
};

export default Avatar;
