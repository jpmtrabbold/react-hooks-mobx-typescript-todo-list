import { messageActions } from "./message-actions";

interface messageWarningProps {
    title?: React.ReactElement | string, content: React.ReactElement | string
}
export async function messageWarning({ title = "Warning", content } : messageWarningProps) {
    if (title === undefined || title === null) {
        title = "Warning"
    }

    return messageActions({
        title: title, content: content, actions: [
            {
                name: 'Ok',
                color: 'primary'
            },
        ]
    })
}