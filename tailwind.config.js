const colors = require('tailwindcss/colors')
module.exports = {
    content: [
        "./src/**/*.{html,ts}", './node_modules/tw-elements/dist/js/**/*.js'
    ],
    theme: {
        extend: {
            colors: {
                sky: colors.sky,
                teal: colors.teal,
                cyan: colors.cyan,
                rose: colors.rose,
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('tw-elements/dist/plugin'),

    ],
}