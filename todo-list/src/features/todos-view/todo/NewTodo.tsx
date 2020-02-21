import React, { useContext } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import Todo from 'entities/Todo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { RootStoreContext } from 'features/RootStore'
import InputBase from '@material-ui/core/InputBase'
import { InputProps } from 'components/input-props'
import Button from '@material-ui/core/Button'
import { focusWithStartingCaret } from 'components/util/util'

export const NewTodo = observer(() => {
    const rootStore = useContext(RootStoreContext)

    const store = useLocalStore(() => ({
        description: "",
        add: () => {
            rootStore.addTodoToCurrentList(new Todo(store.description))
            store.description = ""
        },
        get canAdd() {
            return store.description.length > 0
        },
        keyPressAdd: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (e.key === 'Enter') {
                store.canAdd && store.add()
            } else if (e.key === 'ArrowDown') {
                if (rootStore.notDoneTodosOnCurrentList.length > 0) {
                    focusWithStartingCaret(rootStore.notDoneTodosOnCurrentList[0].inputRef.current)
                } else if (rootStore.doneTodosOnCurrentList.length > 0) {
                    focusWithStartingCaret(rootStore.doneTodosOnCurrentList[0].inputRef.current)
                }
            }
        }
    }))

    const input = (
        <InputProps stateObject={store} propertyName='description'>
            <InputBase
                inputProps={{ ref: rootStore.newTodoInputRef }}
                placeholder="Add new to-do..."
                onKeyUp={store.keyPressAdd}
                fullWidth
                endAdornment={(store.canAdd && (
                    <Button size='small' color='primary' onClick={store.add}>
                        Add
                    </Button>
                )) || undefined}
            />
        </InputProps>
    )

    return <>
        <ListItem>
            <ListItemText>
                {input}
            </ListItemText>
        </ListItem>
    </>
})