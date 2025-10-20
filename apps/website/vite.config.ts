import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig( {
    plugins: [ react() ],
    build: { cssCodeSplit: false },
    server: {
        port: 5000,
        host: true,
    },
} );
