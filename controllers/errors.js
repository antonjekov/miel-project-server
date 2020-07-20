module.exports={
    get:{
        notFound: (req,res,next)=>{
            res.status(404).end()
        }        
    }
}