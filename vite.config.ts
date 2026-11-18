import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none"
        }),
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
            // Import Tabler icons from the ESM entry so unused icons are tree-shaken in dev and build.
            "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs"
        }
    }
});
