import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {Slider} from "antd";
import 'antd/dist/antd.css';
import {setSoughtMinMaxCountCardsAC, setSoughtPackNameAC} from "./search-pack-reducer";
import s from "../../style/Packs.module.css";
import {AppRootStateType} from "../../app/store";


export const SearchPack = () => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");
    const minRangeValue = useSelector<AppRootStateType, number>(state => state.searchPack.minCardsCount);
    const maxRangeValue = useSelector<AppRootStateType, number>(state => state.searchPack.maxCardsCount);
    const maxValuePack = useSelector<AppRootStateType, number>(state => state.packs.setting.maxCardsCount);
    const minValuePack = useSelector<AppRootStateType, number>(state => state.packs.setting.minCardsCount);
    const stepRange = 1;
    const [rangeValues, setRangeValues] = useState<[number, number]>([minRangeValue, maxRangeValue]);

    function valueInputDebounce(value: string) {
        dispatch(setSoughtPackNameAC(value));
    }

    function valueRangeDebounce(value: [number, number]) {
        dispatch(setSoughtMinMaxCountCardsAC(value));
    }

    const [debouncedInputFunc, clearTimerInput] = useDebounce(valueInputDebounce, 2000);
    const [debouncedRangeFunc, clearTimerRange] = useDebounce(valueRangeDebounce, 2000);

    const searchPackDebounce = (text: string) => {
        setTextSearch(text);
        debouncedInputFunc(textSearch)
    };

    const searchPackClick = () => {
        dispatch(setSoughtPackNameAC(textSearch));
        clearTimerRange();
        clearTimerInput();
    };

    const onChangeRange = (newValue: [number, number]) => {
        setRangeValues(newValue);
        debouncedRangeFunc(newValue);
    };


    return (
        <div>
            <label className={s.packsAsideTitle} htmlFor="fieldSearch">Search</label>
            <div className={s.searchBlock}>
                <SuperInputText className={s.searchInput} placeholder='Search' value={textSearch} onChangeText={searchPackDebounce}
                                id="fieldSearch"/>
            </div>
            <h3 className={s.packsAsideTitle}>Number of cards</h3>
            <div className={s.wrapSlider}>
                <Slider
                    range
                    className={s.range}
                    min={minValuePack}
                    max={maxValuePack}
                    defaultValue={[minValuePack, maxValuePack]}
                    step={stepRange}
                    onChange={onChangeRange}
                    value={rangeValues}

                    handleStyle={[{background: '#9A91C8', borderColor: '#9A91C8'}, {
                        background: '#9A91C8',
                        borderColor: '#9A91C8'
                    }]}
                    trackStyle={[{background: '#9A91C8'}]}
                />

                <div className={s.minAndMaxValue}>
                    <span>Min:{minValuePack}</span>
                    <span>Max:{maxValuePack}</span>
                </div>

            </div>
            <SuperButton className={s.searchButton} onClick={searchPackClick} type="submit">Search</SuperButton>
        </div>
    )
};

// type SearchPackPropsType = {
//     changeRangeValue: (value: [number, number]) => void
//     rangeValue: [number, number]
//     searchPacks: (value: string) => void
//     searchValue: string
//     onChangeSearchValue: (value: string) => void
// }