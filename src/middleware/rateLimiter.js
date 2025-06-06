import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
    const {success} = await ratelimit.limit("my-rate-limit")  
    if(!success){
      res.status(429).json({
        message: "too many requests, please try again later"
      })  
    }
    next()
    } catch (error) {
        console.log("rate limit error", error);
        next(error)
    }
}
export default rateLimiter