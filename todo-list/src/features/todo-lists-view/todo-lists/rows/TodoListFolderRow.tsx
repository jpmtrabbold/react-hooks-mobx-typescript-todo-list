import React, { useContext } from 'react'
import { observer, useLocalStore } from "mobx-react-lite"
import TodoListFolder from "entities/TodoListFolder"
import FolderIcon from "@material-ui/icons/Folder"
import { TodoListRow } from './TodoListRow'
import List from '@material-ui/core/List'
import { CollapsibleListItem } from 'components/material-ui-list-items/CollapsibleListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { RootStoreContext } from 'features/RootStore'
import { MoreButton } from 'components/material-ui-more-button'
import { MoreButtonAction } from 'components/material-ui-more-button/MoreButton'

interface TodoListFolderRowProps {
    listFolder: TodoListFolder
}

const useStyles = makeStyles((theme) => ({
    add: {
        margin: theme.spacing(-1, 0, -1, 2),
    }
}))

export const TodoListFolderRow = observer((props: TodoListFolderRowProps) => {
    const rootStore = useContext(RootStoreContext)

    const store = useLocalStore(sp => ({
        get actions() {
            return [
                {
                    title: "Add List",
                    description: 'Creates a new list in this folder',
                    callback: () => rootStore.folderStore.addListToFolder(sp.listFolder)
                },
                {
                    title: "Delete Folder",
                    callback: () => rootStore.deleteFolder(sp.listFolder)
                },
                {
                    title: "Rename Folder",
                    callback: () => rootStore.folderStore.renameFolder(sp.listFolder)
                },
            ] as MoreButtonAction[]
        },
    }), props)

    const classes = useStyles()
    
    return <>
        <CollapsibleListItem
            button={<MoreButton className={classes.add} actions={store.actions} />}
            icon={<FolderIcon />}
            label={props.listFolder.name}
            setStore={props.listFolder.setCollapsibleStore}
        >
            <List disablePadding>
                {props.listFolder.lists.map((list, index) => (
                    <TodoListRow key={index} nestingLevel={1} list={list} folder={props.listFolder} />
                ))}
            </List>
        </CollapsibleListItem>
    </>
})