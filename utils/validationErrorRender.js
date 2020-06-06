module.exports = function validationErrorRender(err,template,res,context){
    if (err.name==='ValidationError') {
        res.render(template, {
            ...context,
            errors: err.errors
        });
        return true;
    }
    return false;
}