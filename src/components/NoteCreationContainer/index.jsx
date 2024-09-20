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
import { RiDeleteBinLine } from "react-icons/ri";
import { FiSave } from "react-icons/fi";

const NoteCreationContainer = () => {
    const [textFormatting, setTextFormatting] = useState([]);
    const [recognitionInstance, setRecognitionInstance] = useState(null);
    const [transcriptText, setTranscriptText] = useState('');
    const [interimText, setInterimText] = useState('');



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

    // Iniciar gravação de fala
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

                    if (event.results[i].isFinal) {
                        // Acumula o texto finalizado
                        finalTranscript += transcript;
                    } else {
                        // Exibe o texto provisório
                        interimTranscript += transcript;
                    }
                }

                // Atualiza o texto final e provisório
                setTranscriptText((prevText) => prevText + finalTranscript); // Acumula o texto final
                setInterimText(interimTranscript); // Exibe o texto provisório
            };

            recognition.onerror = (event) => {
                console.error('Erro no reconhecimento de fala:', event.error);
            };

            recognition.onend = () => {
                console.log('Reconhecimento de fala terminado.');
                setInterimText(''); // Limpa o texto provisório ao finalizar
                setRecognitionInstance(null);
            };

            recognition.start();
            setRecognitionInstance(recognition);
        } else {
            console.error('API de reconhecimento de fala não é suportada neste navegador.');
        }
    };

    // Parar gravação de fala
    const stopRecognition = () => {
        if (recognitionInstance) {
            recognitionInstance.stop();
            setRecognitionInstance(null);
        }
    };


    // useEffect(() => {
    //     const handleInput = () => {
    //         const textContent = containerNoteRef.current.textContent;
    //         if (!textContent) {
    //             // Se o conteúdo foi apagado, também apaga o texto no estado
    //             setTranscriptText('');
    //         }
    //     };

    //     const containerNote = containerNoteRef.current;
    //     containerNote.addEventListener('input', handleInput);

    //     return () => {
    //         containerNote.removeEventListener('input', handleInput);
    //     };
    // }, []);

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

    return (
        <div className='max-w-[700px]'>
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
                    className='bg-blue-container-notes h-[350px] p-5 outline-none text-white'
                    ref={containerNoteRef}
                    contentEditable
                    suppressContentEditableWarning
                >
                    {transcriptText}
                    <span style={{ opacity: 0.5 }}>{interimText}</span>
                </div>
            </div>

            <div className='flex justify-center gap-5 mt-8'>
                <button className='buttonsContainerNoteCreation buttonTooltip' onClick={startRecognition}>
                    <IoMicOutline />
                </button>

                <button className='buttonsContainerNoteCreation buttonTooltip' onClick={stopRecognition}>
                    <FaRegSquare />
                </button>

                <button className='buttonsContainerNoteCreation buttonTooltip'>
                    <RiDeleteBinLine />
                </button>

                <button className='buttonsContainerNoteCreation buttonTooltip'>
                    <FiSave />
                </button>
            </div>
        </div>
    );
};

export default NoteCreationContainer;
