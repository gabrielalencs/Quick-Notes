// React

import {
    useEffect, useState,
    useRef, useContext
} from 'react';

// Context

import { NoteInformationContext } from '../../context/NoteInformationContext';

// Tippy.js

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

// React Icons

import { FaBold, FaItalic } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { IoMicOutline } from "react-icons/io5";
import { FaRegSquare } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiSave } from "react-icons/fi";


const NoteCreationContainer = () => {
    const { noteInformation, setNoteInformation } = useContext(NoteInformationContext);

    console.log(noteInformation);


    const [textFormatting, setTextFormatting] = useState([]);
    const [recognitionInstance, setRecognitionInstance] = useState(null);
    const [interimText, setInterimText] = useState('');

    const containerNoteRef = useRef(null);


    // text formatting when clicking on buttons

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
        const tooltipsContent = [
            "Negrito", "Itálico", "Sublinhado",
            "Gravar voz", "Para gravação", "Limpar", "Salvar"
        ];

        document.querySelectorAll('.buttonTooltip').forEach((button, index) => {
            tippy(button, {
                content: tooltipsContent[index],
                animation: "shift-away",
                theme: "tippyPrimary",
            });
        });
    }, []);


    // capture audio and transcribe in the note creation container - button one and button two

    const startRecognition = () => {
        setRecognitionInstance(true);

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (window.SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'pt-BR';
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;

                    event.results[i].isFinal
                        ? finalTranscript += transcript
                        : interimTranscript += transcript;
                }

                setInterimText(interimTranscript);

                if (containerNoteRef.current) {
                    containerNoteRef.current.innerText += finalTranscript;
                }
            };

            recognition.onerror = (event) => {
                console.error('Erro no reconhecimento de fala:', event.error);
            };

            recognition.onend = () => {
                setInterimText('');
                setRecognitionInstance(null);
            };

            recognition.start();
            setRecognitionInstance(recognition);
        } else {
            console.error('API de reconhecimento de fala não é suportada neste navegador.');
        }
    };

    const stopRecognition = () => {
        if (recognitionInstance) {
            recognitionInstance.stop();
            setRecognitionInstance(null);
        }
    };


    // clear note creation container - button three

    const clearTextFromNotepad = () => {
        containerNoteRef.current.innerText = '';

        containerNoteRef.current.focus();

        console.log(textFormatting);
        setTextFormatting([])
    };


    const addNote = () => {
        const textTypedInContainer = containerNoteRef.current.innerHTML;

        const currentDate = new Date();
        const dateFormatted = currentDate.toLocaleDateString();
        const timeFormatted = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        const createdNoteInformation = {
            text: textTypedInContainer,
            date: dateFormatted,
            time: timeFormatted
        };


        setNoteInformation([...noteInformation, createdNoteInformation]);
        clearTextFromNotepad();
    };



    return (
        <div className='max-w-[700px] flex-1'>
            <div className="border border-blue-header rounded-md">
                <div className="py-4 px-5 flex items-center gap-5 text-white bg-blue-container-notes-header">
                    <button
                        className={`textFormattingButton buttonTooltip ${textFormatting.includes('font-bold') ? 'text-blue-buttons' : ''}`}
                        onClick={() => toggleTextFormatting('font-bold')}
                    >
                        <FaBold />
                    </button>
                    <button
                        className={`textFormattingButton buttonTooltip ${textFormatting.includes('italic') ? 'text-blue-buttons' : ''}`}
                        onClick={() => toggleTextFormatting('italic')}
                    >
                        <FaItalic />
                    </button>
                    <button
                        className={`textFormattingButton buttonTooltip ${textFormatting.includes('underline') ? 'text-blue-buttons' : ''}`}
                        onClick={() => toggleTextFormatting('underline')}
                    >
                        <MdFormatUnderlined className="text-xl relative top-[0.5px]" />
                    </button>
                </div>

                <div
                    className='bg-blue-container-notes h-[350px] p-5 '>
                    <span
                        className='outline-none text-white inline-block w-full'
                        ref={containerNoteRef}
                        contentEditable
                        suppressContentEditableWarning
                    />
                    <span className='outline-none text-white opacity-50'>{interimText}</span>
                </div>
            </div>

            <div className='flex justify-center gap-5 flex-wrap mt-8'>
                <button className='buttonsContainerNoteCreation buttonTooltip' onClick={startRecognition}><IoMicOutline /></button>
                <button className='buttonsContainerNoteCreation buttonTooltip' onClick={stopRecognition}><FaRegSquare /></button>
                <button className='buttonsContainerNoteCreation buttonTooltip' onClick={clearTextFromNotepad}><RiDeleteBinLine /></button>
                <button className='buttonsContainerNoteCreation buttonTooltip' onClick={addNote}><FiSave /></button>
            </div>
        </div>
    );
};

export default NoteCreationContainer;
