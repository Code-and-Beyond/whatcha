import React from 'react';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';
import Row from '../Row/Row';

const Comment = (props) => {
    const { name, image, bio, time, text } = props;
    const commentTime = moment(new Date(time)).fromNow();
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
                <p
                    className="comment__button u-c-pointer b b--4"
                    onClick={props.onClickHandler}
                >
                    Reply
                </p>
            </div>
        </Row>
    );
};

export default Comment;
