import React, { useContext } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { RootStoreContext } from 'features/RootStore'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TodosList } from './TodosList'
import { NewTodo } from './todo/NewTodo'
import Typography from '@material-ui/core/Typography'
import Todo from 'entities/Todo'
import { TodosStore, TodosStoreContext } from './TodosStore'

const useStyles = makeStyles(theme => ({
    list: {
        padding: 0
    },
    typography: {
        paddingLeft: theme.spacing(2)
    }
}))

export interface TodosViewProps {
    todos: Todo[]
}

export const TodosView = observer((props: TodosViewProps) => {
    const classes = useStyles()
    const rootStore = useContext(RootStoreContext)
    const store = useLocalStore(sp => new TodosStore(sp), props)

    if (!rootStore.selectedTodoList) {
        return null
    }

    return (
        <TodosStoreContext.Provider value={store}>
            <Paper>
                <List className={classes.list}>
                    <NewTodo />
                    <TodosList done={false} todos={store.notDoneTodosOnCurrentList} />
                </List>
            </Paper>
            {store.hasDoneTodosOnCurrentList && (<>
                <br />
                <Typography className={classes.typography} variant='h6'>Completed: </Typography>
                <br />
                <Paper>
                    <List className={classes.list}>
                        <TodosList done={true} todos={store.doneTodosOnCurrentList} />
                    </List>
                </Paper>
            </>)}
        </TodosStoreContext.Provider>
    )
})