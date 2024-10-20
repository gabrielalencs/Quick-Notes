// React

import { useContext, useEffect, useState } from "react";

// Context

import { NoteInformationContext } from "../../context/NoteInformationContext";

// React Icons

import { RiDeleteBinLine } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";
import { LuDownload } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";


const NoteContainer = () => {
    const { noteInformation, setNoteInformation } = useContext(NoteInformationContext);

    const colorNotes = noteInformation[0]?.backgroundColor;

    const [isOpenNoteEditing, setIsOpenNoteEditing] = useState(true);
    const [objectOfClickedElement, setObjectOfClickedElement] = useState();


    const closeContainer = (setIsContainer) => {
        setIsContainer(true);
        document.querySelector('body').classList.remove('overflow-hidden');
        document.querySelector('body').classList.remove('scrollHiddenActive');
    }


    const openNoteEditingContainer = (idOfClickedContainer) => {
        const objectOfClickedElement = noteInformation.find(note => note.id === idOfClickedContainer);
        setObjectOfClickedElement(objectOfClickedElement);

        setIsOpenNoteEditing(false);
        window.scrollTo(0, 0);
        document.querySelector('body').classList.add('overflow-hidden');
        document.querySelector('body').classList.add('scrollHiddenActive');

        document.querySelector('.inputTextarea').value = objectOfClickedElement.text;
    };


    const saveNoteEdit = () => {
        const editedText = document.querySelector('.inputTextarea').value;

        setNoteInformation(prevNotes => {
            return prevNotes.map(note => {
                if (note.id === objectOfClickedElement.id) {
                    return { ...note, text: editedText };
                }
                return note;
            });
        });

        closeContainer(setIsOpenNoteEditing);
    };


    const downloadNote = (idOfClickedContainer) => {
        const textOfClickedElement = noteInformation.find(note => note.id === idOfClickedContainer).text;

        const dataBlob = new Blob([textOfClickedElement], { type: "text/plain;charset=utf-8" });
        const linkUrl = window.URL.createObjectURL(dataBlob);

        const linkElement = document.createElement("a");
        linkElement.href = linkUrl;
        linkElement.download = "nota.txt";
        document.body.appendChild(linkElement);
        linkElement.click();

        document.body.removeChild(linkElement);
        window.URL.revokeObjectURL(linkUrl);
    };

    const deleteNote = (idOfClickedContainer) => {
        const filteredArrayWithDeletedNote = noteInformation.filter(note => note.id !== idOfClickedContainer);

        setNoteInformation(filteredArrayWithDeletedNote);
        localStorage.setItem('notes-created', JSON.stringify(filteredArrayWithDeletedNote));
    };


    useEffect(() => {
        const favoriteSavedNotes = JSON.parse(localStorage.getItem('notes-created')) || [];

        setNoteInformation(favoriteSavedNotes);
    }, []);



    

    const [isOpenNoteClassification, setIsOpenNoteClassification] = useState(false);
    
    const [isOpenDropdownClassification, setIsOpenDropdownClassification] = useState(false);

    const [selectedOption, setSelectedOption] = useState('Nova');

    const options = ['Nova', 'Concluída', 'Prioridade', 'Urgente', 'Andamento', 'Opcional'];

    const toggleDropdown = () => {
        setIsOpenDropdownClassification(!isOpenDropdownClassification);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenNoteClassification(false);
        
    };


    return (
        <div className="flex-1 grid gap-10 place-content-start sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-y-16 lg:gap-7 min-[1589px]:grid-cols-3">
            {
                noteInformation.map(noteCreated => (
                    <div
                        key={noteCreated.id}
                        className={`postIt max-w-[300px] md:max-w-[350px] bg-[#273347]`}
                        style={{ backgroundColor: !noteCreated.backgroundColor ? colorNotes : noteCreated.backgroundColor }}
                    >
                        <div className="flex items-center gap-4 flex-wrap justify-between">
                            <div className="flex items-center flex-wrap gap-1 text-sm">
                                <span>{noteCreated.date}</span>
                                <span>-</span>
                                <span>{noteCreated.time}</span>
                            </div>

                            <div className="bg-[#2DD4BF] px-2 py-1 rounded-lg font-semibold text-black text-sm">
                                <span>Nova</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p
                                className="text-xl font-normal text-white"
                                style={{
                                    fontSize: noteCreated.fontSize + 'px',
                                    color: noteCreated.fontColor == 'Preto' ? '#000' : '#fff',
                                    transition: 'color .2s'
                                }}
                                dangerouslySetInnerHTML={{ __html: noteCreated.text }}
                            />
                        </div>

                        <div className="mt-6 flex gap-6 text-[#2DD4BF] text-xl">
                            <div className="iconsContainerNote" onClick={() => deleteNote(noteCreated.id)}>
                                <RiDeleteBinLine />
                            </div>

                            <div className="iconsContainerNote" onClick={() => openNoteEditingContainer(noteCreated.id)}>
                                <SlPencil />
                            </div>

                            <div className="iconsContainerNote" onClick={() => downloadNote(noteCreated.id)}>
                                <LuDownload />
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className={`duration-200 ${isOpenNoteEditing ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <div className="bg-black opacity-35 absolute w-screen h-screen top-0 right-0"></div>
                <div className="bg-[#1F2937] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-7 border-[1px] border-[#424b57] rounded-md w-10/12 max-w-[700px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl text-white font-bold">Editar nota</h3>

                        <IoCloseCircleOutline
                            className="text-white text-3xl duration-300 cursor-pointer hover:text-[#5EEAD4]"
                            onClick={() => closeContainer(setIsOpenNoteEditing)}
                        />
                    </div>

                    <div className="mt-4">
                        <p className="text-[#fff9] text-lg">Atualizar informações da nota:</p>
                        <textarea className="inputTextarea mt-5 resize-none bg-[#111827] rounded-md duration-200 w-full border-[1px] border-transparent text-white focus:outline-none hover:border-[#2dd4bf] focus:border-[#2dd4bf] focus:shadow-md focus:shadow-[#2dd4bf33] p-3 h-28" />
                    </div>

                    <div className="flex items-center gap-5 mt-7">
                        <button className="buttonsContainerEditNote bg-[#94A3B8] hover:bg-[#cbd5e1;]" onClick={() => closeContainer(setIsOpenNoteEditing)}>Cancelar</button>
                        <button className="buttonsContainerEditNote bg-[#2dd4bf] hover:bg-[#5eead4]" onClick={saveNoteEdit}>Salvar</button>
                    </div>
                </div>
            </div>

            <div className={`duration-200 ${isOpenNoteClassification ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
                <div className="bg-black opacity-35 absolute w-screen h-screen top-0 right-0"></div>

                <div className="bg-[#1F2937] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-7 border-[1px] border-[#424b57] rounded-md w-10/12 max-w-[700px]">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl text-white font-bold">Selecionar tag da nota</h3>
                        <IoCloseCircleOutline
                            className="text-white text-3xl duration-300 cursor-pointer hover:text-[#5EEAD4]"
                            onClick={() => closeContainer(setIsOpenNoteClassification)}
                        />
                    </div>

                    <div className="mt-4">
                        <p className="text-[#fff9] text-lg">Classifique sua nota</p>
                        <div className="relative w-full">
                            <button
                                onClick={toggleDropdown}
                                className="mt-5 bg-[#111827] rounded-md duration-200 w-full border-[1px] text-white p-3 h-14 flex justify-between items-center border-[#424b57] hover:border-[#2dd4bf]">
                                {selectedOption}
                                <div className="arrow"></div>
                            </button>

                            <ul className={`listOptionalTags absolute z-10 w-full bg-[#111827]  rounded-md shadow-md mt-1 duration-200 border-[1px] border-[#424b57] ${isOpenDropdownClassification ? 'h-40 overflow-y-scroll opacity-100' : 'h-0 overflow-hidden opacity-0'}`}>
                                {options.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => handleOptionClick(option)}
                                        className="p-3 text-white duration-200 hover:bg-[#ffffff08] cursor-pointer"
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mt-7">
                        <button className="buttonsContainerEditNote bg-[#94A3B8] hover:bg-[#cbd5e1;]" onClick={() => closeContainer(setIsOpenNoteClassification)}>Cancelar</button>
                        <button className="buttonsContainerEditNote bg-[#2dd4bf] hover:bg-[#5eead4]">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteContainer