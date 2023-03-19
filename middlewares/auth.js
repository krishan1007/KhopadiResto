import ErrorHandler from "../utils/ErrorHandler.js";


export const isAuthenticated=(req,res,next)=>{
    const token= req.cookies["connect.sid"];
   

    console.log(token);
    
    if(!token){
       return next(new ErrorHandler("Loggin please",401));
    }

    next();

}
export const authorizedAdmin=(req,res,next)=>{
    
    if(req.user.role!=="admn"){
       return next(new ErrorHandler("Only admin allowed",405));
    }

    next();

}