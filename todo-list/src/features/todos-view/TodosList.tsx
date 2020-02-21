import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from 'features/RootStore'
import { TodoRow } from './todo/TodoRow'
import Divider from '@material-ui/core/Divider'

interface TodosListProps {
    done: boolean
}
export const TodosList = observer((props: TodosListProps) => {
    const rootStore = useContext(RootStoreContext)

    if (!rootStore.selectedTodoList) {
        return null
    }

    const list = (props.done ? rootStore.doneTodosOnCurrentList : rootStore.notDoneTodosOnCurrentList)
    
    return (<>
        {list.map((t, index) => (
            <React.Fragment key={index}>
                {(!props.done || index > 0) && <Divider />}
                <TodoRow todo={t} />
            </React.Fragment>
        ))}
    </>)
})