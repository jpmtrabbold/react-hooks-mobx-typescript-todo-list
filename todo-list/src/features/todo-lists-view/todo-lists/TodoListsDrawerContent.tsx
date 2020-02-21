import React, { useContext } from 'react'
import { observer } from "mobx-react-lite"
import { RootStoreContext } from "../../RootStore"
import TodoListFolder from "entities/TodoListFolder"
import { TodoListFolderRow } from './rows/TodoListFolderRow'
import { TodoListRow } from './rows/TodoListRow'
import List from '@material-ui/core/List'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import Fab from '@material-ui/core/Fab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tooltip from '@material-ui/core/Tooltip'
import { FolderListDialog } from '../folder-list-dialog/FolderListDialog'

const useStyles = makeStyles((theme) => ({
    fabList: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabFolder: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(11),
    },
}),
);
export const TodoListsDrawerContent = observer(() => {
    const classes = useStyles()
    const store = useContext(RootStoreContext)
    const { folderStore } = store

    return <>
        <List>
            {store.todoListsAndFolders.map((listOrFolder, index) => {
                if (listOrFolder instanceof TodoListFolder) {
                    return <TodoListFolderRow key={index} listFolder={listOrFolder} />
                } else {
                    return <TodoListRow key={index} list={listOrFolder} />
                }
            })}
        </List>

        <Tooltip title='Add Folder'>
            <Fab color="primary" className={classes.fabFolder} onClick={folderStore.addFolder}>
                <CreateNewFolderIcon />
            </Fab>
        </Tooltip>
        <Tooltip title='Add List'>
            <Fab color="primary" className={classes.fabList} onClick={folderStore.addList}>
                <PlaylistAddIcon />
            </Fab>
        </Tooltip>
        
        <FolderListDialog />
    </>
})