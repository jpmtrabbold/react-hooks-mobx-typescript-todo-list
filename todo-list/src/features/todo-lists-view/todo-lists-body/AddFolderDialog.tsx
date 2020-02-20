import React, { useContext, useRef, useEffect, useLayoutEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { TodoListStoreContext } from '../TodoListsStore'
import { MessageDialog } from 'components/material-ui-modals'
import { InputProps } from 'components/input-props'
import { TextField } from '@material-ui/core'

export const AddFolderDialog = observer(() => {
    const store = useContext(TodoListStoreContext)
    const { folderStore } = store
    const inputRef = useRef<HTMLInputElement | null>(null)

    useLayoutEffect(() => {
        setTimeout(() => {
            if (folderStore.isAddingFolder) {
                inputRef.current!.focus()
            }
        }, 100);
    }, [folderStore.isAddingFolder])

    return (
        <MessageDialog
            actions={[
                {
                    name: 'Ok',
                    callback: folderStore.confirmAddFolder,
                    color: 'primary',
                    title: 'Confirms the folder creation',
                },
                {
                    name: 'Cancel',
                    callback: folderStore.closeAddFolder,
                    color: 'primary',
                    title: 'Confirms the folder creation'
                },
            ]}
            maxWidth='md'
            open={folderStore.isAddingFolder}
            onClose={folderStore.closeAddFolder}
        >
            <InputProps stateObject={folderStore} propertyName='newFolderName' errorHandler={folderStore.errorHandler}>
                <TextField
                    inputProps={{ ref: inputRef }}
                    label='Folder name'
                    fullWidth
                    onKeyUp={folderStore.onFolderEnterPress}
                />
            </InputProps>

        </MessageDialog>
    )
})