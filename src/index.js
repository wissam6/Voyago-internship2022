import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import '@progress/kendo-theme-default/dist/all.css';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const root = ReactDOM.createRoot(document.getElementById('root'));
const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

root.render(
  <ThemeSwitcherProvider
    themeMap={themes}
    defaultTheme="light"
    insertionPoint="styles-insertion-point"
  >

      <App />

  </ThemeSwitcherProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
