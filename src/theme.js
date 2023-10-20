import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff4500'
        },
        secondary: {
            main: '#b5e90b'
        }
    }
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
})