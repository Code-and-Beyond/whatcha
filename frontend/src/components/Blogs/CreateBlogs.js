import { useState } from 'react'

import Input from '../Input/Input'
import TextBox from '../TextBox/TextBox'
import FillButton from '../Button/Fill'
import Row from '../Row/Row'

let marked = require("marked")


const CreateBlogs = () => {

	const [title, setTitle] = useState('')
	const [blogContent, setBlogContent] = useState('')

	return (
		<div>
			<Row ai='c' jc='sb' extraStyle='u-m-b-s'>
				<h1 className='h h--2'>Write a Blog</h1>
				<FillButton
					extraStyle='text--black'
					text="Go ahead! Post it"
					disabled={ (blogContent && title) === '' }
					type={ 3 }
				// onClickHandler={ handlePostUpload }
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
	)
}

export default CreateBlogs
