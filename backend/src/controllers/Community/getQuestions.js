import { Quest } from "../../models/community_q.models.js";

const getQuest = async(req,resp)=>{
    try{
        const ques=await Quest.find();
        resp.status(201).json(ques);
    }
    catch(err){
        console.log(err);
        resp.status(404).json({message:"Error in getting the questions"});
    }
};

export {getQuest}
