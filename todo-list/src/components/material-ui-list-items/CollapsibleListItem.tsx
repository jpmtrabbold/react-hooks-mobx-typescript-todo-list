import React from 'react'
import { observer, useLocalStore } from "mobx-react-lite"
import TodoListFolder from "entities/TodoListFolder"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Collapse from '@material-ui/core/Collapse'

interface CollapsibleListItemProps {
    initialCollapsed?: TodoListFolder
    label?: string
    icon?: React.ReactElement
    button?: React.ReactElement
}
export const CollapsibleListItem = observer((props: React.PropsWithChildren<CollapsibleListItemProps>) => {
    const localStore = useLocalStore(source => ({
        collapsed: source.initialCollapsed || false,
        toggleOpen() {
            this.collapsed = !this.collapsed
        },
    }), props)

    return <>
        <ListItem button onClick={localStore.toggleOpen}>
            {props.icon && <ListItemIcon children={props.icon} />}
            <ListItemText primary={props.label} />
            {props.button}
            {localStore.collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={localStore.collapsed}>
            {props.children}
        </Collapse>
    </>
})