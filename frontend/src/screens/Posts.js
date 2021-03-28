import { useState } from 'react'

import PostHeader from '../components/Header/PostNav'
import Post from '../components/Post/Post'
import Modal from '../components/Modal/Modal'
import TextBox from '../components/TextBox/TextBox'
import FillButton from '../components/Button/Fill'
import Row from '../components/Row/Row'
import Icon from '../components/Icon/Icon'

import imageIcon from '../assets/icons/ico-image.svg'
import trashIcon from '../assets/icons/ico-trash.svg'

const PostsScreen = () => {

	//temporary posts array
	const [posts, setPosts] = useState([])

	const initialAttachment = {
		raw: "",
		preview: ""
	}
	const [showPostModal, setShowPostModal] = useState(false)
	const [postContent, setPostContent] = useState('')
	const [attachment, setAttachment] = useState(initialAttachment)

	const handleAttachmentChange = (e) => {
		if (e.target.files.length) {
			setAttachment({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0]
			})
		}
	}

	const handlePostUpload = () => {
		setShowPostModal(false)
		const totalPostData = {
			postContent,
			attachment
		}
		setPosts([...posts, totalPostData])
	}

	const getModal = () => (
		<Modal open={ showPostModal } title='Create a Post' handleClose={ () => setShowPostModal(false) } width='40vw' btnText='Post'  >
			<TextBox
				rows={ 17 }
				value={ postContent }
				handleChange={ (val) => setPostContent(val) }
				placeholder='What do you want to talk about?'
			/>
			{ attachment.preview ?
				<div className='modal__previewContainer'>
					<img src={ attachment.preview } className='modal__preview' alt='preview' />
					<Icon src={ trashIcon } extraStyle='modal__preview--trashIcon u-c-pointer' alt="trash" size="m" onClickHandler={ () => setAttachment(initialAttachment) } />
				</div> : null
			}
			<Row jc="sb">
				<div className='d--f ai--c'>
					<label htmlFor="upload-button">
						{
							<Icon src={ imageIcon } extraStyle='u-c-pointer' alt="Close" size="s" />
						}
					</label>
					<input type="file" id="upload-button" style={ { display: 'none' } } onChange={ handleAttachmentChange } />
					<br />
				</div>
				<FillButton extraStyle='modal__btn' text='Post' disabled={ postContent === '' } type={ 1 } onClickHandler={ handlePostUpload } />
			</Row>
		</Modal>
	)

	return (
		<div className='posts'>
			<PostHeader setShowPostModal={ () => setShowPostModal(true) } />
			{ getModal() }
			<div className='posts__container u-p-h-m'>
				{ posts.map((post) => <Post content={ post.postContent } attachment={ post.attachment.preview } />) }
			</div>
		</div>
	)
}

export default PostsScreen
