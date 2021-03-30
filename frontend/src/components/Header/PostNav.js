import TextButton from '../../components/Button/Text';
import Avatar from '../Avatar/Avatar';
import avatar from '../../assets/profile/me.jpeg';

const PostNavHeader = (props) => {
    return (
        <div className="posts__header">
            <div className="posts__header--top">
                <Avatar
                    src={avatar}
                    extraStyle="u-c-pointer"
                    alt="user avatar"
                />
                <h3 className="h h--3 u-m-l-m">Feed</h3>
                <h3 className="h h--3 u-m-l-m">Trending</h3>
                <h3 className="h h--3 u-m-l-m">Blogs</h3>
                <TextButton extraStyle="u-m-l-auto" text="Logout" type={1} />
            </div>
            <div
                className="posts__header--start"
                onClick={props.setShowPostModal}
            >
                <h1 className="h h--5 u-c-pointer">Start a Post</h1>
            </div>
        </div>
    );
};

export default PostNavHeader;
