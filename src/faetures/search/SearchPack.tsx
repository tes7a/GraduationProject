import styles from "../newPassword/NewPassword.module.css";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import {searchCards} from "./search-reducer";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {Slider} from "antd";
import 'antd/dist/antd.css';
import {searchPacks, setSoughtMinMaxCountCardsAC, setSoughtPackNameAC} from "./search-pack-reducer";
import s from "../../style/Packs.module.css";
import {AppRootStateType} from "../../app/store";


export const SearchPack = ({changeRangeValue, rangeValue, ...props}: SearchPackPropsType) => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");
    const minValueRange = 0;
    const maxValueRange = 200;
    // const minValueRange = useSelector<AppRootStateType, number>(state => state.searchPackReducer.minCardsCount);
    // const maxValueRange = useSelector<AppRootStateType, number>(state => state.searchPackReducer.maxCardsCount);
    const stepRange = 1;
    // const [valueRange, setValueRange] = useState<[number, number]>([0, 40]);

    function valueLogging(value: any) {
        dispatch(searchPacks(value));
    }
    // function valueRangeDebounce(value: [number, number]) {
    //     dispatch(setSoughtMinMaxCountCardsAC(value));
    // }
    //
    // function valueInputDebounce(value: string) {
    //     dispatch(setSoughtPackNameAC(value));
    // }

    const debouncedFunc = useDebounce(valueLogging, 2000);
    // const debouncedInputFunc = useDebounce(valueInputDebounce, 2000);
    // const debouncedRangeFunc = useDebounce(valueRangeDebounce, 2000);

    const searchPackBouncing = (text: string) => {
        setTextSearch(text);
        debouncedFunc(text);
    };

    const searchPackSend = () => {
        props.searchPacks();
        dispatch(searchPacks(textSearch));
        // dispatch(setSoughtPackNameAC(textSearch));
    };

    const onChangeRange = (newValue: [number, number]) => {
        changeRangeValue(newValue);
        debouncedFunc(newValue);
        // setValueRange(newValue);
        // debouncedRangeFunc(newValue);
    };

    const wrapSlider = {
        width: "200px"
    };


    return (
        <div>
            <label className={s.packsAsideTitle} htmlFor="fieldSearch">Search</label>
            <div className={s.searchBlock}>
                <SuperInputText className={s.searchInput} placeholder='Search' onChangeText={searchPackBouncing}
                                id="fieldSearch"/>
            </div>
            <h3 className={s.packsAsideTitle}>Number of cards</h3>
            <div className={s.wrapSlider}>
                <Slider
                    range
                    className={s.range}
                    min={minValueRange}
                    max={maxValueRange}
                    defaultValue={[0, 50]}
                    step={stepRange}
                    onChange={onChangeRange}
                    value={rangeValue}
                    // value={valueRange}

                    handleStyle={[{background: '#9A91C8',borderColor:'#9A91C8'},{background: '#9A91C8',borderColor:'#9A91C8'}]}
                    trackStyle={[{background: '#9A91C8'}]}
                />

                <div className={s.minAndMaxValue}>
                    <span>Min:{rangeValue[0]}</span>
                    <span>Max:{rangeValue[1]}</span>
                </div>

            </div>
            <SuperButton className={s.searchButton} onClick={searchPackSend} type="submit">Search</SuperButton>
        </div>
    )
};

type SearchPackPropsType = {
    changeRangeValue: (value: [number, number]) => void
    rangeValue: [number, number]
    searchPacks: () => void
}