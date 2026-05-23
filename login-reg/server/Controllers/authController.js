import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import transporter from '../config/nodeMailer.js'
import userAuth from '../middleware/userAuth.js'


export const register = async (req, res) =>{
    const {username, email, password} = req.body

    if (!username || !email || !password) {
        return res.json({success: false, message: "Missing details"})
    }

    if (username.length > 15) {
        return res.json({success: false, message: "Username must not exceed 15 characters"})
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
        return res.json({success: false, message: "Username can only contain alphabets, numbers, underscore (_), and dot (.)"})
    }

    try {

        const existUser = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        });
        if (existUser) {
            return res.json({success:false, message: 'Email or Username  already exist'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new userModel({username, email, password: hashedPassword})
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : "Welcome mail",
            text : `Welcome to cinnect website. Your account has been created with the email id: ${email}. Your username is ${username}`
        }

   try {
    await transporter.sendMail(mailOptions);
} catch (error) {
    console.error("Email failed but server is still running:", error.message);
}
              console.log(mailOptions)
              return res.json({success: true})

    } catch (error) {
        res.json({success: false, message: error.message})
        console.log(error.message)
    }

} 


export const login = async(req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.json({success: false, message: 'Email and password is required'})
    }

    try {
        const user = await userModel.findOne({email });
        if(!user){
            return res.json({success: false, message: 'invalid email'})
        }
        const ismatch = await bcrypt.compare(password, user.password)
            if(!ismatch){
            return res.json({success: false, message: 'invalid password'})
            }
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' })

                res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

        return res.json({success: true, message: "login successfull"})

    } catch (error) {
        return res.json({status: false, message: error.message})
    }
}

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none': 'strict',
        })
        
        res.json({success: true, message: "Logout successful"})
        
    } catch (error) {
       return res.json({success: false, message: error.message})
    }
}

export const sendVerifyOtp = async (req, res)=>{
    try {
        
    const {userId} = req.body;

    const user = await userModel.findById(userId)

    if(user.isAccountVerified){
       return res.json({succes: false, message : 'user already verified'})
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000))

     user.verifyOtp = otp;
     user.verifyOtpExpireAt = Date.now() + 24 * 60 *60 *1000

     await user.save()

     const mailOptions = {
        from : process.env.SENDER_EMAIL,
        to : user.email,
        subject : "Otp verification",
        text : `Your otp for verification is ${otp}.`
     }
        try {
    await transporter.sendMail(mailOptions);
} catch (error) {
    console.error("Otp verification failed but server is still running:", error.message);
}
        return res.json({success: true, message: 'otp sent successful'})

      } catch (error) {
        return res.json({success: false, message: error.message})
    }
}
export const verifyOtp = async(req, res)=>{
    const {userId, otp} = req.body;
    
    try {
            if(!userId || !otp){
        res.json({success: false, message: 'missing details'})
    }} catch (error) {
        return res.json({success: false, message: error.message})
    }
    
    try {
        const user = await userModel.findById(userId)
        if(!user){
            return res.json({success: false, message: 'User not found'})
        }
            if(user.verifyOtp === "" || user.verifyOtp !== otp){
                return res.json({success: false, message : 'invalid otp'})
            }
            if(user.verifyOtpExpireAt < Date.now()){
                return res.json({success : false, message: 'Otp timeout'})
            }
        
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.json({success: true, message : "account created successful"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}
export const isAuthenticated = async(req, res)=>{
    try {
        return res.json({success: true, message: 'user is isAuthenticated'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}
//reset otp

    export const sendResetOtp =  async(req, res)=>{
        const {email} = req.body;

        if(!email){
            res.json({success: false, message : "Email is required"})
        }
        try {
            const user = await userModel.findOne({email})
            if(!user){
                return res.json({success: false, message: 'User not found'})
            }
                const otp = String(Math.floor(100000 + Math.random() * 900000))

     user.resetOtp = otp;
     user.resetOtpExpireAt = Date.now() + 15 *60 *1000

     await user.save()

     const mailOptions = {
        from : process.env.SENDER_EMAIL,
        to : user.email,
        subject : "password reset otp",
        text : `Your otp to reset your password is ${otp}.`
     }
        try {
    await transporter.sendMail(mailOptions);
} catch (error) {
    console.error("Otp verification failed but server is still running:", error.message);
}
        return res.json({success: true, message: 'Reset otp sent successful'})

        } catch (error) {
            return res.json({success: false, message: error.message})
        }
    }


    export const resetPassword = async (req, res) => {
        const {email, otp, password} = req.body

        if(!email || !otp || !password){
            res.json({success: false, message: 'Email or Otp or Password are required'})
        }
        const user = await userModel.findOne({email})
        try {
            
       
        if(!user){
            return res.json({success: false, message: 'user not found'})
        }
        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.json({success: false, message: 'invalid otp'})
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message: 'reset otp expired'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0

        await user.save()

        return res.json({success: true, message: "Password has been reset successfuly"})
         } catch (error) {
            return res.json({success: false, message: error.message})
        }
    }

