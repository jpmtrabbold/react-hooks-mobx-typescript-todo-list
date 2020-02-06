import React from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { AppBarContainer } from 'components/material-ui-app-bar-container'
import List from '@material-ui/core/List'
import { TodoListStore, TodoListStoreContext } from './TodoListStore'
import { TodoListsBody } from './todo-lists-body/TodoListsBody'

export const TodoListsView = observer(() => {
    const store = useLocalStore(() => new TodoListStore())

    return (
        <TodoListStoreContext.Provider value={store}>
            <AppBarContainer title='To-do Lists'>
                <List>
                    <TodoListsBody />
                </List>
            </AppBarContainer>
        </TodoListStoreContext.Provider>
    )
})