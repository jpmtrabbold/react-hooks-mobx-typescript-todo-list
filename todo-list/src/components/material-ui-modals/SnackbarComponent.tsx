import ReactDOM from "react-dom"
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import CloseIcon from '@material-ui/icons/Close'
import { MuiThemeProvider } from "@material-ui/core/styles"
import { modalConfig } from "."
import { SnackbarOptions } from "./snackbar"

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'

import { makeStyles } from "@material-ui/core/styles"
import { green, yellow, red, blue } from "@material-ui/core/colors"
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
   success: {
      backgroundColor: green[600]
   },
   warning: {
      backgroundColor: yellow[800]
   },
   error: {
      backgroundColor: red[700]
   },
   info: {
      backgroundColor: blue[600]
   },
   icon: {
      fontSize: 20
   },
   iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
   },
   message: {
      display: 'flex',
      alignItems: 'center'
   }
}))

export const SnackbarComponent = ({
   title,
   anchorOrigin,
   autoHideDuration,
   variant = 'info',
   container,
   actions = [],
}: SnackbarOptions & { container: HTMLElement }) => {
   const removed = useRef(false)
   const [open, setOpen] = useState(true)
   const classes = useStyles()

   const contentClass = useMemo(() => {
      return classes[variant]
   }, [classes, variant])

   const Icon = useMemo(() => {
      switch (variant) {
         case 'success':
            return CheckCircleIcon
         case 'warning':
            return WarningIcon
         case 'error':
            return ErrorIcon
         case 'info':
            return InfoIcon
      }
   }, [variant])

   useEffect(() => {
      return () => {
         if (removed.current)
            return

         document.body.removeChild(container)
         removed.current = true
      }
   })

   const handleClose = useCallback(() => {
      setOpen(false)
      setTimeout(() => ReactDOM.unmountComponentAtNode(container))
   },[container])

   const origin = useMemo(() => {
      if (anchorOrigin) {
         return anchorOrigin
      } else {
         return {
            vertical: 'top',
            horizontal: 'center',
         } as SnackbarOrigin
      }
   }, [anchorOrigin])

   const snackbarActions = useMemo(() => {
      return [
         <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
         >
            <CloseIcon />
         </IconButton>,
         ...actions]
   }, [actions, handleClose])

   return (
      <MuiThemeProvider theme={modalConfig.theme}>
         <Snackbar
            anchorOrigin={origin}
            open={open}
            autoHideDuration={autoHideDuration || 6000}
            onClose={handleClose}
            ContentProps={{
               'aria-describedby': 'message-id',
               classes: {
                  root: contentClass
               }
            }}
            message={
               <span id="message-id" className={classes.message}>
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                  <span style={{ fontWeight: 600 }}>{title}</span>
               </span>
            }
            action={snackbarActions}
         />
      </MuiThemeProvider>
   )
}
