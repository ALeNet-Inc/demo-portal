import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; 
import 'flag-icon-css/css/flag-icon.min.css'
import App from './App';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: "en",
    detection: {
        order: ['cookie', 'htmlTag', 'localStorage', 'subdomain'],
        caches: ['cookie'],

    },
    backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
    }

  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h2>Loading..</h2>
  </div>
)

ReactDOM.render(
<Suspense fallback={loadingMarkup}>
  <App />
</Suspense>,
document.getElementById('root')
);
