import { messageActions } from "./message-actions";

interface messageInfoProps {
    title?: React.ReactElement | string, content: React.ReactElement | string
}
export async function messageInfo({ title = "Info", content } : messageInfoProps) {
    if (title === undefined || title === null) {
        title = "Info"
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