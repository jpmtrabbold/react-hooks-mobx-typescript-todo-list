import React from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { AppBarContainerWithDrawer } from 'components/material-ui-app-bar-container/AppBarContainerWithDrawer'
import { TodoListStoreContext, TodoListsStore } from './todo-lists-view/TodoListsStore'
import { TodoListsDrawer } from './todo-lists-view/todo-lists-body/TodoListsDrawer'
import { TodosView } from './todos-view/TodosView'

export const Main = observer(() => {
    const store = useLocalStore(() => new TodoListsStore())
    return (
        <TodoListStoreContext.Provider value={store}>
            <AppBarContainerWithDrawer
                title={'Todos' + store.titlePrefix}
                drawer={<TodoListsDrawer />}
            >
                <TodosView />
            </AppBarContainerWithDrawer >
        </TodoListStoreContext.Provider>
    )
})