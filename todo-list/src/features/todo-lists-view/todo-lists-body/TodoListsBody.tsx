import React, { useContext } from 'react'
import { observer } from "mobx-react-lite"
import { TodoListStoreContext } from "../TodoListStore"
import TodoListGroup from "entities/TodoListGroup"
import { TodoListGroupRow } from './TodoListGroupRow'
import { TodoListRow } from './TodoListRow'

export const TodoListsBody = observer(() => {
    const store = useContext(TodoListStoreContext)

    return <>
        {store.todoListsAndGroups.map(listOrGroup => {
            if (listOrGroup instanceof TodoListGroup) {
                return (
                    <TodoListGroupRow listGroup={listOrGroup} />
                )
            } else {
                return (
                    <TodoListRow list={listOrGroup} />
                )
            }
        })}
    </>
})