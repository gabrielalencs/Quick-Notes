import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Context

import { NoteInformationProvider } from './context/NoteInformationContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NoteInformationProvider>
            <App />
        </NoteInformationProvider>
    </StrictMode>
)