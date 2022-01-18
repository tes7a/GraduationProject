import {CardsPacks} from "./CardsPacks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useEffect} from "react";
import {getCardsPacksTC} from "./CardsReducer";
import {CardPackDataType} from "../../api/cardsAPI";

export const CardsPacksContainer = () => {
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const cardsPacks: Array<CardPackDataType> = useSelector<AppRootStateType, Array<CardPackDataType>>(state => state.cards.cards);
    const getCards = () => {
        dispatch(getCardsPacksTC());
    }
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getCardsPacksTC());
        }
    }, [dispatch, cardsPacks])
    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <CardsPacks
                getCards={getCards}
                cardsPacks={cardsPacks}
            />
        </div>
    )
}