import axios from 'axios';

const URL = 'http://localhost:8000';

export const createPost = async (post)=>{
    try{
      return await axios.post(`${URL}/create`,post) 
    }catch (error) {
        console.log('Error while calling create post API ',error);
    }
}

export const getAllPosts = async () => {
  try {
      let response = await axios.get(`${URL}/posts`);
      return response.data;
  } catch (error) {
      console.log('Error while calling getPosts API ', error)
  }
}
export const getPost = async (id) => {
  try {
      let response = await axios.get(`${URL}/post/${id}`);
      return response.data;
  } catch (error) {
      console.log('Error while calling getPost API ', error);
  }
}


export const updatePost = async (id, post) => {
  try {
      let response= await axios.put(`${URL}/update/${id}`, post);
      return response.data;
  } catch(error) {
      console.log('Error while calling updatePost API ', error)
  }
}

export const deletePost = async (id,post) => {
  try {
       await axios.delete(`${URL}/details/${id}`, post  );
  } catch(error) {
      console.log('Error while calling deletePost API ', error)
  }
}