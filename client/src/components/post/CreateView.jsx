import { React, useState, useEffect, useContext } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   makeStyles,
//   FormControl,
//   InputBase,
//   TextareaAutosize,
// } from "@material-ui/core";

import { AddCircle } from "@material-ui/icons";
import { createPost } from "../../service/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import SendIcon from "@mui/icons-material/Send";
import { AddCircle as Add, CallEnd } from "@material-ui/icons";
import { Slider } from "@material-ui/core";
import { Box, Typography, makeStyles, TextareaAutosize, Button, FormControl, InputBase, TextField, MenuItem, Select, InputLabel } from '@material-ui/core';
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
    marginTop: "30px",
    marginBottom: "35px",
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
  title: "Save Animal",
  description: "",
  picture: "",
  username: "Link",
  categories: "Others",
  createdDate: new Date(),
  location: "",
  severity: 7,
};

const CreateView = () => {
  const classes = useStyle();
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const navigate = useNavigate();
  const [post, setPost] = useState(initialValues);
  const [category, setCategory] = useState('General');

  const savePost = async () => {
    await createPost(post);
    // history.push('/');
    navigate("/");
  };
  const handleMenu = (e) => {
    // setPost({ ...post, [e.target.getAttribute("name")]: e.target.innerText });
     setCategory(e.target.value);
    // console.log(e.target.name);
    setPost({ ...post, [e.target.name]: e.target.value });
 }
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const [sliderValue, setSliderValue] = useState(0);
  const [severityStatus, setSeverityStatus] = useState("Less severe");

  const handleSliderChange = (e, newValue) => {
    setSliderValue(newValue);
    setPost({ ...post, ["severity"]: sliderValue });
    {(sliderValue <= 4) && setSeverityStatus("Less Severe")}
        {(sliderValue > 4 && sliderValue <= 7) && setSeverityStatus("Moderately Severe")}
        {(sliderValue > 7) && setSeverityStatus("Very Severe")}
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
        <FormControl >
                <InputLabel id="demo-simple-select-label">CATEGORY</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {category}
                        name = "categories"
                        onChange = {handleMenu}
                      >
                    <MenuItem   value = {'Dogs'}>Dogs</MenuItem>
                    <MenuItem   value = {'Cows'}>Cows</MenuItem>
                    <MenuItem   value = {'cat'} >cat</MenuItem>
                    <MenuItem   value = {'Injuries and accidents'}>Birds</MenuItem>
                    <MenuItem   value = {'Horse'}>Horse</MenuItem>
                    <MenuItem   value = {'Others'}>Others</MenuItem>

                    </Select>
            </FormControl>
        {/* <div>
          <FormControl className={classes.form}>
            <h5>Category:</h5>
            <InputBase
              onChange={(e) => handleChange(e)}
              name="categories"
              placeholder="Animal"
              className={classes.textfield}
            />
          </FormControl>
        </div> */}
        <div className={classes.severity}>
          <h5>Severity:</h5>
          <Slider
            className={classes.slider}
            min={0}
            max={10}
            name='severity'
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>
        
        <Typography>{severityStatus}</Typography>
        <div>
          <FormControl className={classes.form}>
            <h5>Location:</h5>
            <InputBase
              onChange={(e) => handleChange(e)}
              name="location"
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
