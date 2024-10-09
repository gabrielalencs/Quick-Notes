// Styles

import './App.css';

// Components

import Header from './components/Header';
import NoteContainer from './components/NoteContainer';
import NoteCreationContainer from './components/NoteCreationContainer';


const App = () => {

    return (
        <>
            <Header />
            <main className='max-w-[1800px] mx-auto mt-14 px-10 flex flex-col gap-20 md:flex-row md:gap-10'>
                <NoteCreationContainer />
                <NoteContainer />
            </main>
        </>
    )
}

export default App