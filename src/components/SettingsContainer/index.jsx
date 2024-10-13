// React

import { useState } from "react";

// React Icons

import { BsGearWideConnected } from "react-icons/bs";

// React Color

import { ChromePicker } from 'react-color';


const SettingsContainer = ({ colorPickerValue, updatePickerColor }) => {


    const handleChangeComplete = (colorPickerValue) => updatePickerColor(colorPickerValue.hex);

    const resetNoteColor = () => updatePickerColor('#273347');


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

                <div className="mt-5">
                    <h3 className="text-[#f3f4f6] text-lg">Altere o tamanho da fonte das notas:</h3>
                    <div>
                        <input 
                            type="number"
                            className="bg-[#111827] p-2 rounded-md duration-200 border-[1px] border-transparent text-white focus:outline-none hover:border-[#2dd4bf] focus:border-[#2dd4bf] focus:shadow-md focus:shadow-[#2dd4bf33]"
                        />
                        <input type="range" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsContainer