import styles from "../newPassword/NewPassword.module.css";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {Slider} from "antd";
import 'antd/dist/antd.css';
import {setSoughtMinMaxCountCardsAC, setSoughtPackNameAC} from "./search-pack-reducer";
import {AppRootStateType} from "../../app/store";


export const SearchPack = () => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");
    const minValueRange = useSelector<AppRootStateType, number>(state => state.searchPackReducer.minCardsCount);
    const maxValueRange = useSelector<AppRootStateType, number>(state => state.searchPackReducer.maxCardsCount);

    const stepRange = 1;
    const [valueRange, setValueRange] = useState<[number, number]>([0, 40]);

    function valueRangeDebounce(value: [number, number]) {
        dispatch(setSoughtMinMaxCountCardsAC(value));
    }

    function valueInputDebounce(value: string) {
        dispatch(setSoughtPackNameAC(value));
    }

    const debouncedInputFunc = useDebounce(valueInputDebounce, 2000);
    const debouncedRangeFunc = useDebounce(valueRangeDebounce, 2000);

    const searchPackBouncing = (text: string) => {
        setTextSearch(text);

        debouncedInputFunc(text);
    };

    const searchPackClick = () => {
        dispatch(setSoughtPackNameAC(textSearch));
    };

    const onChangeRange = (newValue: [number, number]) => {
        console.log("NEWVALUE", newValue);

        setValueRange(newValue);
        debouncedRangeFunc(newValue);
    };

    const wrapSlider = {
        width: "200px"
    };


    return (
      <div>
          <label className={styles.labelInput} htmlFor="fieldSearch">Search</label>
          <SuperInputText onChangeText={searchPackBouncing} id="fieldSearch"/>
          <SuperButton onClick={searchPackClick} type="submit">Search</SuperButton>
          <div style={wrapSlider}>
              <Slider range min={minValueRange} max={maxValueRange}
                      defaultValue={[0, maxValueRange]}
                      step={stepRange}
                      onChange={onChangeRange}
                      value={valueRange}
              />
          </div>
      </div>
  )
};