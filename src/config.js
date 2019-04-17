const config = {
    API_ROOT: 'https://api.themoviedb.org/3',
    API_KEY: '337f338ffc9eae3e5378cc87107d0a13',
    API_IMAGE: {
        small: 'https://image.tmdb.org/t/p/w185/',
        medium: 'https://image.tmdb.org/t/p/w300/',
        large: 'https://image.tmdb.org/t/p/w500/',
        original: 'https://image.tmdb.org/t/p/original/'
    },
    API_LANGUAGES: [
        {
            id: 1,
            title: "Ўзбекча",
            code: 'uz'
        },
        {
            id: 2,
            title: "O'zbekcha",
            code: 'oz'
        },
        {
            id: 3,
            title: 'Русский',
            code: 'ru'
        }
    ]
};

export default config;