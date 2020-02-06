import React, { useContext } from 'react'
import { observer, useLocalStore } from "mobx-react-lite"
import { TodoListStoreContext } from "../TodoListStore"
import TodoListGroup from "entities/TodoListGroup"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FolderIcon from "@material-ui/icons/Folder"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { TodoListRow } from './TodoListRow'
import Collapse from '@material-ui/core/Collapse'
import { List } from '@material-ui/core'

interface TodoListGroupRowProps {
    listGroup: TodoListGroup
}
export const TodoListGroupRow = observer((props: TodoListGroupRowProps) => {
    const store = useContext(TodoListStoreContext)

    const localStore = useLocalStore(source => ({
        toggleOpen() {
            source.listGroup.open = !source.listGroup.open
        },
    }), props)

    const { listGroup } = props

    return <>
        <ListItem button onClick={localStore.toggleOpen}>
            <ListItemIcon>
                <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={listGroup.name} />
            {listGroup.open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={listGroup.open}>
            <List disablePadding>
                {listGroup.lists.map(list => (
                    <TodoListRow nestingLevel={1} list={list} />
                ))}
            </List>
        </Collapse>
    </>
})