import React, { useState } from 'react';

let marked = require('marked');


const LongText = (props) => {
	const [showAll, setShowAll] = useState(false);

	const { content, limit } = props;

	const getClasses = () => {
		let classes = ['blog--pre'];

		if (props.extraStyle) classes.push(props.extraStyle);

		return classes.join(' ', ', ');
	};

	if (content.length <= limit) {
		// there is nothing more to show
		return <div className={ getClasses() } dangerouslySetInnerHTML={ {
			__html: marked(content),
		} } />;
	}
	if (showAll) {
		// We show the extended text and a link to reduce it
		return (
			<div>
				<pre className={ getClasses() }
					dangerouslySetInnerHTML={ {
						__html: marked(content),
					} }
				/>
				<h2
					style={ {
						fontWeight: 600,
						cursor: 'pointer',
						color: 'grey',
					} }
					onClick={ () => setShowAll(false) }
				>
					Read less
				</h2>
			</div>
		);
	}
	// In the final case, we show a text with ellipsis and a `Read more` button
	const toShow = content.substring(0, limit) + '...';
	return (
		<React.Fragment>
			<h1 className={ getClasses() }
				dangerouslySetInnerHTML={ {
					__html: marked(toShow),
				} }
			/>
			<h2
				style={ { fontWeight: 600, cursor: 'pointer', color: 'blue' } }
				onClick={ () => setShowAll(true) }
			>
				Read more
			</h2>
		</React.Fragment>
	);
};

export default LongText;
