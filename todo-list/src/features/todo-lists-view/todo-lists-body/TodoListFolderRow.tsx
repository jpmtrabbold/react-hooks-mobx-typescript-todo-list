import React from 'react'
import { observer } from "mobx-react-lite"
import TodoListFolder from "entities/TodoListFolder"
import FolderIcon from "@material-ui/icons/Folder"
import AddIcon from "@material-ui/icons/Add"
import { TodoListRow } from './TodoListRow'
import List from '@material-ui/core/List'
import { CollapsibleListItem } from 'components/material-ui-list-items/CollapsibleListItem'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'

interface TodoListFolderRowProps {
    listFolder: TodoListFolder
}

const useStyles = makeStyles((theme) => ({
    add: {
        margin: theme.spacing(-1, 0, -1, 2),
    }
}))

export const TodoListFolderRow = observer((props: TodoListFolderRowProps) => {
    const classes = useStyles()
    const { listFolder } = props

    return <>
        <CollapsibleListItem button={(
            <IconButton className={classes.add}>
                <AddIcon />
            </IconButton>
        )}
            icon={<FolderIcon />}
            label={listFolder.name}
        >
            <List disablePadding>
                {listFolder.lists.map((list, index) => (
                    <TodoListRow key={index} nestingLevel={1} list={list} />
                ))}
            </List>
        </CollapsibleListItem>
    </>
})