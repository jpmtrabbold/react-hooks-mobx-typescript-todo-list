import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { TodoListStoreContext } from 'features/todo-lists-view/TodoListsStore'
import { TodoRow } from './todo/TodoRow'
import Divider from '@material-ui/core/Divider'

interface TodosListProps {
    done: boolean
}
export const TodosList = observer((props: TodosListProps) => {
    const rootStore = useContext(TodoListStoreContext)

    if (!rootStore.selectedTodoList) {
        return null
    }

    return (<>
        {rootStore.selectedTodoList.todos.filter(t => t.done === props.done).map((t, index) => (
            <React.Fragment key={index}>
                <Divider />
                <TodoRow todo={t} />
            </React.Fragment>
        ))}
    </>)
})