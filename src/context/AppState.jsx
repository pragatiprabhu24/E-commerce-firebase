import React, {useState} from 'react';
import AppContext from './AppContext';

const AppState = (props) => {
    const [mode, setMode] = useState('light')
    const [loading, setLoading] = useState(false)
 
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
    return (
        <AppContext.Provider value={{ mode, toggleMode, loading, setLoading }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppState;
