import React, { useContext } from 'react'
import { observer, useLocalStore } from "mobx-react-lite"
import { RootStoreContext } from "../../../RootStore"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from '@material-ui/core/ListItemIcon'

import ListIcon from "@material-ui/icons/List"
import TodoList from 'entities/TodoList'
import { useTheme } from '@material-ui/core/styles'
import { MoreButtonAction, MoreButton } from 'components/material-ui-more-button/MoreButton'
import TodoListFolder from 'entities/TodoListFolder'

interface TodoListRowProps {
    list: TodoList
    folder?: TodoListFolder
    nestingLevel?: number
}
export const TodoListRow = observer(({ list, folder, nestingLevel = 0 }: TodoListRowProps) => {
    const rootStore = useContext(RootStoreContext)
    const theme = useTheme()

    const store = useLocalStore(source => ({
        get listItemStyle() {
            if (source.nestingLevel) {
                return { paddingLeft: theme.spacing(nestingLevel * 4) }
            }
            return undefined
        },
        get actions() {
            return [
                {
                    title: "Delete List",
                    callback: () => rootStore.deleteList(source.list, source.folder),
                },
                {
                    title: "Rename List",
                    callback: () => rootStore.folderStore.renameList(source.list),
                },
            ] as MoreButtonAction[]
        },
        onClick: () => {
            rootStore.selectTodoList(source.list)
            rootStore.appBarStore?.closeIfTemporary()
        }
    }), { list, folder, nestingLevel })

    return <>
        <ListItem
            style={store.listItemStyle}
            button onClick={store.onClick}
            selected={list === rootStore.selectedTodoList}
        >
            <ListItemIcon>
                <ListIcon />
            </ListItemIcon>
            <ListItemText primary={list.name} />
            <MoreButton actions={store.actions} variant='vertical' />
        </ListItem>
    </>
})