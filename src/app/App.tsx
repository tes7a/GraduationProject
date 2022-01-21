import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Header} from '../components/header/Header';
import './App.css';
import {NavigationApp} from './NavigationApp';


export function App() {
    return (
        <div>
            <Header/>
            <NavigationApp/>
        </div>
        
    );
}


