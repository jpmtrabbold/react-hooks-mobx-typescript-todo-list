import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from 'features/RootStore'
import { TodoRow } from './todo/TodoRow'
import Divider from '@material-ui/core/Divider'
import Todo from 'entities/Todo'

interface TodosListProps {
    done: boolean
    todos: Todo[]
}
export const TodosList = observer((props: TodosListProps) => {
    const rootStore = useContext(RootStoreContext)

    if (!rootStore.selectedTodoList) {
        return null
    }

    return (<>
        {props.todos.map((t, index) => (
            <React.Fragment key={t.id}>
                {(!props.done || index > 0) && <Divider />}
                <TodoRow todo={t} />
            </React.Fragment>
        ))}
    </>)
})