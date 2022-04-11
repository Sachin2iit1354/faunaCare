import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        // required: true
    },
    categories: {
        type: String,
        required: false   
    },
    createdDate: {
        type: Date
    },
    location:{
        type:String,
        required:true
    },
    severity:{
        type:Number,
        requrired:true
    }
});


const post = mongoose.model('post', PostSchema);

export default post;