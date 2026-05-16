import jwt from "jsonwebtoken";

const userAuth = (req, res, next)=>{
    const {token} = req.cookies;

    try {
        if(!token){
            return res.json({success: false, message: "Not authorised, please login again"})
        }
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY)

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }else{
            return res.json({success: false, message: "user not verified"})
        }
        next();
    }
    
    
     catch (error) {
        return res.json({success: false, message: error.message})
    }
}
export default userAuth