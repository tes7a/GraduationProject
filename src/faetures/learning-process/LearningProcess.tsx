import React, {FormEvent, useEffect, useState} from "react";
import styles from "./LearningProcess.module.css";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperRadio from "../../components/SuperRadio/SuperRadio";
import {useDispatch, useSelector} from "react-redux";
import {setGradeTC} from "./learrning-process-reducer";
import {AppRootStateType} from "../../app/store";
import {useParams} from "react-router-dom";
import {Card} from "../../api/cards.API";
import {getCards} from "../cards/cards-reducer";
import stylesButtons from "../../style/Packs.module.css";

export const LearningProcess = () => {
    const dispatch = useDispatch();
    const {id} = useParams<"id">();
    const getPackCardsById = (id: string | undefined) => (state: AppRootStateType) => {
        const cardsFromPack = state.cards.cards.filter(({ cardsPack_id }) => cardsPack_id === id);
        return cardsFromPack;
    };
    const cards = useSelector<AppRootStateType, any>(getPackCardsById(id));

    const getCard = (cards: Card[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});

        return cards[res.id + 1];
    };

    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const rangeValues = new Map<string, number>([
        ['Did not know', 1],
        ['Forgot', 2],
        ['A lot of thought', 3],
        ['Confused', 4],
        ['Knew the answer', 5],
    ]);
    const arrayOptionsGrade = Array.from( rangeValues.keys());
    const [optionGradeValue, onChangeOptionGradeValue] = useState(arrayOptionsGrade[1]);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const optionNumeralGrade = rangeValues.get(optionGradeValue);

    const changeShowQuestion = () => {
        setIsShowAnswer(true);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isShowAnswer) {
            const data = {
                grade: optionNumeralGrade,
                card_id: selectedCard?._id
            };
            dispatch(setGradeTC(data));
        }
    };

    useEffect(() => {
        dispatch(getCards({cardsPack_id: id}));
        setSelectedCard(getCard(cards));
    }, []);

    if (!selectedCard) {
        return <div>loading...</div>;
    }


    return (
        <>
            <form className={styles.formLearningProcess} onSubmit={handleSubmit}>
                <div className={styles.title}>Learn {}</div>
                <div className={styles.subtitle}>
                    <b>Question:</b> {selectedCard.question}
                </div>
                {isShowAnswer &&
                    <div>
                        <div>
                            <b>Answer:</b> {selectedCard.answer}
                        </div>
                        <div className={styles.gradeList}>

                            <SuperRadio name={'radioGrade'}
                                        options={arrayOptionsGrade}
                                        value={optionGradeValue}
                                        onChangeOption={onChangeOptionGradeValue}/>
                        </div>
                    </div>
                }

                <div className={styles.blockBtn}>
                    <SuperButton  className={stylesButtons.packsButton} type="button" >Cancel</SuperButton>
                    {
                        isShowAnswer
                        ? <SuperButton type="submit" className={stylesButtons.packsButton}>Next</SuperButton>
                        : <SuperButton onClick={changeShowQuestion} type="button" className={stylesButtons.packsButton}>Show answer</SuperButton>
                    }
                </div>
            </form>
        </>
    )
};

