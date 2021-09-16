import React from "react";
import './someCss.css';
import style from './someScss.module.scss'

const App = () => {
    const exp = 'Текст из реакт-приложения123';

    return (
        <p style={{width: '100%'}} className={style.par}>
            <span style={{textAlign: 'center'}} className={`spa ${style.spa}`}>
                {exp}
            </span>
        </p>
    )
}

export default App;