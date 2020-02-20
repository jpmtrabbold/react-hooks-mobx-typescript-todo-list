import React, { useEffect, useRef } from "react"
import { observer, useLocalStore } from "mobx-react-lite"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu'
import useElementSize from "hooks/useElementSize"
interface AppBarContainerWithDrawerProps {
    title?: React.ReactNode
    rightButtons?: React.ReactNode[]
    style?: React.CSSProperties
    drawer?: React.ReactNode
    initialDrawerOpen?: boolean
}

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

export const AppBarContainerWithDrawer = observer((props: React.PropsWithChildren<AppBarContainerWithDrawerProps>) => {
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles()
    const drawerRef = useRef<HTMLDivElement | null>(null)
    const drawerSize = useElementSize(drawerRef.current)

    const store = useLocalStore(source => ({
        open: true,
        setBigScreen(big: boolean) {
            this.setOpen(big)
            this.permanent = big
        },
        setOpen(open: boolean) {
            this.open = open
        },
        get drawerStyle(): React.CSSProperties {
            return {
                minWidth: 250
            }
        },
        permanent: false,
        onClose: () => {
            store.open = false
        },
        drawerToggle: () => {
            store.open = !store.open
        },
        get childrenDivStyle(): React.CSSProperties | undefined {
            if (store.permanent && store.open) {
                return { marginLeft: source.drawerSize.width }
            }
            return undefined
        }
    }), { bigScreen, ...props, drawerSize })

    useEffect(() => {
        setTimeout(() => {
            store.setOpen((props.initialDrawerOpen !== undefined ? props.initialDrawerOpen : true))
        })
    }, [props.initialDrawerOpen, store])

    useEffect(() => {
        if (bigScreen) {
            setTimeout(() => {
                store.setBigScreen(true)
            })
        } else {
            setTimeout(() => {
                store.setBigScreen(false)
            })
        }
    }, [bigScreen, store])

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
            <div style={store.drawerStyle} ref={drawerRef}>
                {store.permanent && <div className={classes.drawerOffset} />}
                {props.drawer}
            </div>
        </Drawer>
    </>)
})
