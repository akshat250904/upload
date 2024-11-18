import { Editor } from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const {username, email, password } = req.body;
    
    const hashedPassword = bcryptjs.hashSync(password,7);
    const newEditor = new Editor({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newEditor.save();
        res.status(201).json({
            msg: "Editor created Successfully"
        })
    }
    catch(e){
        console.log("hi");
        
        next(e);
    }
};

export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const validEditor = await Editor.findOne({email});
        if(!validEditor) return next(errorHandler(404, "Editor not found!"));

        const validPassword = bcryptjs.compareSync(password, validEditor.password);
        if(!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

        const token = jwt.sign({id: validEditor._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest } = validEditor._doc;
        res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest);
    }
    catch(e){
        next(e);
    }
}