import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { MessageDialogStoreContext } from "./MessageDialogStore"
import { MessageDialogBiggerAction } from "./MessageDialogBiggerAction"
import DialogContent from "@material-ui/core/DialogContent"
import List from "@material-ui/core/List"

export const MessageDialogBiggerActions = observer(() => {
    const store = useContext(MessageDialogStoreContext)
    return (
        <DialogContent>
            <List>
                {store.source.actions?.map((item, index) => <MessageDialogBiggerAction key={index} action={item} index={index} />)}
            </List>
        </DialogContent>
    )
})