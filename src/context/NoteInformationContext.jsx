import { createContext, useState } from "react";

export const NoteInformationContext = createContext();

export const NoteInformationProvider = ({ children }) => {

    const [noteInformation, setNoteInformation] = useState([])

    return (
        <NoteInformationContext.Provider value={{noteInformation, setNoteInformation}}>
            {children}
        </NoteInformationContext.Provider>
    )
};