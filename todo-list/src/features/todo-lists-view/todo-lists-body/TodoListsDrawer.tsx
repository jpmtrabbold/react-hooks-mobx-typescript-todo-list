import React, { useContext } from 'react'
import { observer } from "mobx-react-lite"
import { TodoListStoreContext } from "../TodoListsStore"
import TodoListFolder from "entities/TodoListFolder"
import { TodoListFolderRow } from './TodoListFolderRow'
import { TodoListRow } from './TodoListRow'
import List from '@material-ui/core/List'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tooltip from '@material-ui/core/Tooltip'
import { AddFolderDialog } from './AddFolderDialog'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}),
);
export const TodoListsDrawer = observer(() => {
    const classes = useStyles()
    const store = useContext(TodoListStoreContext)
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
            <Fab color="primary" className={classes.fab} onClick={folderStore.addFolder}>
                <AddIcon />
            </Fab>
        </Tooltip>
        <AddFolderDialog />
    </>
})