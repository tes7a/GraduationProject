import React, {useEffect} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../api/cards.API";
import {AppRootStateType} from "../../app/store";
import {Cards} from "./Cards";
import {deleteCard, getCards, intialCardsStateType, postCard, putCard, setCardsCountOnPage, setSortCards} from "./cards-reducer";
import {RequestStatusType} from "../../app/app-reducer";
import {Spin} from "antd";
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../../routes/routes";
import {DeleteModal} from "../../components/modals/DeleteModal";
import {InputModal} from "../../components/modals/InputModal";


export const CardsContainer: React.FC = () => {
    //useSlector
    const {
        cards,
        cardsTotalCount,
        page,
        packUserId,
        sortCardsMethod
    } = useSelector<AppRootStateType, intialCardsStateType>(state => state.cards);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //any
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //hooks
    const [pageCount, setPageCount] = useState(10);
    const [elementName, setElementName] = useState('');
    const [answerCard, setAnswerCard] = useState('');
    const [questCard, setQuestCard] = useState('');
    const [cardId, setCardId] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    //utils funcs
    const changeNumberPage = (value: number) => {
        dispatch(setCardsCountOnPage(value));
    };

    const sortCallBack = (sort: string) => {
        dispatch(setSortCards(sort))
    }

    const changePageCount = (value: number) => {
        setPageCount(+value);
    }

    //addCard funcs
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
        setQuestCard('');
    };
    const onChangeCardAnswer = (value: string) => setAnswerCard(value);
    const onChangeQuestCard = (value: string) => setQuestCard(value);

    //edit card funcs
    const editCard = (id: string, quest: string) => {
        setCardId(id);
        setQuestCard(quest)
        setShowEditModal(true);
    };

    const editCardModal = () => {
        if(id)
            dispatch(putCard({
                card:{
                    _id: cardId,
                    question: questCard,
                }
            }, id))
        setQuestCard('');
        setShowEditModal(false);
    }

    //delete crad funcs
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
                dispatch(getCards({cardsPack_id: id, page: page, sortCards: sortCardsMethod}));
        }
    }, [dispatch, id, sortCardsMethod, page])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    if (status === 'loading') {
        return <Spin size={'large'} tip="Loading..."/>
    }

    return (
        <div>
            <InputModal
                modalName='+Add New Card'
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
            <InputModal
                modalName='Edit Card'
                name='Edit Card'
                placeholder='Edit Card'
                value={questCard}
                show={showEditModal}
                onChange={onChangeQuestCard}
                onClose={() => setShowEditModal(false)}
                onSave={editCardModal}
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
                sortCallBack={sortCallBack}
                sortCardsMethod={sortCardsMethod}
                pageCount={pageCount}
                changePageCount={changePageCount}
                options={options}
            />
        </div>
    )
}
