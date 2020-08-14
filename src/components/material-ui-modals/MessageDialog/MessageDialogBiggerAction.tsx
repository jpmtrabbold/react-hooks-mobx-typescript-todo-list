import React, { useContext } from "react"
import { observer, useLocalStore } from "mobx-react-lite"
import { MessageDialogAction } from "./MessageDialog"
import { MessageDialogStoreContext } from "./MessageDialogStore"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"

interface MessageDialogBiggerActionProps {
    action: MessageDialogAction
    index: number
}
export const MessageDialogBiggerAction = observer(({ action, index }: MessageDialogBiggerActionProps) => {
    const store = useContext(MessageDialogStoreContext)

    const localStore = useLocalStore(source => ({
        handleClose() {
            store.handleClose(source.action)
        }
    }), { action, index })

    return (
        <React.Fragment key={index}>
            <Divider component="li" />
            <ListItem button onClick={localStore.handleClose} key={`dialogbutton${index}`}>
                <ListItemText primary={(
                    <Typography color={action.color}>
                        {action.name}
                    </Typography>
                )} />

            </ListItem>
            {index === store.source.actions!.length - 1 && <Divider component="li" />}
        </React.Fragment>
    )
})