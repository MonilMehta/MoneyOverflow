import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
    }
} 

const registerUser = asyncHandler( async ( req, res ) => {

    const { username, email, fullName, date_of_birth, phone_no, password } = req.body

    if(
        [username, email, fullName, password, date_of_birth, phone_no].some((field) => field?.trim() === '')
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existingUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName: fullName.toLowerCase(),
        date_of_birth,
        phone_no,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            createdUser,
            "User Registration Successful"
        )
    )

})

const loginUser = asyncHandler( async ( req, res ) => {

    const { email, username, password } = req.body

    if(!(username || email)){
        throw new ApiError(400, "Username or Email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if(!user){
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User Login Successful"
        )
    )

})

const logoutUser = asyncHandler( async ( req, res ) => {

    User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logout Successful"
        )
    )
})

const refreshAccessToken = asyncHandler( async ( req, res ) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401, "Invalid Refresh Token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newrefreshToken } = await generateAccessAndRefreshTokens(user._id)
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newrefreshToken},
                "Access Token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
})

const changeCurrentPassword = asyncHandler( async ( req, res ) => {

    const { oldPassword, newPassword, confirmPassword } = req.body

    if(!(oldPassword && newPassword && confirmPassword)){
        throw new ApiError(400, "All passwor fields are required")
    }

    if(!(newPassword === confirmPassword)){
        throw new ApiError(400, "New Password and Confirm Password do not match")
    }

    const user = await User.findById(req.user?._id)

    const isPassCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPassCorrect){
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async ( req, res ) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user, 
            "Current user fetched successfully"
        )
    )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const userId = req.user?._id; 
    const { fullName, email, phone_no, username, date_of_birth} = req.body;

    if (!(fullName || email || phone_no || username || date_of_birth)) {
        throw new ApiError(400, "At least one field (fullName or email) is required.");
    }

    const user = await User.findByIdAndUpdate(
        userId, 
        {
            $set: {
                ...(fullName && { fullName }), 
                ...(email && { email }),
                ...(phone_no && { phone_no }),
                ...(username && { username }),
                ...(date_of_birth && { date_of_birth }),
            }
        },
        {
            new: true,
            runValidators: true 
        }
    ).select("-password"); 


    if (!user) {
        throw new ApiError(404, "Error updating account details. User not found.");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Account details updated successfully"
        )
    );
});

export { registerUser , loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails }
