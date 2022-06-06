module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            fontSize: {
                "64px": "64px",
            },
            spacing: {
                "480px": "30rem",
                "560px": "35rem",
                "720px": "45rem",
            },
            colors: {
                black: {
                    "black/10": "rgba(0,0,0,0.1)",
                    "black/50": "rgba(0,0,0,0.5)",
                    "black/100": "rgba(0,0,0)",
                },
                red: {
                    redCustom: "#fff",
                },
                gray: {
                    "gray/900": "#121829",
                    "gray/700": "#323B54",
                    "gray/600": "#475069",
                    "gray/400": "#767E94",
                    "gray/300": "#8E95A9",
                    "gray/200": "#A8AEBF",
                    "gray/100": "#C3C8D4",
                    "gray/50": "#EBEEF5",
                },
                primary: {
                    "primary/400": "#7B6EF6",
                    "primary/200": "#BEB7FB",
                    "primary/300": "#9C92F8",
                },
                warning: {
                    500: "#FFAD49",
                },
                blurBg: "#20283E",
            },
            backgroundImage: {
                backgroundMain: "url('/public/images/Background.png')",
            },
        },
    },
    plugins: [],
};
