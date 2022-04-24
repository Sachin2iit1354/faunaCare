import { React, useState, useEffect, useContext } from "react";
import { AddCircle, ContactSupportOutlined } from "@material-ui/icons";
import { createPost, uploadFile } from "../../service/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import SendIcon from "@mui/icons-material/Send";
import { AddCircle as Add, CallEnd } from "@material-ui/icons";
import { Slider } from "@material-ui/core";
import { Box, Typography, makeStyles, TextareaAutosize, Button, FormControl, InputBase, TextField, MenuItem, Select, InputLabel } from '@material-ui/core';
import { fontSize } from "@mui/system";
 
const useStyle = makeStyles((theme) => ({
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
    backgroundColor: '#C1CFC0'
  },
  icon: {
    marginRight: "5px",
  },
  fields : {
    fontSize: "30px",
    marginBottom : 30,
    width : '20%',
    color: "#333C83",
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
    display: "flex"
  },
  textfield: {
    flex: "1",
    margin: "0 30px",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    backgroundColor: '#C1CFC0',
    border: '1px solid white',
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
  severity: 7
};
 
const CreateView = () => {
  const classes = useStyle();
  // const url =
    // "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  const navigate = useNavigate();
  const location = useLocation();
 
  const [post, setPost] = useState(initialValues);
  const [category, setCategory] = useState('General');
  const [file, setFile] = useState('');
  const [imageURL, setImageURL] = useState('');
 
  const url = post.Imageurl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAS1BMVEXMzMx/f3/Q0NB5eXnIyMiVlZWEhITAwMCLi4vR0dF8fHy0tLSjo6OysrLDw8Obm5t1dXWsrKyWlpampqa6urqtra2Ojo6fn59vb28EtcIDAAAFL0lEQVR4nO2bCZejKhBGpRAVUNxQ3///pa9wSUdjejJ9Mp1ovnvOTBYpZriylAajCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnAqK0+cQ06ub8lOolM+iPKgEGqQwz0HI4ZgSSAqhnoMQ8pgOYikyTc9AZ0LGr27OjwgOnnP2CA4+ycHU8fcOfIoDits+yZpix8KnOKBc8hoojBT+JuhDHJDilXRCdtuoz3DAvUBckOkm7DMcxFcKxE3YRzig1lw7kOnm8Ec46FcOzGZG+AwHiVg5yOHAtKd3cJsNklrPB8XZHZBXWeNWR6hbzwebBp/OgR6k4XRwkw2uFGzvGp3NwZIQrhMh8tcJwk3MyRxkS683awmdnA8Y4U6dK5NLvga+WbWV0p4vmow05W1NZ3JAqVjNfWsJlHZtW+zdRj+RA7IrA0IkmwbfuYVyIgdUy7UCYZLHWnYaB6vL47+TcBYH1NwqYAnZIzWdxUFvdhTcl0BaX/k7gwOKk30FLKHfWwicMrxILkfO4IDXxPvsSOAFJNxeTZa18wQOyN/rBJOEZptJLbOnsbPDwzvgNPg7BVsJFH9NHXK6kXB4B3tr4obrX9bXuaRsxu8O7oDKPyrgpuZ6DtomUibjXPLYDvS9NfGehJsswghPx3YQ3V0TtxJaHZbEbKe4qQ+9/yB5VAFLqPW0JO51kiM7+BtMfXfyZDOf4UDsd4KZD3HwLXAAB3AAB3AAB3AAB3AAB3AABydzQA/fO3gAc8znWG5/Y/05sj6mg4iKLHkOWXFQBWE/wbtVBAAAAIBfJXZ/WTL90yWAc9eVLsXTO6XfACrkoyXtWFJX9vvMh8pG55eNOlT58dX999P/4b+HrOC/wlbTaN5tOu86Hb/5+jiXZAfS0uXL6XV6e/kYx5QrmmrgKzA/vrpqrvMNCS2jNm1VR7Vqw+/og2o8t9Kq0uVhR874MVo58NbzUf7QqRDTpuFKy8+hZG1wQL5Ug2MHduC6Rwf8L5S3T8O+ntAyLZK2ln1ZiJxc1fq88tSZoksq7tiZLcR49fflQOdCFT27U5m1idJlOOtVuoSWpc6VLmTnleS6TWuTgeuNqO89V/t+EkYHSa5102tdZ9rzW53UJCxRUUWpIa2dXEpGs4NEUyxdVMZaF0KnkrtLEkKJQ/UwOqgLrSOZajNocjJ2FXnBVac3T3q8nqkfcIObnKjOeMAWrTJ1HG4A8bmrk6EsyyqNVmMhDzvSTBppXw8J+0gKnbUcakPo5IC06/I+OAi9X3h2kE91PbwO/RobB3xO+9wndVwtDmxRFHZc37wZA6QfHcQmpV6UXSs05T2Xpzl07gedbFo7O6DJQc91Wfva9u6xdtBrxV2XDI+FMLlV3O4wl9dj0bgKU7zn1k4OXFpx528FT3iy5R40horFgfA8iCp2UBOPmzAWeNRc6noryJrJgRrGfjAkLlWy5SmtKASP86x3rk+mhaGRrW1lSTTwJBhLngSLuDMibMKrCv52Dp3mxKyMfSa9Nsa7rBnnRNG4NNvb5/xqfMOTv+f1seMTP1BUiswXOWnflD6s6Tzgh7koO0oyXiOoC/tQlSPLx2LlwkIajs+hdU1FS04J5XKrG9snOXcVLhFzXfnrWvoNtOQ3y58x01GO53BJ6wd16JI/zXFfidTlcEigloqmt7QUv/vQz3tCTdLV5qh3hZ8EFcPwjjndr3KobgsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCv8T8P0EKx6h83/QAAAABJRU5ErkJggg==';
 
  useEffect(() => {
    const getImage = async () => {
        if(file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
           
            const image = await uploadFile(data);
            post.picture = image.data;
            setImageURL(image.data);
        }
    }
    getImage();
    // post.categories = location.search?.split('=')[1] || 'All'
   
}, [file])
 
  const [coordinates, setCoordinates] = useState({
    latitude : "",
    longitude : "",
  })
 
 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
        setCoordinates({
        longitude : position.coords.longitude,
        latitude : position.coords.latitude
      });
      const locLink = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`;
      setPost({ ...post, ["location"]: locLink });
    })
  },[])
 
 
  const locationLink = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
 
 
 
 
  console.log(coordinates)
 
 
 
 
  console.log(locationLink)
 
  // console.log(locationLink)
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
        <label htmlFor="fileInput">
                <DriveFolderUploadIcon fontSize="large" color="info" />
        </label>
        <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            className={classes.circle}
            onChange={(e) => setFile(e.target.files[0])}
        />
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
            style = {{ background: '#1A374D'}}
          >
            <SendIcon className={classes.icon}></SendIcon>Post
          </Button>
        </FormControl>
 
 
     
 
        <FormControl className={classes.fields}>
                <InputLabel id="demo-simple-select-label" style={{fontWeight:'600', fontSize: "22px", color: "#333C83"}} >CATEGORY</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {category}
                        name = "categories"
                        onChange = {handleMenu}
                      >
                    <MenuItem   value = {'Dog'}>Dog</MenuItem>
                    <MenuItem   value = {'Cow'}>Cow</MenuItem>
                    <MenuItem   value = {'Cat'} >Cat</MenuItem>
                    <MenuItem   value = {'Bird'}>Bird</MenuItem>
                    <MenuItem   value = {'Horse'}>Horse</MenuItem>
                    <MenuItem   value = {'Others'}>Others</MenuItem>
 
                    </Select>
            </FormControl>
       
        <div className={classes.severity}>
          <h5>SEVERITY:</h5>
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
        <Typography style = {{marginLeft: '50px', color: 'red'}}>{severityStatus}</Typography>
 
        </div>
       
        <div>
          <FormControl className={classes.form}>
            <h5>LOCATION URL:</h5>
            <InputBase
              // onChange={(e) => handleChange(e)}
              name="location"
              placeholder="Link"
              className={classes.textfield}
              value = {locationLink}
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
 

