import React, { useContext } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import Todo from 'entities/Todo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { InputProps } from 'components/input-props'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import { TodoStore, TodoStoreContext } from './TodoStore'
import { RootStoreContext } from 'features/RootStore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'
import IconButton from '@material-ui/core/IconButton'
import { TodoDetail } from './TodoDetail'
import Tooltip from '@material-ui/core/Tooltip'

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
    const store = useLocalStore(sp => new TodoStore(rootStore, sp), props)
    const classes = useStyles()

    return <TodoStoreContext.Provider value={store}>
        <ListItem>

            <InputProps stateObject={props.todo} propertyName='done'>
                <Checkbox className={classes.checkbox} />
            </InputProps>

            <ListItemText>

                <InputProps stateObject={props.todo} propertyName='description'>
                    <InputBase
                        inputProps={{ ref: props.todo.inputRef }}
                        onKeyDown={store.onInputKeyPress}
                        disabled={props.todo.done}
                        className={props.todo.done ? classes.completed : undefined}
                    />
                </InputProps>

            </ListItemText>
            {!!props.todo.notes && (
                <Tooltip title={props.todo.notes}>
                    <CommentIcon />
                </Tooltip>
            )}
            <IconButton onClick={store.openDetail}>
                <MoreVertIcon />
            </IconButton>
        </ListItem>
        <TodoDetail readOnly={props.todo.done}/>
    </TodoStoreContext.Provider>
})