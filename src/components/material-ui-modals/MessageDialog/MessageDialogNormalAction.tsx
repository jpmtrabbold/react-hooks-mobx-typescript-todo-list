import useStore from "mobx-store-utils"
import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { MessageDialogAction } from "./MessageDialog"
import { MessageDialogStoreContext } from "./MessageDialogStore"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"

interface MessageDialogNormalActionProps {
    action: MessageDialogAction
    index: number
}
export const MessageDialogNormalAction = observer(({ action, index }: MessageDialogNormalActionProps) => {
    const store = useContext(MessageDialogStoreContext)

    const localStore = useStore(source => ({
        handleClose() {
            store.handleClose(source.action)
        }
    }), { action, index })

    const prop = (index === 0 ? { buttonRef: store.firstButton } : {})
    const button = (
        <Button onClick={localStore.handleClose} color={action.color || 'inherit'} {...prop} key={`dialogbutton${index}`}>
            {action.name}
        </Button>
    )

    const buttonWithTooltip = (!!action.title ? (
        <Tooltip title={action.title}>
            {button}
        </Tooltip>
    ) : button)

    return (
        <React.Fragment key={index}>
            {index > 0 && <br />}
            {buttonWithTooltip}
        </React.Fragment>
    )
})