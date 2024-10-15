// React

import { useContext, useEffect, useState } from "react";

// React Icons

import { BsGearWideConnected } from "react-icons/bs";

// React Color

import { ChromePicker } from 'react-color';

// Context

import { NoteInformationContext } from "../../context/NoteInformationContext";


const SettingsContainer = () => {

    const [hideContainer, setHideContainer] = useState(true);
    const [colorPickerNotes, setColorPickerNotes] = useState('#273347');
    const [fontSizeNotes, setFontSizeNotes] = useState(20);
    const [noteFontColor, setNoteFontColor] = useState('Branco');

    const { setNoteInformation } = useContext(NoteInformationContext);


    const toggleSettingsContainer = () => setHideContainer(!hideContainer);


    const getColorPicker = (colorPickerNotes) => setColorPickerNotes(colorPickerNotes.hex);

    const resetColorPicker = () => setColorPickerNotes('#273347');

    
    const getFontSizeInputNumber = (e) => {
        const newValue = e.target.value;

        if (newValue === "") {
            setFontSizeNotes("");
        } else {
            const clampedValue = Math.max(0, Math.min(100, Number(newValue)));
            setFontSizeNotes(clampedValue);
        }
    };

    const getFontSizeInputRange = (e) => setFontSizeNotes(e.target.value);


    const getFontColorNotes = (event) => {
        const value = event.target.value;

        setNoteFontColor(value);
    };
    

    useEffect(() => {
        setNoteInformation(prevNotes =>
            prevNotes.map(note => ({
                ...note,
                backgroundColor: colorPickerNotes,
                fontSize: fontSizeNotes,
                fontColor: noteFontColor
            }))
        );
    }, [
        fontSizeNotes,
        colorPickerNotes,
        noteFontColor
    ]);

    useEffect(() => {
        const favoriteSavedNotes = JSON.parse(localStorage.getItem('notes-created')) || [];

        if (favoriteSavedNotes.length > 0) {
            const { backgroundColor, fontSize, fontColor } = favoriteSavedNotes[0];
            setColorPickerNotes(backgroundColor || '#273347');
            setFontSizeNotes(fontSize || 20);
            setNoteFontColor(fontColor || 'Branco');
        }
    }, [])
    


    return (
        <div className="relative flex flex-col items-end">
            <div>
                <div className="h-11 w-11 grid place-items-center rounded-full duration-300 hover:bg-[#2dd4bf0a]">
                    <BsGearWideConnected
                        className="text-white text-2xl cursor-pointer duration-300 hover:rotate-12"
                        onClick={toggleSettingsContainer}
                    />
                </div>
            </div>

            <div className={`bg-[#1f2937] p-5 border-[1px] border-[#424b57] rounded-md absolute top-14 right-[-6px] duration-300 z-50 ${!hideContainer ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[-20px] opacity-0 pointer-events-none'}`}>
                <div className="relative w-max text-[#f3f4f6] border-[1px] border-[#424b57] border-r-0 border-t-0 border-l-0 pb-5">
                    <h3 className="text-lg">Altere a cor das notas:</h3>
                    <ChromePicker
                        className="custom-chrome-picker mt-2"
                        color={colorPickerNotes}
                        onChangeComplete={getColorPicker}
                    />
                    <div>
                        <p className="inline-block mt-4">{colorPickerNotes}</p>
                        <p className="flex items-center gap-2 underline cursor-pointer" onClick={resetColorPicker}>
                            Redefinir cor:
                            <span className="inline-block w-[16px] h-[16px] bg-[#273347] rounded-full"></span>
                        </p>
                    </div>
                </div>

                <div className="mt-5 border-[1px] border-[#424b57] border-r-0 border-t-0 border-l-0 pb-5">
                    <h3 className="text-[#f3f4f6] text-lg w-60">Altere o tamanho da fonte das notas:</h3>
                    <div className="mt-3">
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={fontSizeNotes}
                            onChange={getFontSizeInputNumber}
                            className="bg-[#111827] p-2 rounded-md duration-200 w-full border-[1px] border-transparent text-white focus:outline-none hover:border-[#2dd4bf] focus:border-[#2dd4bf] focus:shadow-md focus:shadow-[#2dd4bf33]"
                        />
                        <div className="range-container mt-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={fontSizeNotes === "" ? 0 : fontSizeNotes}
                                onChange={getFontSizeInputRange}
                                style={{
                                    background: `linear-gradient(to right, #2DD4BF ${fontSizeNotes}%, #424B57 ${fontSizeNotes}%)`
                                }}
                                className="customRange"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h3 className="text-[#f3f4f6] text-lg w-48">Altere a cor da fonte das notas:</h3>

                    <div className="mt-3 text-[#f3f4f6] flex justify-between items-center">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <label className="cursor-pointer" htmlFor="checkWhite">Branco:</label>
                            <input
                                type="checkbox"
                                id="checkWhite"
                                className="relative top-[1.5px] cursor-pointer"
                                value="Branco"
                                checked={noteFontColor == "Branco"}
                                onChange={getFontColorNotes}
                            />
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer">
                            <label className="cursor-pointer" htmlFor="checkBlack">Preto:</label>
                            <input
                                type="checkbox"
                                id="checkBlack"
                                className="relative top-[1.5px] cursor-pointer"
                                value="Preto"
                                checked={noteFontColor == "Preto"}
                                onChange={getFontColorNotes}
                            />
                        </div>
                    </div>
                </div>

                <div class="triangle"></div>
            </div>
        </div>
    )
}

export default SettingsContainer