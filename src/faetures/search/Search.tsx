import styles from "../newPassword/NewPassword.module.css";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import 'antd/dist/antd.css';
import {setSoughtCardQuestionAC} from "./search-reducer";


export const Search = () => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");

    function valueInputDebounce(value: string) {
        dispatch(setSoughtCardQuestionAC(value));
    }

    const debouncedFunc = useDebounce(valueInputDebounce, 2000);

    const searchCardBouncing = (text: string) => {
        setTextSearch(text);
        debouncedFunc(text);
    };

    const searchCardSend = () => {
        dispatch(setSoughtCardQuestionAC(textSearch));
    };

    return (
      <div>
          <label className={styles.labelInput} htmlFor="fieldSearch">Search</label>
          <SuperInputText onChangeText={searchCardBouncing} id="fieldSearch"/>
          <SuperButton onClick={searchCardSend} type="submit">Search</SuperButton>
      </div>
  )
};