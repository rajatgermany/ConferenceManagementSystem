var config = {}
config.Db = function(){
    if(process.env.NODE_ENV == 'test'){
        return "mongodb://localhost/rajat22"
    }
    else {
        console.log('Development')
        return "mongodb://localhost/rajat21"
    }

}






module.exports = config;