import React from 'react'
import { observer } from 'mobx-react-lite'
import { TodoListsView } from './todo-lists-view/TodoListsView'


export const Main = observer(() => {
    return (
        <TodoListsView />
    )
})