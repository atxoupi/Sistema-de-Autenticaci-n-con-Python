import React, {
    useContext
} from "react";
import {
    Context
} from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import {
    Login
} from "./login";

export const Home = () => {
    const {
        store,
        actions
    } = useContext(Context);
    console.log(store.auth);

    return ( <
        div className = "d-flex justify-content-center" >
        <
        Login / >
        <
        /div>
    );
};