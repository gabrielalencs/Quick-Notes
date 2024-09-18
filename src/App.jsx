// Styles

import './App.css';

// Components

import Header from './components/Header';
import NoteCreationContainer from './components/NoteCreationContainer';


const App = () => {

    return (
        <>
            <Header />
            <main className='mt-14 px-10'>
                <NoteCreationContainer />
            </main>
        </>
    )
}

export default App