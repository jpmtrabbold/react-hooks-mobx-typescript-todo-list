import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { MessageDialogStoreContext } from "./MessageDialogStore"
import DialogActions from "@material-ui/core/DialogActions"
import { MessageDialogNormalAction } from "./MessageDialogNormalAction"

export const MessageDialogNormalActions = observer(() => {
    const store = useContext(MessageDialogStoreContext)
    
    return (
        <DialogActions>
            {store.source.actions?.map((item, index) => <MessageDialogNormalAction key={index} action={item} index={index} /> )}
        </DialogActions>
    )
})