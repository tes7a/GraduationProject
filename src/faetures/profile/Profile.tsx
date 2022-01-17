import React from "react";
import s from './profile.module.css'

type ProfileProps = {
    user: any
}

export const Profile: React.FC<ProfileProps> = ({user}) => {
    return <div>
        <div>
            <h1>Profile</h1>

            <div>
                <img src={user.avatar} className={s.ava} alt={user.name}/>
                <div>{user.name}</div>
            </div>
        </div>
    </div>
}