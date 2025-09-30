import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'pages/login.html'),
                register: resolve(__dirname, 'pages/register.html'),
                about: resolve(__dirname, 'pages/aboutus.html'),
                expenses: resolve(__dirname, 'pages/expenses.html')
            }
        }
    }
})

