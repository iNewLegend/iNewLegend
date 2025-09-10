import React from "react";
import ReactDOM from "react-dom/client";

import App from "@inewlegend/website/src/app.tsx";
import "@inewlegend/website/src/index.css";

ReactDOM.createRoot( document.getElementById( "root" )! ).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
