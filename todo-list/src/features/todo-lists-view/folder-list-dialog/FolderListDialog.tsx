import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../RootStore'
import { MessageDialog } from 'components/material-ui-modals'
import { InputProps } from 'input-props'
import { TextField } from '@material-ui/core'

export const FolderListDialog = observer(() => {
    const store = useContext(RootStoreContext)
    const { folderStore } = store
   
    return (
        <MessageDialog
            actions={[
                {
                    name: 'Ok',
                    callback: folderStore.confirmAction,
                    color: 'primary',
                    title: `Confirms the ${folderStore.entityType === 'list' ? 'list' : 'folder'} creation`,
                },
                {
                    name: 'Cancel',
                    callback: folderStore.closeAddFolderList,
                    color: 'primary',
                },
            ]}
            maxWidth='md'
            open={folderStore.showNameEditor}
            onClose={folderStore.closeAddFolderList}
        >
            <InputProps stateObject={folderStore} propertyName='folderOrListName' errorHandler={folderStore.errorHandler}>
                <TextField
                    inputProps={{ ref: folderStore.inputRef }}
                    label={`${folderStore.entityType === 'list' ? 'List' : 'Folder'} name`}
                    fullWidth
                    onKeyUp={folderStore.onFolderEnterPress}
                />
            </InputProps>

        </MessageDialog>
    )
})