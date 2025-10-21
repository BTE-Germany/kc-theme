import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none"
        }),
        tailwindcss(),
        // visualizer({ open: true }) // Deaktiviert für schnelleren Build
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
    server: {
        hmr: {
            overlay: true
        }
    },
    logLevel: 'info'
});
