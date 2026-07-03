import fs from "fs"
import imagekit from "../config/imageKit.js"
import Blog from "../models/Blog.js"
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";



export const addBlog = async(req, res)=>{
    try{
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        
        const imageFile = req.file;

        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing fields"})
        }

        // before uploading we need to convert into a proper format
        const fileBuffer = fs.readFileSync(imageFile.path);

        // Uploading image in imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimizing image/url
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        })

        const image = optimizedImageUrl;

        await Blog.create({title, subTitle, description, category, image ,isPublished});
        res.json({success: true, message:"Blog created successfully"});


    }catch(error){
        res.json({success: false, message:error.message});
    }
}

// getAllblogs -> get all the blogs in Db which have isPublished as true
export const getAllBlogs = async(req, res)=>{
    try{
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs})
    }catch(error){
        res.json({success: false, message: error.message})
    }
} 

// getBlogByID
export const getBlogByID = async(req, res) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message: "Blog not found"});
        }
        res.json({success: true, blog})
    }catch(error){
        res.json({success: false, message: error.message})
    }
} 

// delteBlogbyId -> you will have id in req.body
// togglePublish -> you will have id in req.body

export const delteBlogById = async(req, res)=>{
    try{
        const {id} = req.body
        await Blog.findByIdAndDelete(id);

        // delete all comments when blog is deleted
        await Comment.deleteMany({blog: id});

        res.json({success: true, message: "Blog is deleted"})
    }catch(err){
        res.json({success: false, message: err.message})
    }
} 

export const togglePublish = async(req, res)=>{
    try{
        const {id} = req.body
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "is published is toggled"})
    }catch(err){
         res.json({success: false, message: err.message})
    }
} 


export const addCommnet = async(req, res) => {
    try{
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: 'Comment added for review'})
    }catch(err){
        res.json({success: false, message: err.message})
    }
} 

export const getBlogComments = async(req, res) => {
     try{
        const {id} = req.params;
       

        const comment = await Comment.find({blog: id, isApproved: true}).sort({createdAt: -1});

        res.json({success: true, comment})
    }catch(err){
        res.json({success: false, message: err.message})
    }
} 

export const generateContent=async(req,res)=>{
    try {
        const {prompt}=req.body;
        const content=await main(prompt+ 'Generate a blog content for this topic in simple text format');
        res.json({success:true,content})
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
