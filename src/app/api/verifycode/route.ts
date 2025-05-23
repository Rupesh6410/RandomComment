import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";


export async function POST(request:Request) {
    await dbConnect()
    try {
        const {username , code} = await request.json()
        const decodedUsername= decodeURIComponent(username)
        const user =await UserModel.findOne({username:decodedUsername})
        
        if(!user){
            return Response.json({
                success:false ,
                message:"User not found"
    
            } , {status:500})

        }
       const isCodeValid=user.verifyCode===code 
       const isCodeNotExpiry=new Date(user.verifyCodeExpiry) > new Date()
       if(isCodeValid && isCodeNotExpiry){
        user.isVerified=true,
        await user.save()
        return Response.json({
            success:true ,
            message:"Account Verified Successfully"

        } , {status:200})
       }else if(!isCodeNotExpiry){
        return Response.json({
            success:false ,
            message:" Verification code has expired , Please sign-up again"

        } , {status:400})

       }else{
        return Response.json({
            success:false ,
            message:"Invalid Verification Code"

        } , {status:400})
       }

    } catch (error) {
        console.error("Error Verifying User" , error )
        return Response.json({
            success:false ,
            message:"Error Verifying User"

        } , {status:500})
        
    }
    
}