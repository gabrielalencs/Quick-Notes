// Styles

import './App.css';

// Components

import Header from './components/Header';
import NoteContainer from './components/NoteContainer';
import NoteCreationContainer from './components/NoteCreationContainer';
import SettingsContainer from './components/SettingsContainer';


import React, { useState } from 'react';
import { ChromePicker } from 'react-color';



const App = () => {

    const [color, setColor] = useState('#fff');
    const [showPicker, setShowPicker] = useState(false);

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

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


           



                <div style={{ padding: '20px' }}>
                    <button
                        style={{
                            backgroundColor: color,
                            border: 'none',
                            padding: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowPicker(!showPicker)}
                    >
                        Selecione a Cor
                    </button>

                    {showPicker && (
                        <div style={{ position: 'absolute', zIndex: '2' }}>
                            <ChromePicker
                                className="custom-chrome-picker" 
                                color={color}
                                onChangeComplete={handleChangeComplete}
                            />
                        </div>
                    )}

                    <p>Cor selecionada: {color}</p>
                </div>
            </main>
        </>
    )
}

export default App