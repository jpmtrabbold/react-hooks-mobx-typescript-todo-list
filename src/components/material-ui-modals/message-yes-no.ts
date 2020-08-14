import { messageActions } from "."

interface messageYesNoProps {
    title?: React.ReactElement | string, content: React.ReactElement | string
}
export async function messageYesNo({ title, content } : messageYesNoProps): Promise<boolean> {

    const answer = await messageActions({
        title: title, content: content, actions: [
            {
                name: 'Yes',
                color: 'primary'
            },
            {
                name: 'No',
                color: 'primary'
            },
        ]
    })
    
    if (!!answer && answer.name === 'Yes') {
        return true
    }

    return false
}