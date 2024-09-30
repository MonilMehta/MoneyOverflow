import mongoose  from "mongoose";

const questionSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    quest: {
        type: [{
            title: {
                type: String,
                required: true // Make the title required
            },
            bodyQ: {
                type: String,
                required: true // Make the bodyQ required
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        default: [] // Initialize the quest array by default
    }
});

export const Quest = new mongoose.model('questions',questionSchema);

