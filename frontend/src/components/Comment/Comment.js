import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getUser } from '../../helpers/session';

import Avatar from '../Avatar/Avatar';
import Row from '../Row/Row';

import upVote from '../../assets/icons/upvote.svg';
import upVoteActive from '../../assets/icons/upvote-active.svg';

import axios from 'axios';

const Comment = (props) => {
    const { commentId, name, image, bio, time, text, likesCount } = props;
    const commentTime = moment(new Date(time)).fromNow();

    const [like, setLike] = useState(false);
    const [likesCounter, setLikesCounter] = useState(likesCount);

    const checkForLike = (commentId) => {
        axios({
            method: 'GET',
            url: `http://localhost:8080/api/pub/posts/comments/${commentId}/likes/${
                getUser().id
            }`,
        })
            .then((res) => {
                if (res.status === 200 && !res.data.error) {
                    const data = res.data.data;
                    if (data.length) setLike(true);
                    else setLike(false);
                    console.log(data);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        checkForLike(commentId);
        console.log('useEffect');
    }, [like, commentId]);

    const handleToogleLike = () => {
        if (!like) {
            setLike(true);

            setLikesCounter(likesCounter + 1);
            axios({
                method: 'POST',
                url: `http://localhost:8080/api/pub/posts/comments/${commentId}/likes`,
                data: {
                    uid: getUser().id,
                },
            })
                .then((res) => {
                    if (res.status === 200 && !res.data.error) {
                        console.log(res.data.message);
                        axios({
                            method: 'PUT',
                            url: `http://localhost:8080/api/pub/posts/comments/${commentId}`,
                            data: {
                                likesCount: likesCounter + 1,
                            },
                        }).then((res) => {
                            if (res.status === 200 && !res.data.error) {
                                console.log(res.data.message);
                            }
                        });
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setLike(false);
            setLikesCounter(likesCounter - 1);
            axios({
                method: 'DELETE',
                url: `http://localhost:8080/api/pub/posts/comments/${commentId}/likes/${
                    getUser().id
                }`,
            })
                .then((res) => {
                    if (res.status === 200 && !res.data.error) {
                        console.log(res.data.message);
                        axios({
                            method: 'PUT',
                            url: `http://localhost:8080/api/pub/posts/comments/${commentId}`,
                            data: {
                                likesCount: likesCounter - 1,
                            },
                        }).then((res) => {
                            if (res.status === 200 && !res.data.error) {
                                console.log(res.data.message);
                            }
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <Row extraStyle="u-m-v-s">
            <Avatar src={image} alt="user avatar" size="4.5rem" />
            <div className="comment">
                <div className="comment__container">
                    <Row ai="c" jc="sb">
                        <h2 className="b b--3 text--black">{name}</h2>
                        <p className="b b--4 text--black">{commentTime}</p>
                    </Row>
                    <p className="b b--4 text--black">{bio}</p>
                    <p className="comment__body b b--3">{text}</p>
                </div>
                <div onClick={handleToogleLike}>
                    {!like ? (
                        <img
                            src={upVote}
                            className="post__icons--upvote"
                            alt="upvote"
                        />
                    ) : (
                        <img
                            src={upVoteActive}
                            className="post__icons--upvote"
                            alt="upvote"
                        />
                    )}
                    <h3 className="a a--2 a--name text--black">
                        Like{!like ? '' : 'd'}
                    </h3>
                </div>
                <div
                    className="comment__button u-c-pointer b b--4"
                    onClick={props.onReplyHandler}
                >
                    Reply
                </div>
                <div className="b b--3 text--black d--f ai--c">
                    {likesCounter} like{likesCounter !== 1 ? 's' : ''}
                </div>
            </div>
        </Row>
    );
};

export default Comment;
