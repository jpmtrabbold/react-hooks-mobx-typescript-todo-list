import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { TodoStoreContext } from './TodoRowStore'
import Slide from '@material-ui/core/Slide/Slide'
import { MessageDialog } from 'components/material-ui-modals'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { CheckBoxWithLabel } from 'components/material-ui-checkbox-with-label'
import { KeyboardDatePicker } from "@material-ui/pickers/DatePicker"
import Typography from '@material-ui/core/Typography'
import { TodosView } from '../TodosView'
import { TransitionComponentProps } from 'components/material-ui-modals/MessageDialog/MessageDialog'
import { useFormHandler } from 'mobx-store-utils'

export interface TodoDetailProps {
    readOnly?: boolean
}

const SlideUpTransition = React.forwardRef(function Transition(
    props: TransitionComponentProps,
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const nullChange = () => null

export const TodoDetail = observer((props: TodoDetailProps) => {
    const store = useContext(TodoStoreContext)

    const handler = useFormHandler(store.editableTodo!, [
        { propertyName: 'description', errorHandler: store.errorHandler },
        { propertyName: 'done', errorHandler: store.errorHandler },
        { propertyName: 'notes', errorHandler: store.errorHandler },
        { propertyName: 'dueDate', errorHandler: store.errorHandler, config: { elementValueForUndefinedOrNull: () => null } },
    ])

    return (
        <MessageDialog
            title={`Details`}
            TransitionComponent={SlideUpTransition}
            open={store.detailOpen}
            onClose={store.closeDetail}
            actions={store.actions}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <handler.description.InputWrapper>
                        <TextField
                            inputProps={{ ref: store.inputRef }}
                            label='Description'
                            fullWidth
                            disabled={props.readOnly}
                        />
                    </handler.description.InputWrapper>
                </Grid>
                <Grid item xs={6}>
                    <handler.done.CheckboxWrapper>
                        <CheckBoxWithLabel
                            label='Done?'
                            fullWidth
                            disabled={props.readOnly}
                        />
                    </handler.done.CheckboxWrapper>
                </Grid>
                <Grid item xs={6}>
                    <handler.dueDate.InputWrapper>
                        <KeyboardDatePicker
                            autoOk
                            label="Due Date"
                            fullWidth
                            value={null}
                            onChange={nullChange}
                            format="dd/MM/yyyy"
                            disabled={props.readOnly}
                        />
                    </handler.dueDate.InputWrapper>
                </Grid>
                <Grid item xs={12}>
                    <handler.notes.InputWrapper>
                        <TextField
                            multiline
                            label='Notes'
                            fullWidth
                            disabled={props.readOnly}
                        />
                    </handler.notes.InputWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        Sub-Tasks
                    </Typography>
                    <br />
                    <TodosView todosContainer={store.editableTodo!} />
                </Grid>
            </Grid>
        </MessageDialog>
    )
})