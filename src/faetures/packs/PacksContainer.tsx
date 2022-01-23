import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useEffect, useRef, useState} from "react";
import {getPacksTC, createPackTC, changePackTitleTC, removePackTC, setSortPacks} from "./PacksReducer";
import {PackDataType} from "../../api/packsAPI";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import classes from "./PacksContainer.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";
import {MyPagination} from "../../hooks/MyPagination";

export const PacksContainer = () => {
    const page: number = useSelector<AppRootStateType, number>(state => state.packs.page);
    const [currentPage,setCurrantPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [cardName, setCardName] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const packs: Array<PackDataType> = useSelector<AppRootStateType, Array<PackDataType>>(state => state.packs.packs);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const totalCount: number = useSelector<AppRootStateType, number>(state => state.packs.totalCount);
    const sortMethod = useSelector<AppRootStateType, string | undefined>(state => state.packs.sortMethod)
    const changeNumberPage = (value:number) => {
        setCurrantPage(value);
        dispatch(getPacksTC(value));
    }

    const ref: any = useRef();


    const getPacks = () => {
        dispatch(getPacksTC(currentPage));
    }

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    }

    const addPacks = () => {
        setShowAddModal(true);
    }

    const addPack = () => {
        dispatch(createPackTC(cardName));
        setShowAddModal(false);
        setCardName('');
    }

    const changeTitle = () => {
        dispatch(changePackTitleTC(packId, editName));
        setShowEditModal(false);
        setEditName('');
        setPackId('');
    }
    const closeModal = () => {
        if (showAddModal) {
            setShowAddModal(false);
            setCardName('');
        } else if (showEditModal) {
            setShowEditModal(false);
            setEditName('');
            setPackId('');
        }
    }

    const removePack = (id: string) => {
        dispatch(removePackTC(id,currentPage))
    }
    
    const sortCallBack = (sort: string) => {
        dispatch(setSortPacks(sort))
    }

    useOnClickOutside(ref, closeModal);
    useEffect(()=>{
        setCurrantPage(page);
    },[page]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getPacksTC(currentPage, sortMethod));
        }
    }, [dispatch, isLoggedIn,currentPage, sortMethod]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }


    const onChangePackNameHandler = (value: string) => setCardName(value);
    const onChangeEditNameHandler = (value: string) => setEditName(value);

    const editHandler = (id: string, name: string) => {
        console.log(id, name);
        setEditName(name);
        setPackId(id);
        setShowEditModal(true);

    }

    return (
        <div className={classes.packsContainer}>
            {
                showAddModal &&
                <div className={classes.modal} ref={ref}>
                    {showAddModal
                        ? <SuperInputText
                            onChangeText={onChangePackNameHandler}
                            type='text' name='name'
                            placeholder='Name'
                            value={cardName}
                        />
                        : <SuperInputText
                            onChangeText={onChangeEditNameHandler}
                            type='text' name='name'
                            placeholder='Name'
                            value={editName}
                        />
                    }
                    <div className={classes.btnsWrapper}>
                        <SuperButton className={classes.btnStyle} onClick={addPack}>Add</SuperButton>
                        <SuperButton className={classes.btnStyle} onClick={closeModal}>Close</SuperButton>
                    </div>
                </div>
            }
            {
                showEditModal &&
                <div className={classes.modal} ref={ref}>
                    <SuperInputText
                        onChangeText={onChangeEditNameHandler}
                        type='text' name='name'
                        placeholder='Name'
                        value={editName}
                    />
                    <div className={classes.btnsWrapper}>
                        <SuperButton className={classes.btnStyle} onClick={changeTitle}>Edit</SuperButton>
                        <SuperButton className={classes.btnStyle} onClick={closeModal}>Close</SuperButton>
                    </div>
                </div>
            }
            <Packs
                sortCallback={sortCallBack}
                getPacks={getPacks}
                sortMethod={sortMethod}
                addPacks={addPacks}
                onChangeSearchValue={onChangeSearchValue}
                packs={packs}
                authID={authID}
                searchValue={searchValue}
                editHandler={editHandler}
                removePack={removePack}
                totalCount={totalCount}
                currentPage={currentPage}
                changeNumberPage={changeNumberPage}
            />
        </div>
    )
}