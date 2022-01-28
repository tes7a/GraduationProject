import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../api/cards.API";
import {AppRootStateType} from "../../app/store";
import {Cards} from "./Cards";
import {deleteCard, getCards, postCard} from "./cards-reducer";
import {RequestStatusType} from "../../app/app-reducer";
import {Spin} from "antd";
import {Navigate, useParams} from "react-router-dom";
import {useCallback} from "react";
import {PATH} from "../../routes/routes";
import SuperButton from "../../components/SuperButton/SuperButton";

export const CardsContainer: React.FC = () => {
    //useSlector
    const cards = useSelector<AppRootStateType, Card[]>(state => state.cards.cards);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount);
    const page = useSelector<AppRootStateType, number>(state => state.cards.page);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //any
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();

    //hooks
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [cardAnswer, setCardAnswer] = useState('');
    const [cardQuestion, setCardQuestion] = useState('');

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
        dispatch((value));
    }, [page]);
    const addCard = () => {
        if (id)
            dispatch(postCard({card: {cardsPack_id: id, answer: cardAnswer, question: cardQuestion}}, id))
    };
    const deleteCardFunc = () => {
        
    }


    useEffect(() => {
        if (isLoggedIn) {
            if (id) dispatch(getCards({cardsPack_id: id, pageCount: 10}));
        }
    }, [dispatch, id])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    if (status === 'loading') {
        return <Spin size={'large'} tip="Loading..."/>
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
            addCard={addCard}
        />
    )
}
