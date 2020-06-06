module.exports={
    get:{
        notFound: (req,res,next)=>{
            res.render('404.hbs', {pageTitle: 'Error'});
        }        
    }
}