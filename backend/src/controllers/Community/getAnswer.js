import { Answer } from "../../models/community_a.models.js";

const getAns = async(req,resp)=>{
    try{
        const ans=await Answer.find();
        resp.status(201).json(ans);
    }
    catch(err){
        console.log(err);
        resp.status(404).json({message:"Error in getting the questions"});
    }
};

export {getAns}