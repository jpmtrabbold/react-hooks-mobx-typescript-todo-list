import useStore from "mobx-store-utils"
import React from 'react'
import { observer } from 'mobx-react-lite'
import { AppBarContainerWithDrawer } from 'components/material-ui-app-bar-container/AppBarContainerWithDrawer'
import { RootStoreContext, RootStore } from './RootStore'
import { TodoListsDrawerContent } from './todo-lists-view/todo-lists/TodoListsDrawerContent'
import { TodosView } from './todos-view/TodosView'

export const Main = observer(() => {
    const store = useStore(() => new RootStore(), {}, RootStore.reactions)
    return (
        
        <RootStoreContext.Provider value={store}>
            <AppBarContainerWithDrawer
                title={'Todos' + store.titlePrefix}
                drawer={<TodoListsDrawerContent />}
                setStore={store.setAppBarStore}
            >
                {!!store.selectedTodoList && (
                    <TodosView todosContainer={store.selectedTodoList} />
                )}
            </AppBarContainerWithDrawer >
        </RootStoreContext.Provider>
    )
})