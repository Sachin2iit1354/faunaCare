import { Box, Typography, makeStyles } from '@material-ui/core';

// const uurl = 'https://www.benq.com/2c/en-us/campaigns/screenbar-desksetup/10.jpg';

const useStyles = makeStyles({
    image: {
        background: `url(${'https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'}) center/55% repeat-x #000`,
        width: '100%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        '& :first-child' : {
            fontSize: 66,
            color: '#FFFFFF',
            lineHieght: 1
        },  
        '& :last-child' : {
            fontSize: 20,
            background: '#FFFFFF'
        }

    }
});

const Banner = () => {
    const classes = useStyles();
    return (
        <Box className = {classes.image}>
            <Typography>faunaCare</Typography>
            <Typography>All lives matter!</Typography>
        </Box>
    )
}

export default Banner;