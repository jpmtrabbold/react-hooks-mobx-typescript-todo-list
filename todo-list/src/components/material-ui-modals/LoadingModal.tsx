import React, { useEffect } from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import CircularProgress from "@material-ui/core/CircularProgress"
import ReactDOM from "react-dom"
import { modalConfig } from "."

export interface LoadingModalProps {
    container?: HTMLElement,
    title?: React.ReactElement | string
    visible: boolean
}

export const LoadingModal = (props: LoadingModalProps) => {
    const { visible, container, title } = props
    
    useEffect(() => {
        return () => {
            if (!!container && !visible) {
                document.body.removeChild(container)
            }
        }
    })

    useEffect(() => {
        if (!!container && !visible) {
            setTimeout(() => ReactDOM.unmountComponentAtNode(container))
        }
    }, [visible, container])

    const modal = (
        <Dialog open={visible} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent id="alert-dialog-description">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '150px', minHeight: '70px' }}>
                    <CircularProgress color='primary' />
                </div>
            </DialogContent>
        </Dialog>
    )

    if (container) {
        return (
            <MuiThemeProvider theme={modalConfig.theme}>
                {modal}
            </MuiThemeProvider>
        )
    } else {
        return modal
    }
}
