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
import {initialStateType} from "../../api/AuthReducer";
import {CardComponent} from "./CardComponent";
import {DeleteModal} from "../../components/modals/DeleteModal";
import {InputModal} from "../../components/modals/InputModal";

export const CardsContainer: React.FC = () => {
    //useSlector
    const {
        cards,
        cardsTotalCount,
        page,
        pageCount,
        packUserId,
    } = useSelector<AppRootStateType, intialCardsStateType>(state => state.cards);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //any
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();

    //hooks
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const [elementName, setElementName] = useState('');
    const [answerCard, setAnswerCard] = useState('');
    const [questCard, setQuestCard] = useState('');
    const [cardId, setCardId] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);

    //func
    const changeNumberPage = useCallback((value: number) => {
        dispatch((value));
    }, [page]);

    //addCard Funcs
    const addCard = () => {
        setShowAddModal(true)
    }
    const addCardModal = () => {
        if(id)
        dispatch(postCard({
            card: {
                cardsPack_id: id,
                question: questCard,
                answer: answerCard
            }
        }, id))
        setShowAddModal(false);
        setAnswerCard('');
        setQuestCard('')
    };
    const onChangeCardAnswer = (value: string) => setAnswerCard(value);
    const onChangeQuestCard = (value: string) => setQuestCard(value);

    //edit card func
    const editCard = (id: string, name: string) => {
        setEditName(name);
        setPackId(id);
        setShowAddModal(true);
    };

    //delete crads func
    const removeCard = (cardId: string) => {
        setCardId(cardId);
        setShowQuestionModal(true)
    };
    const deleteModalQuest = () => {
        if (cardId !== '' && id)
            dispatch(deleteCard(cardId, id));
        setShowQuestionModal(false)
    }
    
    useEffect(() => {
        if (isLoggedIn) {
            if (id)
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
            <InputModal
                modalName='Add new Card'
                name='addCard'
                placeholder='Card Answer'
                value={answerCard}
                value2={questCard}
                show={showAddModal}
                onChange={onChangeCardAnswer}
                onChange2={onChangeQuestCard}
                onClose={() => setShowAddModal(false)}
                onSave={addCardModal}
                question='Card Question'
            />
            <DeleteModal
                show={showQuestionModal}
                elementName={elementName}
                typeElement={'card'}
                onClose={() => setShowQuestionModal(false)}
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
