export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {};

            newUtilities[".card"] = {
                "background-color": "white",
                padding: "1rem",
                "border-radius": "0.375rem",
                margin: "0 auto",
                "max-width": "max-content",
                "max-height": "max-content",
            };

            newUtilities[".card-parent"] = {
                height: "100vh",
                display: "flex",
                "justify-content": "center",
                "align-items": "flex-end",
            };

            newUtilities[".li"] = {
                "&:hover": { color: "#2d3748" },
                cursor: "pointer",
            };

            newUtilities[".mt-2\\/3"] = { "margin-top": "66.666667%" };

            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
