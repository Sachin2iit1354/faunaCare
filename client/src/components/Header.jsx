import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
 
const useStyles = makeStyles({
    components: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        backgroundColor: '#FFFBE9',
        justifyContent: 'center',      
        '& > *': {
            padding: 20
        },  
        color: '#733C3C'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})
 
const Header = () => {
    const classes = useStyles();
    return (
        <AppBar className = {classes.components}>
            <Toolbar className = {classes.container}>
                <Link className = {classes.link} to = {'/'}> <Typography>HOME</Typography> </Link>
                <Typography>ABOUT</Typography>
                <Typography>CONTACT</Typography>
                <Typography>LOGIN</Typography>
            </Toolbar>
        </AppBar>
    )
}
 
export default Header;
