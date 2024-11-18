import { Creator } from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const {username, email, password } = req.body;
    
    const hashedPassword = bcryptjs.hashSync(password,7);
    const newCreator = new Creator({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newCreator.save();
        res.status(201).json({
            msg: "Creator created Successfully"
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
        const validCreator = await Creator.findOne({email});
        if(!validCreator) return next(errorHandler(404, "creator not found!"));

        const validPassword = bcryptjs.compareSync(password, validCreator.password);
        if(!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

        const token = jwt.sign({id: validCreator._id}, process.env.JWT_SECRET);
        const {password: pass, ...rest } = validCreator._doc;
        res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest);
    }
    catch(e){
        next(e);
    }
}