import React, {FC} from "react";

import style from './someScss.module.scss'
import './someCss.css';

import imgJpg from 'src/assets/images/sea.jpg';
import imgPng from 'src/assets/images/kisspng-flying-squirrel-bat-raccoon-rodent-gliding.png';
import imgSvg from 'src/assets/icons/delete.svg';

import {func2} from './someTs';

const App:FC = () => {
    const exp13323123 = 'Текст из реакт-приложения123';
    const baasd = 'adasda'; // чтобы ес линту было на что ругаться

    const abc5345345345 = (): void => console.log(0);
    abc5345345345();

    func2(333);


    return (
        <>
            <div style={{width: '100%'}} className={style.par}>
                <h2>Заголовок</h2>
                <input type="text" placeholder='плейсхолдер'/>
            <span style={{textAlign: 'center'}} className={`spa ${style.spa}`}>
                {exp13323123}
            </span>
                <img src={imgJpg} alt="sea"/>
                <img src={imgSvg} alt="sea"/>
            </div>
            <img src={imgPng} alt=""/>
        </>
    )
}

export default App;