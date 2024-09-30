import { Answer } from "../../models/community_a.models.js";
import { Quest } from "../../models/community_q.models.js";
const uploadAns = async(req,resp)=>{
    try {
        let userId = req.body.userId;
        let questionId = req.body.questionId;
        let q = await Quest.findOne({ 'quest._id': questionId }); // Assuming your user model is named 'User'
        
        if (!q) {
            return resp.status(404).json({ message: "No questions found" });
        }
        
        // Find the question within the 'quest' array
        let question = q.quest.find(q1 => q1._id.toString() === questionId);
        
        if (!question) {
            return resp.status(404).json({ message: "Question not found" });
        }
        
        const ans = new Answer({userId:userId, questionId, bodyA: req.body.bodyA });
        await ans.save();
        
        resp.status(201).json(ans);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ message: "Internal server error" });
    }
};

export {uploadAns}