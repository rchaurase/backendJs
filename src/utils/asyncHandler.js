// wrapper for async handler using promise


const asyncHandler = (requestHandler)=>{
  (req,res,next)=>{
    return Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
  }
}

export {asyncHandler}



// wrapper for asycn handler using try-catch
/*
const asyncHandler = (fn)=> async (req,res,next)=>{
  try {
    await fn(req,res,next)
  } catch (error) {
    res.status(error.code|| 500).json({
      success:false,
      message:error.message
    })
  }
}
*/

