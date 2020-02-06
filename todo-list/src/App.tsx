import React from 'react'

import './App.css'
import 'typeface-roboto'
import { theme } from 'theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Main } from 'features/Main'

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Main />
        </MuiThemeProvider>
    )
}

export default App;
