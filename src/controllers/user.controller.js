import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req,res)=>{
  // get user details from frontend
  // calidation check
  // check if user already exist:username and email

  //check for images ,check for avatar
  // upload them on cloudinary,avatar
  //create user object -create entry in db
  // remove password and refresh token field from  response
  // check for user creation
  // return response
  const {username,fullname,email,password}=req.body
  console.log("email",email)
  if([fullname,email,username,password].some((field)=>field?.trim()=== "")){
    throw new ApiError(400,"All fields are required")
  }

  const existedUser = User.findOne({
    $or:[ {username} , {email} ]
  })
  
  if(existedUser){
    throw new ApiError(409,"User with emial or username already exist")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
  }


  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400,"avatar is required field")
  }

  const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url|| '',
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering user")
  }


  return res.status(201).json(
    new ApiResponse(200,createdUser,"User is registered successfully")
  )

})

export {registerUser}
