import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {getPacksTC, createPackTC, changePackTitleTC, removePackTC, setPacksPageAC, setSortPacks} from "./PacksReducer";
import {PackDataType} from "../../api/packsAPI";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import classes from "./PacksContainer.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";

export const PacksContainer = () => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [pageCount, setPageCount] = useState(10);
    const currentPage: number = useSelector<AppRootStateType, number>(state => state.packs.page);
    const [searchValue, setSearchValue] = useState('');
    const [showMyPacksPage, setShowMyPacksPage] = useState(false);
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
    const sortType = useSelector<AppRootStateType, string | undefined>(state => state.packs.sortMethod);

    const changePageCount = (value: number) => {
        setPageCount(+value);
    }

    const changeNumberPage = useCallback((value: number) => {
        dispatch(setPacksPageAC(value));
    }, [currentPage]);

    const ref: any = useRef();

    const getAllPacks = useCallback(() => {
        setShowMyPacksPage(false);
        dispatch(getPacksTC({currentPage, pageCount}));
    }, [currentPage, showMyPacksPage, pageCount])

    const getMyPacks = useCallback(() => {
        setShowMyPacksPage(true);
        dispatch(getPacksTC({id: authID, currentPage}));
    }, [showMyPacksPage, currentPage, authID])

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    }

    const addPacks = useCallback(() => {
        setShowAddModal(true);
    }, [showAddModal])

    const addPack = useCallback(() => {
        dispatch(createPackTC(cardName, showMyPacksPage, authID));
        setShowAddModal(false);
        setCardName('');
    }, [cardName, showMyPacksPage, authID])

    const changeTitle = useCallback(() => {
        dispatch(changePackTitleTC(packId, editName));
        setShowEditModal(false);
        setEditName('');
        setPackId('');
    }, [packId, editName])

    const closeModal = useCallback(() => {
        if (showAddModal) {
            setShowAddModal(false);
            setCardName('');
        } else if (showEditModal) {
            setShowEditModal(false);
            setEditName('');
            setPackId('');
        }
    }, [showAddModal, cardName, showEditModal, editName, packId])

    const sortCallBack = (sort: string) => {
        dispatch(setSortPacks(sort))
    }
    const removePack = useCallback((id: string) => {
        dispatch(removePackTC(id, currentPage, showMyPacksPage, authID))
    }, [currentPage, showMyPacksPage, authID]);


    useOnClickOutside(ref, closeModal);

    useEffect(() => {
        if (isLoggedIn) {
            if (showMyPacksPage) {
                dispatch(getPacksTC({id: authID, currentPage,pageCount}));
            } else {
                dispatch(getPacksTC({currentPage, sortType,pageCount}));
            }

        }
    }, [dispatch, isLoggedIn, currentPage, sortType,pageCount]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const onChangePackNameHandler = (value: string) => setCardName(value);
    const onChangeEditNameHandler = (value: string) => setEditName(value);

    const editHandler = (id: string, name: string) => {
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
                    <div className={classes.buttonsWrapper}>
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
                    <div className={classes.buttonsWrapper}>
                        <SuperButton className={classes.btnStyle} onClick={changeTitle}>Edit</SuperButton>
                        <SuperButton className={classes.btnStyle} onClick={closeModal}>Close</SuperButton>
                    </div>
                </div>
            }
            <Packs
                getPacks={getAllPacks}
                sortCallback={sortCallBack}
                sortMethod={sortType}
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
                getMyPacks={getMyPacks}
                showMyPacksPage={showMyPacksPage}
                options={options}
                changePageCount={changePageCount}
                pageCount={pageCount}
            />
        </div>
    )
}

