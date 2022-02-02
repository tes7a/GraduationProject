import classes from "./Modal.module.css";
import SuperInputText from "../SuperInputText/SuperInputText";
import React, {useRef} from "react";
import SuperButton from "../SuperButton/SuperButton";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";

export const InputModal = (
    {show, onChange, value, placeholder, name, type, onClose, onSave, modalName}: InputModalType
) => {
    const ref: any = useRef();
    useOnClickOutside(ref, onClose);

    return (
        <>
            {show &&
                <div className={classes.modal}>
                    <div className={classes.container} ref={ref}>
                        <h3 className={classes.modalTitle}>{modalName}</h3>
                        <SuperInputText
                            className={classes.modalFields}
                            onChangeText={onChange}
                            type={type || 'text'} name={name}
                            placeholder={placeholder}
                            value={value}
                        />
                        <div className={classes.buttonsWrapper}>
                            <SuperButton className={classes.modalAddButton} onClick={onSave}>Save</SuperButton>
                            <SuperButton className={classes.modalCloseButton} onClick={onClose}>Close</SuperButton>
                        </div>
                    </div>
                </div>}
        </>
    )
}

type InputModalType = {
    show: boolean
    placeholder?: string
    type?: string
    value: string
    name?: string
    modalName: string
    onChange: (value: string) => void
    onSave: () => void
    onClose: () => void
}