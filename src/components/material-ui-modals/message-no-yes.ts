import { messageActions } from "./message-actions"

interface messageNoYesProps {
    title?: React.ReactElement | string, content: React.ReactElement | string
}
export async function messageNoYes({ title, content } : messageNoYesProps): Promise<boolean> {

    const answer = await messageActions({
        title: title, content: content, actions: [
            {
                name: 'No',
                color: 'primary'
            },
            {
                name: 'Yes',
                color: 'primary'
            },
        ]
    })

    if (!!answer && answer.name === 'Yes') {
        return true
    }

    return false
}
