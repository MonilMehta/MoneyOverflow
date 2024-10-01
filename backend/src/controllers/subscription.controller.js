import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../utils/mailer.js";

const subscribeNewsletter = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json(new ApiResponse(400, {}, 'Email is required'));
    }

    const user = await User.findOne({ email });

    if (!user) {
        console.log('User not found');
        return res.status(404).json(new ApiResponse(404, {}, 'User not found'));
    }

    if (user.isSubscribed) {
        console.log('User is already subscribed');
        return res.status(400).json(new ApiResponse(400, {}, 'User is already subscribed'));
    }

    user.isSubscribed = true;
    await user.save();

    console.log('User subscribed successfully');

    // Send subscription confirmation email
    await sendMail(email, 'Subscription Confirmation', 'You have successfully subscribed to our newsletter.');

    console.log('Subscription successful. Confirmation email sent to:', email);

    return res.status(200).json(new ApiResponse(200, {}, 'Subscription successful. Confirmation email sent.'));
});


export { subscribeNewsletter };