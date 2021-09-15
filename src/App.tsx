import React from "react";

const App = () => {
    const exp = 'Текст из реакт-приложения123';

    return (
        <p style={{width: '100%'}}>
            <span style={{textAlign: 'center'}}>
                {exp}
            </span>
        </p>
    )
}

export default App;