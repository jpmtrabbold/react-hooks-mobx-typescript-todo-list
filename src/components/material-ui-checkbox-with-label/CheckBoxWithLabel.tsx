import React from "react"
import { observer } from "mobx-react-lite"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

interface CheckBoxWithLabelProps {
    label: string
    onChange?: any
    value?: any
    checked?: boolean
    lookups?: { id: number, name?: string }[]
    disabled?: boolean
    fullWidth?: boolean
    required?: boolean
    error?: boolean
    helperText?: string
    autoFocus?: boolean
    title?: string
}

export const CheckBoxWithLabel = observer((props: CheckBoxWithLabelProps) => {
    return (
        <>
         {/* <FormControl fullWidth={props.fullWidth} error={props.error} > */}
            <FormControlLabel label={props.label} control={
                <Checkbox
                    inputProps={{
                        'aria-label': props.label,
                        'title': props.title,
                    }}
                    required={props.required}
                    onChange={props.onChange}
                    checked={props.checked}
                    value={props.checked}
                    disabled={props.disabled}
                    autoFocus={props.autoFocus}
                />
            } />

            {(props.helperText ? <FormHelperText error={props.error}>{props.helperText}</FormHelperText> : null)}
         {/* </FormControl> */}
        </>
    )
})