import React from "react";

import style from './someScss.module.scss'
import './someCss.css';

import imgJpg from 'src/assets/images/sea.jpg';
import imgPng from 'src/assets/images/kisspng-flying-squirrel-bat-raccoon-rodent-gliding.png';
import imgSvg from 'src/assets/icons/delete.svg';

const App = () => {
    const exp = 'Текст из реакт-приложения123';

    return (
        <>
            <p style={{width: '100%'}} className={style.par}>
            <span style={{textAlign: 'center'}} className={`spa ${style.spa}`}>
                {exp}
            </span>
                <img src={imgJpg} alt="sea"/>
                <img src={imgSvg} alt="sea"/>
            </p>
            <img src={imgPng} alt=""/>
        </>
    )
}

export default App;