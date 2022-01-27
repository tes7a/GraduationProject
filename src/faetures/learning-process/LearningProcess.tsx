import React, {FormEvent, useState} from "react";
import styles from "./LearningProcess.module.css";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperRadio from "../../components/SuperRadio/SuperRadio";
import {useDispatch, useSelector} from "react-redux";
import {setGradeTC} from "./learrning-process-reducer";
import {AppRootStateType} from "../../app/store";
import {Card} from "../../api/cards.API";

export const LearningProcess = () => {
    const dispatch = useDispatch();
    const cards = useSelector<AppRootStateType, any>(state => state.cards );
    const arrayOptionsGrade = [1, 2, 3, 4, 5];
    const [optionGradeValue, onChangeOptionGradeValue] = useState(arrayOptionsGrade[1]);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    const changeShowQuestion = () => {
        setIsShowAnswer(true);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setGradeTC(optionGradeValue));
    };

    return (
        <>
            <form className={styles.formLearningProcess} onSubmit={handleSubmit}>
                <div className={styles.title}>Learn {}</div>
                <div>
                    <b>Question:</b> {}
                </div>
                {isShowAnswer &&
                    <div>
                        <div>
                            <b>Answer:</b> {}
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
                    <SuperButton  className={"primaryBtn"}>Cancel</SuperButton>
                    {
                        isShowAnswer
                        ? <SuperButton onClick={(event) => handleSubmit} className={"primaryBtn"}>Next</SuperButton>
                        : <SuperButton onClick={changeShowQuestion} className={"primaryBtn"}>Show answer</SuperButton>
                    }
                </div>
            </form>
        </>
    )
};

