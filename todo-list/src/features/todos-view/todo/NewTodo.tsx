import React, { useContext, useRef, useLayoutEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import Todo from 'entities/Todo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { TodoListStoreContext } from 'features/todo-lists-view/TodoListsStore'
import InputBase from '@material-ui/core/InputBase'
import { InputProps } from 'components/input-props'
import Button from '@material-ui/core/Button'
import useInitialMount from 'hooks/useInitialMount'

export const NewTodo = observer(() => {
    const rootStore = useContext(TodoListStoreContext)
    const inputRef = useRef<HTMLInputElement | null>(null)

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
                store.add()
            }
        }
    }))
    
    useLayoutEffect(() => {
        inputRef.current!.focus()
    }, [rootStore.selectedTodoList])

    const input = (
        <InputProps stateObject={store} propertyName='description'>
            <InputBase
                inputProps={{ ref: inputRef }}
                placeholder="Add new to-do..."
                onKeyUp={(store.canAdd && store.keyPressAdd) || undefined}
                fullWidth endAdornment={(
                    <>
                        {store.canAdd && (
                            <Button size='small' color='primary' onClick={store.add}>
                                Add
                            </Button>
                        )}
                    </>
                )}
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