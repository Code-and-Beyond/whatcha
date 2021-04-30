import { useState } from 'react';

import Input from '../Input/Input';
import TextBox from '../TextBox/TextBox';
import FillButton from '../Button/Fill';
import Row from '../Row/Row';
import axios from 'axios';
import { getUser } from '../../helpers/session';

let marked = require("marked");


const CreateBlogs = () => {

	const [title, setTitle] = useState('');
	const [blogContent, setBlogContent] = useState('');
	const [uploading, setUploading] = useState(false);

	const handleBlogUpload = () => {
		setUploading(true);
		axios({
			url: "http://localhost:8080/api/pub/blogs",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				// 'Authorization': 'Bearer ' + getAccessToken()
			},
			data: {
				uid: getUser().id,
				title,
				content: blogContent,
			},

		}).then((res) => {
			if (res.status === 200 && !res.data.error) {
				// setAccessToken(res.data.tokens.access);
				// setRefreshToken(res.data.tokens.refresh);
				setUploading(false);
				setTitle('');
				setBlogContent('');
				console.log(res.data);
			}
		}).catch((err) => console.log(err));
	};

	return (
		<div className='u-p-v-m u-p-h-m'>
			<Row ai='c' jc='sb' extraStyle='u-m-b-s'>
				{ uploading ?
					<h1 className='h h--2'>Uploading...</h1>
					:
					<h1 className='h h--2'>Write a Blog</h1>
				}

				<FillButton
					extraStyle='text--black'
					text="Go ahead! Post it"
					disabled={ (blogContent && title) === '' }
					type={ 3 }
					onClickHandler={ handleBlogUpload }
				/>
			</Row>
			<div className='blogs'>
				<Input
					extraStyle='blogs__input h h--5'
					value={ title }
					handleInput={ (val) => setTitle(val) }
					placeholder="Hey! What's the topic?"
				/>
				<div className='blogs__heads'><h1 className='h h--5'>Markdown Input</h1></div>
				<TextBox
					extraStyle='blogs__textbox'
					rows={ 12 }
					value={ blogContent }
					handleChange={ (val) => setBlogContent(val) }
					placeholder="What are you observations?"
				/>
				<div className='blogs__heads'><h1 className='h h--5'>Markdown Preview</h1></div>
				<div
					className='blogs__preview h h--5'
					dangerouslySetInnerHTML={ {
						__html: marked(blogContent),
					} }
				/>
			</div>
		</div>
	);
};

export default CreateBlogs;
