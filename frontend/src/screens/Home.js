import React from "react";
import Header from "../components/Header/LeftNav";
import Features from "../components/Features/Profile";
import Posts from "./Posts";
import Chat from "./Chat";

const HomeScreen = () => {
    return (
        <div className="home">
            <Header />
            <Features />
            <Posts />
            <Chat />
        </div>
    );
};

export default HomeScreen;
