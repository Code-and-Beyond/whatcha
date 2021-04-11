import { useState, useEffect } from 'react';
import axios from 'axios';

import PostHeader from '../components/Header/PostNav';
import Post from '../components/Post/Post';
import Modal from '../components/Modal/Modal';
import TextBox from '../components/TextBox/TextBox';
import FillButton from '../components/Button/Fill';
import Row from '../components/Row/Row';
import Icon from '../components/Icon/Icon';

import imageIcon from '../assets/icons/ico-image.svg';
import trashIcon from '../assets/icons/ico-trash.svg';
import {
    getUser,
    getAccessToken,
    setAccessToken,
    setRefreshToken,
} from '../helpers/session';

const PostsScreen = () => {
    //temporary posts array
    const [posts, setPosts] = useState([]);

    const initialAttachment = {
        raw: '',
        preview: '',
    };

    const [uploadPost, setUploadPost] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [attachment, setAttachment] = useState(initialAttachment);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/pub/posts')
            .then((res) => {
                const data = res.data.data;
                setPosts(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAttachmentChange = (e) => {
        if (e.target.files.length) {
            setAttachment({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };

    const handlePostUpload = () => {
        setShowPostModal(false);
        const totalPostData = {
            postContent,
            attachment,
        };
        console.log(totalPostData);
        setPosts([...posts, totalPostData]);
        setUploadPost(true);

        const reader = new FileReader();
        reader.readAsDataURL(attachment.raw);
        reader.onloadend = () => {
            console.log(reader.result);
            axios({
                url: 'http://localhost:8080/api/pub/post',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + getAccessToken(),
                },
                data: {
                    uid: getUser().id,
                    content: postContent,
                    encodedImg: reader.result,
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000,
            })
                .then((res) => {
                    if (res.status === 200 && !res.data.error) {
                        setPostContent('');
                        setAttachment(initialAttachment);
                        setUploadPost(false);
                        setAccessToken(res.data.tokens.access);
                        setRefreshToken(res.data.tokens.refresh);
                        // console.log(res.data.data);
                    }
                })
                .catch((err) => console.log(err));
        };
        reader.onerror = () => {
            console.log('Somehting went wrong!');
        };
    };

    const getModal = () => (
        <Modal
            open={showPostModal}
            title="Create a Post"
            handleClose={() => setShowPostModal(false)}
            width="40vw"
            btnText="Post"
        >
            <TextBox
                rows={17}
                value={postContent}
                handleChange={(val) => setPostContent(val)}
                placeholder="What do you want to talk about?"
            />
            {attachment.preview ? (
                <div className="modal__previewContainer">
                    <img
                        src={attachment.preview}
                        className="modal__preview"
                        alt="preview"
                    />
                    <Icon
                        src={trashIcon}
                        extraStyle="modal__preview--trashIcon u-c-pointer"
                        alt="trash"
                        size="m"
                        onClickHandler={() => setAttachment(initialAttachment)}
                    />
                </div>
            ) : null}
            <Row jc="sb">
                <div className="d--f ai--c">
                    <label htmlFor="upload-button">
                        {
                            <Icon
                                src={imageIcon}
                                extraStyle="u-c-pointer"
                                alt="Close"
                                size="s"
                            />
                        }
                    </label>
                    <input
                        type="file"
                        id="upload-button"
                        style={{ display: 'none' }}
                        onChange={handleAttachmentChange}
                    />
                    <br />
                </div>
                <FillButton
                    extraStyle="modal__btn"
                    text="Post"
                    disabled={postContent === ''}
                    type={1}
                    onClickHandler={handlePostUpload}
                />
            </Row>
        </Modal>
    );

    const getPostLoadingCard = () =>
        uploadPost ? (
            <div className="posts__loadingCard">
                <h1 className="h h--3 text--black"> Creating Post...</h1>
            </div>
        ) : null;

    return (
        <div className="posts">
            <PostHeader setShowPostModal={() => setShowPostModal(true)} />
            {getModal()}
            <div className="posts__container u-p-h-m">
                {getPostLoadingCard()}
                {posts.length &&
                    posts.map((post, index) => (
                        <Post
                            key={index}
                            postId={post.pid}
                            content={post.content}
                            upvotes={post.upvotes}
                            attachment={post.imgUrl}
                            createdAt={post.createdAt}
                            name={post.fullname}
                            email={post.username}
                            displayPicture={post.image}
                        />
                    ))}
            </div>
        </div>
    );
};

export default PostsScreen;
