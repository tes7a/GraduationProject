import React, { useEffect } from "react";
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {Card} from "../../api/cards.API";
import { AppRootStateType } from "../../app/store";
import { Cards } from "./Cards";
import { getCards } from "./cards-reducer";

export const CardsContainer = () => {
    const data = useSelector<AppRootStateType,Card[]>(state => state.cards.cards)
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const dispatch = useDispatch();
    const { id } = useParams<'id'>();
    console.log(window.location.pathname)
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
//
    const editHandler = (id: string, name: string) => {
        setEditName(name);
        setPackId(id);
        setShowEditModal(true);
    };
    const removeCard = () => {
        dispatch('')
    };
    console.log(id,'>> ID')
    useEffect(() => {
        console.log(id,'>> ID')
        if(id)
        dispatch(getCards(id));
    },[dispatch,id])

    return(
        <Cards 
            data={data}
            authID={authID}
            editHandler={editHandler}
            removeCard={removeCard}
        />
    )
}