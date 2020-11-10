import useStore, { useFormHandler } from "mobx-store-utils"
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Todo from 'entities/Todo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import { TodoRowStore, TodoStoreContext } from './TodoRowStore'
import { RootStoreContext } from 'features/RootStore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import IconButton from '@material-ui/core/IconButton'


import { TodoDetail } from './TodoDetail'
import Tooltip from '@material-ui/core/Tooltip'
import moment from 'moment'
import { TodosStoreContext } from '../TodosStore'

export interface TodoRowProps {
    todo: Todo
}

const useStyles = makeStyles((theme) => ({
    checkbox: {
        margin: theme.spacing(-1, 1, -1, -1),
    },
    completed: {
        textDecoration: 'line-through'
    }
}))

export const TodoRow = observer((props: TodoRowProps) => {
    const rootStore = useContext(RootStoreContext)
    const todosStore = useContext(TodosStoreContext)
    const store = useStore(sp => new TodoRowStore(sp), { ...props, rootStore, todosStore })
    const classes = useStyles()
    const handler = useFormHandler(props.todo, [
        { propertyName: 'description' },
        { propertyName: 'done' },
    ])

    return <TodoStoreContext.Provider value={store}>
        <ListItem>

            <handler.done.CheckboxWrapper>
                <Checkbox className={classes.checkbox} />
            </handler.done.CheckboxWrapper>

            <ListItemText>

                <handler.description.InputWrapper>
                    <InputBase
                        inputProps={{ ref: props.todo.inputRef }}
                        onKeyDown={store.onInputKeyPress}
                        disabled={props.todo.done}
                        className={props.todo.done ? classes.completed : undefined}
                        fullWidth

                    />
                </handler.description.InputWrapper>

            </ListItemText>
            {!!props.todo.notes && (
                <Tooltip title={props.todo.notes}>
                    <IconButton>
                        <CommentIcon />

                    </IconButton>
                </Tooltip>
            )}
            {!!props.todo.dueDate && (
                <Tooltip title={moment(props.todo.dueDate).format('DD/MM/YYYY')}>
                    <IconButton>
                        <CalendarIcon />
                    </IconButton>

                </Tooltip>
            )}

            <IconButton onClick={store.openDetail}>
                <MoreVertIcon />
            </IconButton>
        </ListItem>
        <TodoDetail readOnly={props.todo.done} />
    </TodoStoreContext.Provider>
})