import React from 'react'
import Icon from '../Icon/Icon'
import Row from '../Row/Row'

import closeIcon from '../../assets/icons/ico-close.svg'

const Modal = (props) => {
	const { open, title, height, width } = props
	return (
		open &&
		<div className='backdrop'>
			<div className='modal' style={ { height: height, width: width } }>
				<Row ai="c" jc="sb">
					<h1 className="h h--2 text--black">{ title }</h1>
					<Icon src={ closeIcon } alt="Close" onClickHandler={ () => props.handleClose(false) } size="s" />
				</Row>
				<div className='u-p-t-s'>
					{ props.children }
				</div>
			</div>

		</div>

	)
}

export default Modal
