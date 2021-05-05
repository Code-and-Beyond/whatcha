import Avatar from '../Avatar/Avatar';

import { getUser } from '../../helpers/session';

import userProfile from '../../assets/profile/user.svg';
import dots from '../../assets/icons/dots.svg';
import leftArrow from '../../assets/icons/left-arrow.svg';
import { useState } from 'react';

const ChatHeader = (props) => {
    const { openChat, fullname, image } = props;
    const [showPopover, setShowPopover] = useState(false);

    const goBack = () => {
        return openChat ? (
            <img
                src={leftArrow}
                className="chat__header--icon u--icon"
                alt="go back"
                onClick={() => {
                    setShowPopover(false);
                    props.goBack();
                }}
            />
        ) : null;
    };
    return (
        <div className="chat__header">
            {goBack()}
            <Avatar
                src={
                    openChat ? image : getUser() ? getUser().image : userProfile
                }
                extraStyle="u-c-pointer"
                alt="user avatar"
                size="5rem"
            />
            <h1 className="b b--1 u-m-l-s">{openChat ? fullname : 'You'}</h1>
            <div className="chat__header--container u-c-pointer">
                <img
                    src={dots}
                    alt="three dots"
                    className="chat__header--dots"
                    onClick={() => {
                        if (props.openChat) setShowPopover(!showPopover);
                    }}
                />
                {showPopover && props.openChat ? (
                    <div className="menu comment__dots--popover chat__header--popover">
                        <p
                            className="a a--2"
                            onClick={() => {
                                props.deleteChat(
                                    props.userOne,
                                    props.userTwo,
                                    getUser().id
                                );
                                setShowPopover(false);
                                props.goBack();
                            }}
                        >
                            Delete
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ChatHeader;
