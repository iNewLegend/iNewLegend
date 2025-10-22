import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "@inewlegend/website/src/app.tsx";
import { Resume } from "@inewlegend/website/src/components/resume";
import "@inewlegend/website/src/index.scss";

const router = createBrowserRouter( [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/print/resume",
        element: (
            <div className="min-h-screen bg-white text-black">
                <Resume />
            </div>
        ),
    },
] );

ReactDOM.createRoot( document.getElementById( "root" )! ).render(
    <React.StrictMode>
        <RouterProvider router={ router } />
    </React.StrictMode>,
);
