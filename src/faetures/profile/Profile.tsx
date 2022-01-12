import React from "react";
import a from "./ava.jpg"
import s from './profile.module.css'

export const Profile = () => {
    return <>
        <div>
            <h1>Profile</h1>
            
            <div>
                <img src={a} className={s.ava} alt={"name"}/>
            </div>
        </div>
    </>
}