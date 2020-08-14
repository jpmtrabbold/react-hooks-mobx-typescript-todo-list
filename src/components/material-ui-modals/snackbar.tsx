import React from 'react'
import { SnackbarComponent } from "./SnackbarComponent"
import ReactDOM from "react-dom"
import { SnackbarOrigin } from '@material-ui/core/Snackbar'

export interface SnackbarOptions {
    /** text that will appear on the snackbar */
    title: string,
    anchorOrigin?: SnackbarOrigin
    autoHideDuration?: number | null
    variant?: 'success' | 'warning' | 'error' | 'info'
    actions?: React.ReactNode[]
 }
 
 /**
  * shows a snackbar to the user. Useful for non-obstrusive updates like 'entity was saved successfully)
  * @param options snackbar options
  */
 export function snackbar(options: SnackbarOptions) {
    var div = document.createElement('div')
    ReactDOM.render(
       <SnackbarComponent container={div} {...options} />,
       document.body.appendChild(div)
    )
 }
 
 