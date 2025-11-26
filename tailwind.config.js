/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#030014",
                secondary: "#000848ff",
                accent: "#dd44ffff",
                light:
                {
                    100: '#D6C6FF',
                    200: '#B999FF',
                    300: '#9C6CFF',
                },
                dark:
                {
                    100: '#1A003E',
                    200: '#33007A',
                    300: '#4D00B5',
                }
            },
        },
    },
    plugins: [],
}