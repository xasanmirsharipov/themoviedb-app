import i18n from 'i18next';
// import XHR from 'i18next-xhr-backend';
// import config from 'config';

const options = {
    fallbackLng: 'ru',
    ns: ['main'],
    defaultNS: 'main',
    keySeparator: false,
    //saveMissing: true,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    },
    //debug: true
};

// options.backend = {
//     loadPath: `${config.API_ROOT}/defaults/translations/{{lng}}/react`,
//     addPath: `${config.API_ROOT}/defaults/translations/{{lng}}/react`,
// };

options.resources = {
    en: {
        main: {
            'main': 'main',
        }
    },
};

export default () => {
    i18n
        // .use(XHR)
        .init(options);

    return i18n;
};