import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from 'features/RootStore'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TodosList } from './TodosList'
import { NewTodo } from './todo/NewTodo'
import Typography from '@material-ui/core/Typography'

interface TodosViewProps {

}

const useStyles = makeStyles(theme => ({
    list: {
        padding: 0
    },
    typography: {
        paddingLeft: theme.spacing(2)
    }
}))

export const TodosView = observer((props: TodosViewProps) => {
    const classes = useStyles()
    const rootStore = useContext(RootStoreContext)

    if (!rootStore.selectedTodoList) {
        return null
    }

    return <>
        <Paper>
            <List className={classes.list}>
                <NewTodo />
                <TodosList done={false} />
            </List>
        </Paper>
        {rootStore.hasDoneTodosOnCurrentList && (<>
            <br />
            <Typography className={classes.typography} variant='h6'>Completed: </Typography>
            <br />
            <Paper>
                <List className={classes.list}>
                    <TodosList done={true} />
                </List>
            </Paper>
        </>)}
    </>
})