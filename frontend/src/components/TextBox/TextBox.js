import React from 'react'

const TextBox = (props) => {
	const { value, rows, cols, required, wrap, placeholder, maxLength, name, readOnly } = props

	const getClasses = () => {
		let classes = ["textbox h h--5"]

		if (props.extraStyle) classes.push(props.extraStyle)

		return classes.join(' ', ", ")
	}

	return (
		<textarea
			className={ getClasses() }
			value={ value }
			onChange={ (e) => props.handleChange(e.target.value) }
			rows={ rows }
			cols={ cols }
			wrap={ wrap }
			required={ required }
			maxLength={ maxLength }
			placeholder={ placeholder }
			name={ name }
			readOnly={ readOnly }
		/>
	)
}

export default TextBox
