import styles from "../newPassword/NewPassword.module.css";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import {searchCards} from "./search-reducer";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {Slider} from "antd";
import 'antd/dist/antd.css';
import {searchPacks} from "./search-pack-reducer";
import {getPacksTC} from "../packs/PacksReducer";
import {AppRootStateType} from "../../app/store";


export const SearchPack = () => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");
    const minValueRange = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount);
    const maxValueRange = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount);
    const stepRange = 1;
    const [valueRange, setValueRange] = useState<[number, number]>([0, 40]);

    function valueLogging(value:any) {
        dispatch(searchPacks(value));
        console.log("search")
    }

    const debouncedFunc = useDebounce(valueLogging, 2000);

    const searchPackBouncing = (text: string) => {
        setTextSearch(text);

        if (text.length !== 0) {
            debouncedFunc(text);
        }

        dispatch(getPacksTC({}));
    };

    const searchPackSend = () => {
        if (textSearch.length !== 0) {
            dispatch(searchPacks(textSearch));
        }

        dispatch(getPacksTC({}));
    };

    const onChangeRange = (newValue: [number, number]) => {
        setValueRange(newValue);
        debouncedFunc(newValue);
        dispatch(searchPacks(newValue));
    };

    const wrapSlider = {
        width: "200px"
    };


    return (
      <div>
          <label className={styles.labelInput} htmlFor="fieldSearch">Search</label>
          <SuperInputText onChangeText={searchPackBouncing} id="fieldSearch"/>
          <SuperButton onClick={searchPackSend} type="submit">Search</SuperButton>
          <div style={wrapSlider}>
              <Slider range min={minValueRange} max={maxValueRange}
                      defaultValue={[0, 50]}
                      step={stepRange}
                      onChange={onChangeRange}
                      value={valueRange}/>
          </div>
      </div>
  )
};