import Dialog, { DialogProps } from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import React, { useEffect } from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { modalConfig } from ".."
import { useLocalStore, observer } from "mobx-react-lite"
import { MessageDialogStore, MessageDialogStoreContext } from "./MessageDialogStore"
import { MessageDialogNormalActions } from "./MessageDialogNormalActions"
import { MessageDialogBiggerActions } from "./MessageDialogBiggerActions"
import { TransitionProps } from "@material-ui/core/transitions/transition"

export type ActionColorType = "inherit" | "primary" | "secondary"

export interface MessageOptions extends Pick<DialogProps, "fullWidth" | "maxWidth" | "scroll" | "fullScreen"> {
   /** array of possible actions */
   actions?: MessageDialogAction[],
   /** dialog's title */
   title?: React.ReactElement | string,
   /** dialog's content*/
   content?: React.ReactElement | string,
   /** variants on how the message/actions are displayed */
   variant?: 'normal' | 'bigger actions'
}

export interface MessageDialogAction {
   /** action name (will appear on button) */
   name: string
   /** action title (will be a tooltip) */
   title?: string
   /** action itself (what to execute if the user clicks the button) */
   callback?: () => any
   /** function that returns true or false whether the user can proceed with that action */
   preCallbackValidation?: () => Promise<boolean>
   /** button color */
   color?: ActionColorType
   /** action identifier, to identify the message when using async await actions instead of callbacks */
   identifier?: string
}

export type TransitionComponentProps = TransitionProps & { children?: React.ReactElement<any, any> }

export type MessageDialogProps = MessageOptions & {
   container?: HTMLElement,
   resolve?: (value?: MessageDialogAction | PromiseLike<MessageDialogAction> | undefined) => void
   children?: React.ReactNode;
   open?: boolean
   onClose?: () => any
   TransitionComponent?: React.ComponentType<TransitionComponentProps>;
}

export const MessageDialog = observer(({ actions, title, content, variant, container, resolve, onClose, open, children, TransitionComponent, ...dialogProps }: MessageDialogProps) => {
   const store = useLocalStore(source => new MessageDialogStore(source), { actions, title, content, variant, container, resolve, onClose, open })

   useEffect(() => {
      return () => {
         if (store.removed)
            return
         if (!!container) {
            document.body.removeChild(container)
            store.removed = true
         }
      }
   })

   useEffect(() => {
      setTimeout(() => {
         if (store.firstButton.current) {
            store.firstButton.current.focus()
         }
      })
   })

   const dialog = (
      <MessageDialogStoreContext.Provider value={store}>
         <Dialog
            {...dialogProps}
            open={store.open}
            onClose={store.handleDirectClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={TransitionComponent}
         >
            {!!title &&
               <DialogTitle id="alert-dialog-title">
                  {title}
               </DialogTitle>
            }
            {!!content &&
               <DialogContent>
                  {content}
               </DialogContent>
            }
            {!!children &&
               <DialogContent>
                  {children}
               </DialogContent>
            }
            {!!store.hasNormalActions && <MessageDialogNormalActions />}
            {!!store.hasBiggerActions && <MessageDialogBiggerActions />}
         </Dialog>
      </MessageDialogStoreContext.Provider>
   )

   if (store.hasSeparateContainer) {
      return (
         <MuiThemeProvider theme={modalConfig.theme}>
            {dialog}
         </MuiThemeProvider>
      )
   } else {
      return dialog
   }

})