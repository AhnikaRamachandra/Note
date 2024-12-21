require("dotenv").config();
const config=require("./config.json")
const mongoose=require("mongoose")
mongoose.connect(config.connectionString)
const User=require("./models/user.model")
const Note=require("./models/note.model")
const express=require("express");
const cors=require('cors');
const app=express();
const jwt=require("jsonwebtoken");
const { authenticatetoken}=require("./utilities")
app.use(express.json());
app.use(
    cors(
        {
            origin:'*'
        }
    )
)
app.get("/",(req,res)=>{
    res.json({data:"hello"})
})
//create account
app.post("/create-account",async(req,res)=>{
    const {fullName,email,password}=req.body;
    if(!fullName){
        return res
        .status(400)
        .json({error:true,message:"fullname needed"})
    }
    if(!email){
        return res
        .status(400)
        .json({error:true,message:"email needed"})
    }
    if(!password){
        return res
        .status(400)
        .json({error:true,message:"password  needed"})
    }
    const isUser=await User.findOne({email:email});
    if(isUser){
        return res.json({
            error:true,
            message:"user already exist"
        })
    }
    const user=new User({
        fullName,
        email,
        password
    });
    await user.save();
    const accessToken=jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"36000m"
    })
    return res.json({
        error:false,
        user,
        accessToken,
        message:"registered"
    })
})
//login
app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(!email){
        return res
        .status(400)
        .json({error:true,message:"email needed"})
    }
    if(!password){
        return res
        .status(400)
        .json({error:true,message:"password  needed"})
    }
    const userInfo=await User.findOne({email:email});
    if(!userInfo){
        return res.status(400).json({
            message:"User not found"
        })
    }
    if(userInfo.email==email && userInfo.password==password){
        const user={user:userInfo};
        const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"36000m"
        })
        return res.json({
            error:false,
           
            message:"Login succesfull",
            email,
            accessToken
        })
    }
    else{
        return res.status(400).json({
            error:true,
            message:"invalid"
        })
    }
})
//get user
app.get("/get-user", authenticatetoken, async (req, res) => {
    const { user } = req.user;  // User data is already available from the token
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "User not found"
        });
    }
    return res.json({
        user: {
            fullName: user.fullName,
            email: user.email,
            _id: user._id,
            createdOn: user.createdOn,
        },
        message: ""
    });
});


//addnote
app.post("/add-note",authenticatetoken,async(req,res)=>{
const {title,content,tags,ispinned,userId,createdOn}=req.body;
const {user}=req.user;
if(!title){
    return res
    .status(400)
    .json({error:true,message:"Tilte please"})
}
if(!content){
    return res
    .status(400)
    .json({error:true,message:"content please"})
}
try {
    const note=new Note({
        title,
        content,
        tags:tags||[],
        userId:user._id
    });
    await note.save();
    return res.json({error:false,note,message:"Notes added successfully"})
} 
catch (error) {
    return res
    .status(500)
    .json({error:true,message:"server error"}) 
}
})
//edit
app.put("/edit-note/:noteId",authenticatetoken,async(req,res)=>{
const noteId=req.params.noteId;
const {title,content,tags,ispinned}=req.body;
const{user}=req.user;
if(!title&&content &&!tags){
    return res.status(400).json({error:true,message:"no changes provided"})

}
try {
   const note=await Note.findOne({_id:noteId,userId:user._id}) ;
   if(!note){
    return res.status(400).json({error:true,message:"note not found"});
   }
   if(title)note.title=title;
   if(content)note.content=content;
   if(tags)note.tags=tags;
   if(ispinned)note.ispinned=ispinned;
   await note.save();
   return res.json({
    error:false,
    note,
    message:"note updated"
   })
} catch (error) {
    return res.status(500).json({error:true,message:"server error"})  
}
})

app.get("/get-all-notes",authenticatetoken,async(req,res)=>{
const{user}=req.user;
try {
    const notes=await Note.find({
        userId:user._id
    }).sort({ispinned:-1})
    return res
    .json({error:false,notes,message:"all notes retrieved"}) 
} catch (error) {
    return res
    .status(500)
    .json({error:true,message:"server error"}) 
}
})
// delete
app.delete("/delete-note/:noteId",authenticatetoken,async(req,res)=>{
const noteId=req.params.noteId;
const{user}=req.user;
try {
    const note=await Note.findOne({_id:noteId,userId:user._id});
    if (!note) {
        return res
    .status(400)
    .json({error:true,message:"note not found"}) 
    }
    await Note.deleteOne({
        _id:noteId,userId:user._id
    })
    return res
    .json({error:false,message:"deleted"}) 
} catch (error) {
    return res
    .status(500)
    .json({error:true,message:"server error"}) 
}
})
//update ispinned value
app.put("/update-note-pinned/:noteId",authenticatetoken,async(req,res)=>{
    const noteId=req.params.noteId;
    const {ispinned}=req.body;
    const{user}=req.user;
   
    try {
       const note=await Note.findOne({_id:noteId,userId:user._id}) ;
       if(!note){
        return res.status(400).json({error:true,message:"note not found"});
       }
     
      note.ispinned=ispinned;
       await note.save();
       return res.json({
        error:false,
        note,
        message:"note updated"
       })
    } catch (error) {
        return res.status(500).json({error:true,message:"server error"})  
    }
})

app.get("/search-notes/",authenticatetoken,async(req,res)=>{
const{user}=req.user;
const {query}=req.query;
if(!query){
    return res
    .status(400)
    .json({error:true,message:"Query search is required"});   
}
try {
    const matchingnotes=await Note.find({
        userId:user._id,
        $or:[
            {title:{$regex:new RegExp(query,"i")}},
            {content:{$regex:new RegExp(query,"i")}},
        ]
    })
    return res.json({
        error:false,
        notes:matchingnotes,
        message:"Notes matching retrived"
    })
} catch (error) {
    return res
    .status(500)
    .json({error:true,message:"Searver error"});   
   
}
})

app.listen(8000);
module.exports=app;