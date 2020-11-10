import useStore from "mobx-store-utils"
import React from "react"
import { observer } from "mobx-react-lite"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu'
import { AppBarContainerWithDrawerStore } from "./AppBarContainerWithDrawerStore"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        minHeight: theme.spacing(7)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center'
    },
    list: {
        width: 250,
    },
    content: {
        top: 0,
        padding: theme.spacing(8, 1, 1, 1),
    },
    appbar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerOffset: {
        height: theme.spacing(7)
    },
}))


export interface AppBarContainerWithDrawerProps {
    title?: React.ReactNode
    rightButtons?: React.ReactNode[]
    style?: React.CSSProperties
    drawer?: React.ReactNode
    initialDrawerOpen?: boolean
    setStore?: (store: AppBarContainerWithDrawerStore) => any
}

export const AppBarContainerWithDrawer = observer((props: React.PropsWithChildren<AppBarContainerWithDrawerProps>) => {
    const theme = useTheme()
    const bigScreen = useMediaQuery(theme.breakpoints.up('md'));

    const classes = useStyles()
    const store = useStore(source => new AppBarContainerWithDrawerStore(source), 
        { bigScreen, ...props, initialDrawerOpen: props.initialDrawerOpen }, AppBarContainerWithDrawerStore.reactions)

    return (<>
        <div className={classes.root} style={props.style}>
            <AppBar position="fixed" className={(store.permanent ? classes.appbar : undefined)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={store.drawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography color="inherit" variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>

                    {props.rightButtons}

                </Toolbar>
            </AppBar>
            <div style={store.childrenDivStyle} className={classes.content}>
                {props.children}
            </div>
        </div>

        <Drawer
            variant={(store.permanent && store.open) ? 'persistent' : 'temporary'}
            open={store.open}
            onClose={store.onClose}>
            <div style={store.drawerStyle} ref={store.setDrawer}>
                {store.permanent && <div className={classes.drawerOffset} />}
                {props.drawer}
            </div>
        </Drawer>
    </>)
})

