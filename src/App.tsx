import React from "react";
import './someCss.css';
import './someScss.scss'

const App = () => {
    const exp = 'Текст из реакт-приложения123';

    return (
        <p style={{width: '100%'}} className='par'>
            <span style={{textAlign: 'center'}} className='spa'>
                {exp}
            </span>
        </p>
    )
}

export default App;