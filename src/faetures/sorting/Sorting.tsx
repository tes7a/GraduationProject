import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import SuperButton from '../../components/SuperButton/SuperButton';
import { sortPacks } from '../packs/PacksReducer';

export const Sorting = () => {
    const dispatch = useDispatch;
    const sortUp = () => {
        //dispatch(sortPacks("up"));
    } 
    const sortDwn = () => {
        // dispatch(sortPacks('down'))
    }
   return(
       <div>
           <SuperButton onClick={sortUp}>Up</SuperButton>
           <SuperButton onClick={sortDwn}>Down</SuperButton>
       </div>
   )
}