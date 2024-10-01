import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../utils/mailer.js";
import axios from 'axios';

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

    user.isSubscribed = true;
    await user.save();
    console.log('User subscribed successfully');

    // Fetch latest financial news
    const API_KEY = process.env.NEWS_API_KEY;
    const API_URL = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=us&apikey=${API_KEY}`;
    const newsResponse = await axios.get(API_URL);
    const articles = newsResponse.data.articles.slice(0, 7); // Get top 5 articles

    const newsHtml = articles.map(article => `
        <tr>
            <td style="padding: 20px;">
                <h3 style="color: #1a5f7a;">${article.title}</h3>
                <img src="${article.image}" alt="${article.title}" style="max-width: 100%; height: auto; margin-bottom: 10px;">
                <p>${article.description}</p>
                <a href="${article.url}" style="background-color: #1a5f7a; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 10px;">Read more</a>
            </td>
        </tr>
    `).join('');

    // Send subscription confirmation email with latest financial news
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #1a5f7a;margin:20px;">
                    <h1 style="color: white;">Subscription Confirmation</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; background-color: white; margin:20px;">
                    <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with the latest financial news and insights.</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; background-color: #e9ecef; margin:20px;">
                    <h2 style="color: #1a5f7a;">Latest Financial News</h2>
                </td>
            </tr>
            ${newsHtml}
            <tr>
                <td style="padding: 20px; text-align: center; background-color: #1a5f7a; color: white;">
                    <p>&copy; 2024 MoneyOverflow. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    await sendMail(email, 'Subscription Confirmation', htmlContent);
    console.log('Subscription successful. Confirmation email sent to:', email);
    return res.status(200).json(new ApiResponse(200, {}, 'Subscription successful. Confirmation email sent.'));
});

export { subscribeNewsletter };