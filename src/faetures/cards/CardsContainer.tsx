import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../api/cards.API";
import {AppRootStateType} from "../../app/store";
import {Cards} from "./Cards";
import {deleteCard, getCards, intialCardsStateType, postCard} from "./cards-reducer";
import {RequestStatusType} from "../../app/app-reducer";
import {Spin} from "antd";
import {Navigate, useParams} from "react-router-dom";
import {useCallback} from "react";
import {PATH} from "../../routes/routes";
import SuperButton from "../../components/SuperButton/SuperButton";
import { initialStateType } from "../../api/AuthReducer";
import { CardComponent } from "./CardComponent";
import { DeleteModal } from "../../components/modals/DeleteModal";

export const CardsContainer: React.FC = () => {
    //useSlector
    const {cards, cardsTotalCount, page, pageCount, packUserId,} = useSelector<AppRootStateType, intialCardsStateType>(state => state.cards);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //any
    const dispatch = useDispatch();
    const {id} = useParams<{id: string}>();

    //hooks
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [cardAnswer, setCardAnswer] = useState('');
    const [cardQuestion, setCardQuestion] = useState('');
    const [cardId, setCardId] = useState('');
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [elementName, setElementName] = useState('');

    //func
    const changeNumberPage = useCallback((value: number) => {
        dispatch((value));
    }, [page]);
    const addCard = (question: string, answer?: string) => {
        dispatch(postCard({
            card:{
                question,
                answer: answer ?? 'no answer',
                cardsPack_id: id ?? ''
                }
        }))
    };
    const editCard = (id: string, name: string) => {
        setEditName(name);
        setPackId(id);
        setShowEditModal(true);
    };
    const removeCard = (cardId: string) => {
        setCardId(cardId);
        setShowQuestionModal(true)
    };
    const deleteModalQuest = () => {
        if(cardId !== '' && id)
        dispatch(deleteCard(cardId, id));
        setShowQuestionModal(false)
    }


    useEffect(() => {
        if (isLoggedIn) {
            if(id)
             dispatch(getCards({cardsPack_id: id, pageCount: 10}));
        }
    }, [dispatch, id])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    if (status === 'loading') {
        return <Spin size={'large'} tip="Loading..."/>
    }

    return (
        <div>
            <DeleteModal
                show={showQuestionModal}
                elementName={elementName}
                typeElement={'card'}
                onClose={() => setShowEditModal(false)}
                onConfirm={deleteModalQuest}
            />
        <Cards
            changeNumberPage={changeNumberPage}
            cardsTotalCount={cardsTotalCount}
            cards={cards}
            authID={authID}
            editCard={editCard}
            removeCard={removeCard}
            page={page}
            addCard={addCard}
        />
        </div>
    )
}
