import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import transporter from '../config/nodeMailer.js'

export const register = async (req, res) =>{
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.json({success: false, message: "Missing details"})
    }
    try {

        const existUser = await userModel.findOne({email});
        if (existUser) {
            return res.json({success:false, message: 'email already exist'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new userModel({name, email, password: hashedPassword})
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
            text : `Welcome to cinnect website. Your account has been created with the email id: ${email}`
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

        return res.json({succes: true, message: "login successfull"})

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
       return res.json({success: true, message: error.message})
    }
}

export const sendVerifyOtp = async (req, res)=>{
    try {
        
  
    const {userId} = req.body;

    const user = userModel.findById(userId)

    if(user.isAccountVerified){
        res.json({succes: false, message : 'user already verified'})
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
    res.json({success: true, message: 'otp sent successful'})

      } catch (error) {
        res.json({success: false, message: error.message})
    }
}
export const verifyOtp = async(req, res)=>{
    const {userId, otp} = req.body;
    
    if(!userId || !otp){
        res.json({success: false, message: 'missing details'})
    }
    try {
        const user = await userModel.findById(userId)
        if(!user){
            res.json({success: false, message: 'User not found'})
            if(user.verifyOtp === "" || user.verifyOtp !== otp){
                res.json({success: false, message : 'invalid otp'})
            }
            if(verifyOtpExpireAt > Date.now()){
                res.json({success : false, message: 'Otp timeout'})
            }
        }
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();
        res.json({succes: true, message : "account created successful"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
