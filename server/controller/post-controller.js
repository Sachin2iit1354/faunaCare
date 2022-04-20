

import Post from '../schema/post-schema.js';

export const createPost = async (request, response) => {
    console.log(request.body);

    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('blog saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getAllPosts = async (request, response) => {
    try {
        let categories = request.query.categories;
        let severities = request.query.severities;
        console.log(request.query.categories);
        console.log(request.query.severities);
        let posts;

        if (categories && severities) {
            if(categories == 'All Categories') {
                if (severities == 'All') {
                    posts = await Post.find({});
                }
                else if (severities == 'Most Severe') {
                    posts = await Post.find({ severity: { $gt: 7 } });
                }
                else if (severities == 'Moderately Severe') {
                    posts = await Post.find({ severity: { $gt: 4, $lt: 8 } });
                }
                else {
                    posts = await Post.find({ severity: { $lt: 5 } });
                }
            }
            else {
                if(severities == 'All') {
                    posts = await Post.find({ categories: categories });
                }
                else if (severities == 'Most Severe') {
                    posts = await Post.find({ categories: categories ,  severity: { $gt: 7 } });
                    console.log(222222)

                }
                else if (severities == 'Moderately Severe') {
                    posts = await Post.find({ categories: categories , severity: { $gt: 4, $lt: 8 } });
                }
                else {
                    posts = await Post.find({ categories: categories , severity: { $lt: 5 } });
                }
            }
        }
        else if (categories) {
            if (categories != 'All Categories') {
                posts = await Post.find({ categories: categories });
            }
            else posts = await Post.find({});
        }
        else if (severities) {
            if (severities == 'All') {
                posts = await Post.find({});
            }
            else if (severities == 'Most Severe') {
                posts = await Post.find({ severity: { $gt: 7 } });
            }
            else if (severities == 'Moderately Severe') {
                posts = await Post.find({ severity: { $gt: 4, $lt: 8 } });
            }
            else {
                posts = await Post.find({ severity: { $lt: 5 } });
            }
        }
        else {
            posts = await Post.find({});
        }

        
        response.status(200).json(posts);
    } catch (error) {
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


export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        console.log(post)
        await post.delete()

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}