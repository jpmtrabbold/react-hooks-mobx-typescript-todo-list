import React, { useContext } from 'react'
import { observer, useLocalStore } from "mobx-react-lite"
import { TodoListStoreContext } from "../TodoListStore"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from '@material-ui/core/ListItemIcon'

import ListIcon from "@material-ui/icons/List"
import TodoList from 'entities/TodoList'
import { useTheme } from '@material-ui/core/styles'

interface TodoListRowProps {
    list: TodoList
    nestingLevel?: number
}
export const TodoListRow = observer(({ list, nestingLevel = 0 }: TodoListRowProps) => {

    const store = useContext(TodoListStoreContext)
    const theme = useTheme()

    const localStore = useLocalStore(source => ({
        get listItemStyle() {
            if (source.nestingLevel) {
                return { paddingLeft: theme.spacing(nestingLevel*4) }
            } 
        }
    }), { nestingLevel })

    return <>
        <ListItem style={localStore.listItemStyle} button>
            <ListItemIcon>
                <ListIcon />
            </ListItemIcon>
            <ListItemText primary={list.name} />
        </ListItem>
    </>
})