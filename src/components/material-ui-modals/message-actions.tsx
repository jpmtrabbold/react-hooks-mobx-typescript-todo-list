import ReactDOM from "react-dom";
import React from "react"
import { MessageDialog } from ".";
import { MessageDialogAction, MessageOptions } from "./MessageDialog/MessageDialog";

/** shows dialog for user with different buttons/actions */
export const messageActions = async (options: MessageOptions) => new Promise<MessageDialogAction>((resolve, reject) => {
    if (!options.actions) {
        options.actions = []
    }

    if (options.actions.length === 0) {
        options.actions.push({ name: 'Close', color: 'primary' })
    }

    var div = document.createElement('div');
    ReactDOM.render(
        <MessageDialog container={div} {...options} resolve={resolve} />,
        document.body.appendChild(div)
    );
})
