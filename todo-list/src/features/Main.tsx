import React from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { AppBarContainerWithDrawer } from 'components/material-ui-app-bar-container/AppBarContainerWithDrawer'
import { RootStoreContext, RootStore } from './RootStore'
import { TodoListsDrawerContent } from './todo-lists-view/todo-lists/TodoListsDrawerContent'
import { TodosView } from './todos-view/TodosView'

export const Main = observer(() => {
    const store = useLocalStore(() => new RootStore())
    return (
        <RootStoreContext.Provider value={store}>
            <AppBarContainerWithDrawer
                title={'Todos' + store.titlePrefix}
                drawer={<TodoListsDrawerContent />}
                setStore={store.setAppBarStore}
            >
                <TodosView />
            </AppBarContainerWithDrawer >
        </RootStoreContext.Provider>
    )
})