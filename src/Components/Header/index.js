import React from "react";

import "./styles.css";

function App({ title }) {

    return (
        <>
            <h1>{title}</h1>
            <p>Observação: o campo "tecnologias" deve ter vírgulas separando cada uma delas.</p>
        </>
    );
}

export default App;
