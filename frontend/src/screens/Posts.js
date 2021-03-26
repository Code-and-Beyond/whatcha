import PostHeader from '../components/Header/PostNav'
import Post from '../components/Post/Post'

const PostsScreen = () => {
	return (
		<div className='posts'>
			<PostHeader />
			<div className='posts__container u-p-h-m'>
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	)
}

export default PostsScreen
