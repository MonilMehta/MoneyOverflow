import { User } from "../../models/user.models.js";
import { Quest } from "../../models/community_q.models.js";

const uploadQuest = async (req, resp) => {
    try {
        let user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return resp.status(404).json({ message: "No user found" });
        }

        // Create a new Question document or find the existing one for this user
        let data1 = await Quest.findOne({ userId: req.body.userId });
        if (!data1) {
            data1 = new Quest({ userId: req.body.userId });
        }
        // Ensure the quest array is initialized
        data1.quest = data1.quest || [];

        // Push the new question with title and bodyQ
        data1.quest.push({
            title: req.body.title, 
            bodyQ: req.body.bodyQ
        });

        // Save the updated Question document
        const savedData = await data1.save();

        // Return the saved question data as a response
        resp.status(201).json(savedData);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ message: "Error in uploading question" });
    }
};

export {uploadQuest}
