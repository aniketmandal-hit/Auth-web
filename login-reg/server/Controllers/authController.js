import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const register = async (req, res) =>{
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.json({success: false, message: "Missing details"})
    }
    try {

        const existUser = await userModel.findone()
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
              return res.json({success: true})

    } catch (error) {
        res.json({success: false, message: error.message})
    }

} 


export const login = async(req, res)=>{
    const {email, password} = req.body

    if(!email || !password){
        return res.json({success: false, message: 'Email and password is required'})
    }

    try {
        const user = await userModel.findone();
        if(!user){
            return res.json({success: false, message: 'invalid email'})
        }
        const inmatch = await bcrypt.compare(password, user.password)
            if(!inmatch){
            return res.json({success: false, message: 'invalid password'})
            }

                res.cookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        return res.json({succes: true})

    } catch (error) {
        return res.json({status: false, message: error.message})
    }
}

export const logout = (req, res)=>{
    try {
        res.clearCookie
            ('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none': 'strict',
        })
        
        res.json({success: true, message: "Logout successfull"})
        
    } catch (error) {
       return res.json({success: true, message: error.message})
    }
}