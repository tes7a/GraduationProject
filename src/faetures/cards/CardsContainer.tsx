import React, {useCallback, useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {Card, GetDataType} from "../../api/cards.API";
import {AppRootStateType} from "../../app/store";
import { PATH } from "../../routes/routes";
import {Cards} from "./Cards";
import {getCards, postCard} from "./cards-reducer";

export const CardsContainer: React.FC = () => {
    //useSlector
    const cards = useSelector<AppRootStateType, Card[]>(state => state.cards.cards);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount);
    const page = useSelector<AppRootStateType, number>(state => state.cards.page);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //any
    const dispatch = useDispatch();
    const {id} = useParams<'id'>();

    //hooks
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [cardAnswer, setCardAnswer] = useState('');
    const [cardQuestion, setCardQuestion] = useState('')
    
    //func
    const editHandler = (id: string, name: string) => {
        setEditName(name);
        setPackId(id);
        setShowEditModal(true);
    };
    const removeCard = () => {
        dispatch('')
    };
    const changeNumberPage = useCallback((value: number) => {
        dispatch(setCardsPage(value));
    }, [page]);
    const addCard = () => {
        if(id)
        dispatch
        setCardAnswer('')
    }


    useEffect(() => {
        if (isLoggedIn) {
            if (id) dispatch(getCards({cardsPack_id: id}));
        }
    }, [dispatch, id])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    
    return (
        <Cards
            changeNumberPage={changeNumberPage}
            cardsTotalCount={cardsTotalCount}
            cards={cards}
            authID={authID}
            editHandler={editHandler}
            removeCard={removeCard}
            page={page}
        />
    )
}

function setCardsPage(value: number): any {
    throw new Error("Function not implemented.");
}
