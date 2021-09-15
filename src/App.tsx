import React from "react";

const App = () => {
    const exp = 'Текст из реакт-приложения123';

    return (
        <p style={{width: '100%'}}>
            <div style={{textAlign: 'center'}}>
                {exp}
            </div>
        </p>
    )
}

export default App;