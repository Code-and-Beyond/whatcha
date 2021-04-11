import React from 'react';
import LongText from '../LongText/LongText';

const Blog = () => {
	return (
		<div className='blog post'>
			<div className='blog__head'>
				<h2 className='h h--2 text--black'>
					Can AI Generate Programs to Help Automate Busy Work?
				</h2>
			</div>
			<div className='blog__details'>
				<div>
					<h5 className='a a--2 text--black h--disabled'>Written By</h5>
					<h4 className='a a--1 text--black'>Ramji Rathore</h4>
				</div>
				<h5 className='b b--3 text--black'>
					Uploaded On: 11/12/2020
				</h5>
			</div>
			<div className='blog__content'>
				<LongText content="There are an estimated 250 million knowledge workers in the world, a term that encompasses anybody engaged in professional, technical or managerial occupations. These are individuals who, for most part, perform non-routine work that requires the handling of information and exercising the intellect and judgement. We, the authors of this blog post, count ourselves among them. So are a majority of you reading this post, regardless of whether you're a developer, data scientist, business analyst or manager.Although a majority of knowledge work tends to be non-routine, there are, nevertheless, many situations in which knowledge workers find ourselves doing tedious repetitive tasks as part of our day jobs, especially around tasks that involve manipulating data.In this blog post, we take a look at Microsoft PROSE, an AI technology that can automatically produce software code snippets at just the right time and in just the right situations to help knowledge workers automate routine tasks that involve data manipulation. These are generally tasks that most users would otherwise find exceedingly tedious or too time consuming to even contemplate.Details of Microsoft PROSE can be obtained from GitHub here: https://microsoft.github.io/prose/."
					limit='250' extraStyle='b b--2 text--black'
				/>
			</div>
		</div>
	);
};

export default Blog;;
