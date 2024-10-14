// React

import { useState } from 'react';

// Styles

import './App.css';

// Components

import Header from './components/Header';
import NoteContainer from './components/NoteContainer';
import NoteCreationContainer from './components/NoteCreationContainer';
import SettingsContainer from './components/SettingsContainer';


const App = () => {
    return (
        <>
            <Header />
            <main className='max-w-[1800px] mx-auto mt-8 mb-20 px-10'>
                <div>
                    <SettingsContainer />
                </div>

                <div className='mt-8 flex flex-col gap-20 md:flex-row md:gap-10'>
                    <NoteCreationContainer />
                    <NoteContainer />
                </div>
            </main>
        </>
    )
}

export default App