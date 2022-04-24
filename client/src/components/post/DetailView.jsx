import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { getPost, deletePost } from "../../service/api.js";
import { useParams } from "react-router-dom";
const useStyle = makeStyles((theme) => ({
 
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
    backgroundColor : '#C1CFC0'
  },
  image: {
    width: "100%",
    height: "70vh",
    objectFit: "cover",
  },
  icons: {
    float: "right",
  },
  icon: {
    margin: 5,
    padding: 5,
    height: "35px",
    width: "35px",
    border: "1px solid #878787",
    borderRadius: 10,
  },
  heading: {
    fontSize: 38,
    fontWeight: 600,
    textAlign: "center",
    margin: "50px 0 10px 0",
  },
  subheading: {
    color: "#161E54",
    display: "flex",
    margin: "20px 0",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));
 
const DetailView = ({ match }) => {
  const classes = useStyle();
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    const Navigate =   useNavigate();  
    const [post, setPost] = useState({});
  const { id } = useParams();
  let data;
  useEffect(() => {
    const fetchData = async () => {
      data = await getPost(id);
      setPost(data);
    };
    fetchData();
  }, [post]);
 
  const deleteRecord = async () => {    
    console.log(id)
    await deletePost(id);
    Navigate('/')
}
 
  return (
    <Box className={classes.container}>
      <img src={post.picture || url} alt="banner" className={classes.image} />
      <Box className={classes.icons}>
        {/* <Link to={`/update/${post._id}`}>
          <Edit className={classes.icon} color="primary" />
        </Link> */}
        <Delete onClick={() => deleteRecord()} className={classes.icon} color = 'error'/>  
      </Box>
      <Typography className={classes.heading}>{post.title}</Typography>
      <Box className={classes.subheading}>
        <div className={classes.location}>
          <Typography style={{ marginBottom: '10px',fontWeight:'600'  }}>
            Category :{" "}
            <span style={{ fontWeight:'400' }}>{post.categories}</span>
          </Typography>
 
          {/* <Typography style={{ marginBottom: '10px',fontWeight:'600' }}>
            Location : <span style={{ fontWeight:'400' }} ><a target= '_blank'>{post.location}</a></span>
          </Typography> */}
         
          <Typography style={{ marginBottom: '10px',fontWeight:'600' }}>
            Location : <span style={{ fontWeight:'400' }} ><a target= '_blank'  href={post.location}>{post.location}</a></span>
          </Typography>
          {/* <a href={post.location}>Visit W3Schools.com!</a> */}
          <Typography style={{ marginBottom: '10px',fontWeight:'600' }}>
            Severity : <span style={{ fontWeight:'400' }} >{post.severity}</span>
          </Typography>
        </div>
 
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Box>
 
      <Typography>
           {post.description}
      </Typography>
    </Box>
  );
};
export default DetailView;
