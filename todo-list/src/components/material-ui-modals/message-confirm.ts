import { messageActions } from "."

interface messageConfirmProps {
    title?: React.ReactElement | string
    content: React.ReactElement | string
    preCallbackValidation?: () => Promise<boolean>
}
export async function messageConfirm({ title, content, preCallbackValidation } : messageConfirmProps): Promise<boolean> {
    
    const answer = await messageActions({
        title: title, content: content, actions: [
            {
                name: 'Ok',
                color: 'primary',
                preCallbackValidation: preCallbackValidation,
            },
            {
                name: 'Cancel',
                color: 'primary'
            },
        ]
    })

    if (!!answer && answer.name === 'Ok') {
        return true
    }

    return false
}