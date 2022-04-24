import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
 
const useStyles = makeStyles({
    container: {
        height: 350,
        margin: '10px',
        border: '1px solid #d3cede',
        borderRadius: 10,
        backgroundColor: '#F8ECD1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            padding: '0 5px 5px 5px'
        }
    },
    image: {
        height: 150,
        width: '103.5%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0',
    },
    textColor: {
        fontWeight:'500',
        color: '#00092C',
        fontSize: 20
    },
    locationseverity: {
        fontWeight:'500',
        color: '#00092C',
        fontSize: 16
    },
    heading: {
        color: '#00092C',
        fontSize: 18,
        fontWeight: 600
    },
    detail: {
        color: '#00092C',
        fontSize: 14,
        wordBreak: 'break-word'
    }
})
 
const Post = ({ post }) => {
    const classes = useStyles();
    const URL = post.picture ? post.picture : 'https://thebetterindia-static.gumlet.io/wp-content/uploads/2017/06/Relax14-2.jpg';
   
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }
 
    return (
        <Box className={classes.container} hover = {true}>
            <img src={URL} alt="post" className={classes.image} />
            <Typography className={classes.textColor}>{post.categories}</Typography>
            <Typography className={classes.heading}>{addEllipsis(post.title, 20)}</Typography>
            <Typography className={classes.locationseverity}>Location : Link</Typography>
            <Typography className={classes.locationseverity}>Severity  :  {post.severity}</Typography>
            <Typography className={classes.detail}>{addEllipsis(post.description, 100)}</Typography>
           
        </Box>
    )
}
 
export default Post;
