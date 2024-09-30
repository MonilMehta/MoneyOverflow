import { Answer } from "../../models/community_a.models.js";

const getAns = async (req, resp) => {
    const { questionId } = req.body; 
    if (!questionId) {
        return resp.status(400).json({ message: "questionId is required" }); 
    }

    try {
        const ans = await Answer.find({ questionId });

        if (ans.length === 0) {
            return resp.status(404).json({ message: "No answers found for this question" });
        }

        resp.status(200).json(ans);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ message: "Error in getting the answers" });
    }
};

export { getAns };
