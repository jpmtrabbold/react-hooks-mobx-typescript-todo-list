import useStore, { useFormHandler } from "mobx-store-utils"
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Todo from 'entities/Todo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { RootStoreContext } from 'features/RootStore'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import { focusWithStartingCaret } from 'components/util/util'
import { TodosStoreContext } from '../TodosStore'

export const NewTodo = observer(() => {
    const rootStore = useContext(RootStoreContext)
    const todosStore = useContext(TodosStoreContext)

    const store = useStore(() => ({
        description: "",
        add: () => {
            todosStore.addTodoToCurrent(new Todo(store.description))
            store.description = ""
        },
        get canAdd() {
            return store.description.length > 0
        },
        keyPressAdd: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (e.key === 'Enter') {
                store.canAdd && store.add()
            } else if (e.key === 'ArrowDown') {
                if (todosStore.notDoneTodosOnCurrentList.length > 0) {
                    focusWithStartingCaret(todosStore.notDoneTodosOnCurrentList[0].inputRef.current)
                } else if (todosStore.doneTodosOnCurrentList.length > 0) {
                    focusWithStartingCaret(todosStore.doneTodosOnCurrentList[0].inputRef.current)
                }
            }
        }
    }))

    const handler = useFormHandler({ store, propertyName: 'description' })

    const input = (
        <handler.InputWrapper>
            <InputBase
                inputProps={{ ref: rootStore.newTodoInputRef }}
                placeholder="Add new..."
                onKeyUp={store.keyPressAdd}
                fullWidth
                endAdornment={(store.canAdd && (
                    <Button size='small' color='primary' onClick={store.add}>
                        Add
                    </Button>
                )) || undefined}
            />
        </handler.InputWrapper>
    )

    return <>
        <ListItem>
            <ListItemText>
                {input}
            </ListItemText>
        </ListItem>
    </>
})