// import post from '../schema/post-schema.js';
import Post from '../schema/post-schema.js';

export const createPost = async (request, response) =>  {
    console.log(request.body);

    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('blog saved successfully');
    } catch(error) {
        response.status(500).json(error);
    }
}

// export const getAllPosts = async (request, response) =>  {
//     try {
//         let posts = await Post.find({});
        
//         response.status(200).json(posts);
//     } catch(error) {
//         response.status(500).json(error);
//     }
// }

export const getAllPosts = async (request, response) =>  {
    try {
		let categories = request.query.categories;
		console.log(request.query.categories);
		let posts;
		if(categories){
			if(categories != 'All Categories'){
			posts = await Post.find({categories: categories});
			}
			else{
				posts = await Post.find({});
			}
		}
		else{
        posts = await Post.find({});
		}
        response.status(200).json(posts);
    } catch(error) {
        response.status(500).json(error);
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deletePost = async(req,res)=> {
    try {
       const post = await Post.findById(request.params.id);
       await post.delete()
        res.send(userToDelete);
    } catch (error) {
        res.status(400).send(error)
    }
}



export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}