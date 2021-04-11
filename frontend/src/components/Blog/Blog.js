import React from 'react';
import LongText from '../LongText/LongText';


const Blog = (props) => {

	const { title, author, uploadedOn, content } = props;

	return (
		<div className='blog post'>
			<div className='blog__head'>
				<h2 className='h h--2 text--black'>
					{ title }
				</h2>
			</div>
			<div className='blog__details'>
				<div>
					<h4 className='a a--2 text--black h--disabled'>Written By</h4>
					<h4 className='a a--1 text--black'>{ author }</h4>
				</div>
				<div>
					<h5 className='a a--2 text--black h--disabled'>
						Uploaded On
					</h5>
					<h5 className='a a--2 text--black'>
						{ uploadedOn }
					</h5>
				</div>
			</div>
			<div className='blog__content'>
				<LongText content={ content } limit='200' extraStyle='b b--2 text--black'
				/>
			</div>
		</div>
	);
};

export default Blog;;
