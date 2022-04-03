import { React, useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  makeStyles,
  FormControl,
  InputBase,
  TextareaAutosize,
} from "@material-ui/core";

import { AddCircle } from "@material-ui/icons";
import { createPost } from "../../service/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import SendIcon from "@mui/icons-material/Send";
import { AddCircle as Add, CallEnd } from "@material-ui/icons";
import { Slider } from "@material-ui/core";
import { uploadFile } from "../../service/api";
import { fontSize } from "@mui/system";
//import { LoginContext } from '../../context/ContextProvider';

const useStyle = makeStyles((theme) => ({
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  },
  icon: {
    marginRight: "5px",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    height: "60vh",
  },
  form: {
      color: "#333C83",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginTop:'30px',
    marginBottom:'35px',
  },

  severity: {
    display: "flex",
    fontSize: "24px",
    color: "#333C83",
    marginTop: "15px",
    marginBottom: "15px",
    //    textAlign:'center',
  },
  slider: {
    marginLeft: "45px",
    width: "40%",
    alignItems: "center",
  },
  textfield: {
    flex: "1",
    margin: "0 30px",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    width: "100%",
   
    border: "none",
    "&:focus-visible": {
      outline: "none",
    },
  },
}));

const initialValues = {
  title: "blog",
  description: "simple blogs",
  picture: "",
  username: "Link",
  categories: "All",
  createdDate: new Date(),
};

const CreateView = () => {
  const classes = useStyle();
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const navigate = useNavigate();
  const [post, setPost] = useState(initialValues);

  const savePost = async () => {
    await createPost(post);
    // history.push('/');
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box className={classes.container}>
        <img src={url} alt="banner" className={classes.image} />
        <FormControl className={classes.form}>
          <DriveFolderUploadIcon fontSize="large" color="info" />
          <InputBase
            onChange={(e) => handleChange(e)}
            name="title"
            placeholder="Title"
            className={classes.textfield}
          />
          <Button
            onClick={() => savePost()}
            variant="contained"
            color="primary"
          >
            <SendIcon className={classes.icon}></SendIcon>Post
          </Button>
        </FormControl>

        <div>
          <FormControl className={classes.form}>
          <h5>Category:</h5>
            <InputBase
              onChange={(e) => handleChange(e)}
              name="title"
              placeholder="Animal"
              className={classes.textfield}
             
            />
          </FormControl>
        </div>
        <div className={classes.severity}>
          <h5>Severity:</h5>
          <Slider
            className={classes.slider}
            aria-label="Always visible"
            defaultValue={70}
            // getAriaValueText={valuetext}
            step={10}
            //marks={marks}
            valueLabelDisplay="on"
          />
        </div>
        <div>
          <FormControl className={classes.form}>
          <h5>Location:</h5>
            <InputBase
              onChange={(e) => handleChange(e)}
              name="title"
              placeholder="Link"
              className={classes.textfield}
             
            />
          </FormControl>
        </div>

        <TextareaAutosize
          minRows={5}
          placeholder="Enter short description about the injury... ( optional )"
          className={classes.textarea}
          onChange={(e) => handleChange(e)}
          name="description"
        />
      </Box>
    </>
  );
};
export default CreateView;
