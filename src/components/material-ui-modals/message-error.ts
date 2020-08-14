import { messageActions } from "./message-actions";

interface messageErrorProps {
    title?: React.ReactElement | string, content: React.ReactElement | string
}
export async function messageError({ title, content } : messageErrorProps) {
    if (title === undefined || title === null) {
        title = "Error"
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