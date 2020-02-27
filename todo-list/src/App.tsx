import React from 'react'

import './App.css'
import 'typeface-roboto'
import { theme } from 'theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Main } from 'features/Main'
import { setModalTheme } from 'components/material-ui-modals'
import Utils from '@date-io/date-fns'
import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider'
import { DemoMain } from 'demo-features/DemoMain'

setModalTheme(theme)
const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={Utils}>
                {/* <Main /> */}
                <DemoMain/>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    )
}

export default App;
