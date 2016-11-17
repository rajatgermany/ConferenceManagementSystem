var config = {}



config.Db = function(){
    if(process.env.NODE_ENV == 'test'){
        console.log('Test')

        return "mongodb://localhost/rajat22"
    }

    else {
        console.log('Development')

        return "mongodb://localhost/rajat21"
    }

}






module.exports = config;