export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {};

            // Add your custom classes here
            newUtilities[".mt-2\\/3"] = { "margin-top": "66.666667%" };

            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
