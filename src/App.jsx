import React from "react";
import AppRouter from "./routes";
import { AuthProvider } from "./context/AuthContext";
import '@sweetalert2/theme-dark/dark.css'; // Importando o tema escuro
import './App.css';
const App = () => {
    return (
      <AuthProvider> 
         <AppRouter />
      </AuthProvider>
    )};

export default App
