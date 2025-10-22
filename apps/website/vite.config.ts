import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig( {
    plugins: [ react() ],
    build: { cssCodeSplit: false },
    css: {
        preprocessorOptions: {
            scss: {
                // Enable source maps for better debugging
                sourceMap: true,
            },
        },
    },
    server: {
        port: 5173,
        host: true,
        // Ensure HMR works properly
        hmr: true,
    },
} );
