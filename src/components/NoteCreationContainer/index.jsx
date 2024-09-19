// Reacy

import { useEffect, useState, useRef } from 'react';

// Tippy.js

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

// React Icons

import { FaBold, FaItalic } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { IoMicOutline } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FiSave } from "react-icons/fi";


const NoteCreationContainer = () => {
    const [textFormatting, setTextFormatting] = useState([]);
    const containerNoteRef = useRef(null);

    const toggleTextFormatting = (formatType) => {

        containerNoteRef.current.focus();

        setTextFormatting((prevFormats) => {
            return prevFormats.includes(formatType)
                ? prevFormats.filter((type) => type !== formatType)
                : [...prevFormats, formatType];
        });

        applyFormatting(formatType);
    };

    const applyFormatting = (formatType) => {
        const commands = {
            'font-bold': 'bold',
            'italic': 'italic',
            'underline': 'underline',
        };

        const selection = window.getSelection();
        if (selection.rangeCount > 0 && commands[formatType]) {
            document.execCommand(commands[formatType], false, null);
        }
    };

    useEffect(() => {
        const tooltipsContent = ["Negrito", "Itálico", "Sublinhado"];
        document.querySelectorAll('.textFormattingButton').forEach((button, index) => {
            tippy(button, {
                content: tooltipsContent[index],
                animation: "shift-away",
                theme: "tippyPrimary",
            });
        });
    }, []);

    return (

        <div>
            <div className="border border-blue-header rounded-md max-w-[700px]">
                <div className="py-4 px-5 flex items-center gap-5 text-white bg-blue-container-notes-header">
                    <button
                        className={`textFormattingButton ${textFormatting.includes('font-bold') ? 'text-blue-buttons' : ''}`}
                        onClick={() => toggleTextFormatting('font-bold')}
                    >
                        <FaBold />
                    </button>
                    <button
                        className={`textFormattingButton ${textFormatting.includes('italic') ? 'text-blue-buttons' : ''}`}
                        onClick={() => toggleTextFormatting('italic')}
                    >
                        <FaItalic />
                    </button>
                    <button
                        className={`textFormattingButton ${textFormatting.includes('underline') ? 'text-blue-buttons' : ''}`}
                        onClick={() => toggleTextFormatting('underline')}
                    >
                        <MdFormatUnderlined className="text-xl relative top-[0.5px]" />
                    </button>
                </div>

                <div
                    className='bg-blue-container-notes h-[350px] p-5 outline-none text-white'
                    ref={containerNoteRef}
                    contentEditable
                    suppressContentEditableWarning />
            </div>

            <div>
                
            </div>
        </div>
    );
};

export default NoteCreationContainer;