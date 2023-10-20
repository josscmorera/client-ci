import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

import App from './App'
import store from './redux/store'
import { darkTheme } from './theme'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)