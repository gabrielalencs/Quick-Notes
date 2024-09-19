import { useEffect, useState, useRef } from 'react';

// Tippy.js

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/svg-arrow.css';

// React Icons

import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";


const NoteCreationContainer = () => {
    const [textFormatting, setTextFormatting] = useState([]);

    const containerNoteRef = useRef(null);

    console.log(textFormatting);


    const toggleTextFormatting = (formatType) => {
        let updateFormating;

        if (textFormatting.includes(formatType)) {
            updateFormating = textFormatting.filter(type => type !== formatType)
        } else {
            updateFormating = [...textFormatting, formatType]
        }

        setTextFormatting(updateFormating);
    };


    const applyFormatting = () => {
        containerNoteRef.current.focus();

        const commands = {
            'font-bold': 'bold',
            'italic': 'italic',
            'underline': 'underline'
        };

        textFormatting.forEach((format) => {
            if (commands[format]) {
                document.execCommand(commands[format], false, null);
            }
        });
    };


    useEffect(() => {
        applyFormatting();
    }, [textFormatting]);


    useEffect(() => {
        const tooltipsContent = [
            "Negrito",
            "Itálico",
            "Sublinhado",
        ];

        document.querySelectorAll('.textFormattingButton').forEach((button, index) => {
            tippy(button, {
                content: tooltipsContent[index],
                animation: "shift-away",
                theme: "textFormattingButtonTippy",
            });
        });
    }, []);

    return (
        <div className="border border-blue-header rounded-md max-w-[700px]">
            <div className="py-4 px-5 flex items-center gap-5 text-white bg-blue-container-notes-header">
                <button
                    className={`textFormattingButton ${textFormatting.includes('font-bold') ? 'text-blue-buttons' : ''}`}
                    onClick={() => {
                        toggleTextFormatting('font-bold');
                        applyFormatting();
                    }}
                >
                    <FaBold />
                </button>
                <button
                    className={`textFormattingButton ${textFormatting.includes('italic') ? 'text-blue-buttons' : ''}`}
                    onClick={() => {
                        toggleTextFormatting('italic');
                        applyFormatting();
                    }}
                >
                    <FaItalic />
                </button>
                <button
                    className={`textFormattingButton ${textFormatting.includes('underline') ? 'text-blue-buttons' : ''}`}
                    onClick={() => {
                        toggleTextFormatting('underline');
                        applyFormatting();
                    }}
                >
                    <MdFormatUnderlined className="text-xl relative top-[0.5px]" />
                </button>
            </div>

            <div
                className='bg-blue-container-notes h-[350px] p-5 outline-none text-white'
                ref={containerNoteRef}
                contentEditable
                suppressContentEditableWarning>
                
            </div>
        </div>
    );
};

export default NoteCreationContainer;