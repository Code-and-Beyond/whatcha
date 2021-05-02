const Avatar = (props) => {
	const { src, extraStyle, size, alt, bg, noRad } = props;
	const getClasses = (props) => {
		let classes = ['avatar'];

		if (noRad) classes.push('avatar__noRad');
		if (extraStyle) classes.push(extraStyle);

		return classes.join(' ', ', ');
	};

	return (
		<div className={ bg ? 'avatar avatar__back' : null } onClick={ props.handleClick } style={ { display: 'flex', alignItems: 'center' } }>
			<img
				src={ src }
				className={ getClasses() }
				style={ { height: size, width: size } }
				alt={ alt }
			/>
		</div >
	);
};

export default Avatar;
