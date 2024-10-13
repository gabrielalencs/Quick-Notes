// React

import { useState } from "react";

// React Icons

import { BsGearWideConnected } from "react-icons/bs";

// React Color

import { ChromePicker } from 'react-color';


const SettingsContainer = ({ colorPickerValue = '#273347', updatePickerColor }) => {


    const handleChangeComplete = (colorPickerValue) => updatePickerColor(colorPickerValue.hex);

    const resetNoteColor = () => updatePickerColor('#273347');


    return (
        <div className="relative">
            <div className="flex justify-end">
                <div className="h-11 w-11 grid place-items-center rounded-full duration-300 hover:bg-[#2dd4bf0a]">
                    <BsGearWideConnected className="text-white text-2xl cursor-pointer duration-300 hover:rotate-12" />
                </div>
            </div>

            <div className="bg-[#1f2937] p-5 border-[1px] border-[#424b57]">
                <div className="relative w-max text-[#f3f4f6]">
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
            </div>
        </div>
    )
}

export default SettingsContainer