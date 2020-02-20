import React from 'react'
import { observer } from 'mobx-react-lite'
import Todo from 'entities/Todo'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { InputProps } from 'components/input-props'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

interface TodoRowProps {
    todo: Todo
}

const useStyles = makeStyles((theme) => ({
    checkbox: {
        margin: theme.spacing(-1, 1, -1, -1),
    }
}))

export const TodoRow = observer((props: TodoRowProps) => {
    const classes = useStyles()
    return <>
        <ListItem>
            <InputProps stateObject={props.todo} propertyName='done'>
                <Checkbox className={classes.checkbox} />
            </InputProps>
            <ListItemText>
                <InputProps stateObject={props.todo} propertyName='description'>
                    <InputBase />
                </InputProps>
            </ListItemText>
        </ListItem>
    </>
})