// React

import { useState } from "react";

// React Icons

import { BsGearWideConnected } from "react-icons/bs";

// React Color

import { ChromePicker } from 'react-color';


const SettingsContainer = ({ colorPickerValue, updatePickerColor }) => {

    const [selectedCheckbox, setSelectedCheckbox] = useState('Branco');
    const [valueSynchronizedInputs, setValueSynchronizedInputs] = useState(20);

    const handleChangeComplete = (colorPickerValue) => updatePickerColor(colorPickerValue.hex);

    const resetNoteColor = () => updatePickerColor('#273347');


    const handleChangeNumberInput = (e) => {
        const newValue = e.target.value;

        if (newValue === "") {
            setValueSynchronizedInputs("");
        } else {
            const clampedValue = Math.max(0, Math.min(100, Number(newValue)));
            setValueSynchronizedInputs(clampedValue);
        }
    };

    const handleChangeRangeInput = (e) => setValueSynchronizedInputs(e.target.value);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setSelectedCheckbox(value);
    };



    return (
        <div className="relative flex flex-col items-end">
            <div>
                <div className="h-11 w-11 grid place-items-center rounded-full duration-300 hover:bg-[#2dd4bf0a]">
                    <BsGearWideConnected className="text-white text-2xl cursor-pointer duration-300 hover:rotate-12" />
                </div>
            </div>

            <div className="bg-[#1f2937] p-5 border-[1px] border-[#424b57]">
                <div className="relative w-max text-[#f3f4f6] border-[1px] border-[#424b57] border-r-0 border-t-0 border-l-0 pb-5">
                    <h3 className="text-lg">Altere a cor das notas:</h3>
                    <ChromePicker
                        className="custom-chrome-picker mt-2"
                        color={colorPickerValue}
                        onChangeComplete={handleChangeComplete}
                    />
                    <div>
                        <p className="inline-block mt-4">{colorPickerValue}</p>
                        <p className="flex items-center gap-2 underline cursor-pointer" onClick={resetNoteColor}>
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
                            value={valueSynchronizedInputs}
                            onChange={handleChangeNumberInput}
                            className="bg-[#111827] p-2 rounded-md duration-200 w-full border-[1px] border-transparent text-white focus:outline-none hover:border-[#2dd4bf] focus:border-[#2dd4bf] focus:shadow-md focus:shadow-[#2dd4bf33]"
                        />
                        <div className="range-container mt-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={valueSynchronizedInputs === "" ? 0 : valueSynchronizedInputs}
                                onChange={handleChangeRangeInput}
                                style={{
                                    background: `linear-gradient(to right, #2DD4BF ${valueSynchronizedInputs}%, #424B57 ${valueSynchronizedInputs}%)`
                                }}
                                className="customRange"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h3 className="text-[#f3f4f6] text-lg w-48">Altere a cor da fonte das notas:</h3>
                    
                    <div className="mt-3 text-[#f3f4f6] flex justify-between items-center">
                        <div className="flex items-center gap-2 relative">
                            <label htmlFor="checkWhite">Branco:</label>
                            <input
                                type="checkbox"
                                id="checkWhite" 
                                className="relative top-[1.5px]"
                                value="Branco"
                                checked={selectedCheckbox == "Branco"}
                                onChange={handleCheckboxChange}
                            />
                        </div>

                        <div className="flex items-center gap-2 relative">
                            <label htmlFor="checkBlack">Preto:</label>
                            <input
                                type="checkbox"
                                id="checkBlack" 
                                className="relative top-[1.5px]"
                                value="Preto"
                                checked={selectedCheckbox == "Preto"}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsContainer