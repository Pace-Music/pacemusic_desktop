const qs = require('qs');
const axios = require("axios");
class CoreAPI{
    get(data){
      console.log(data);
    }
    post(path,method,data,callback){
        data = qs.stringify(data);
        
        const config = {
          method: method,
          maxBodyLength: Infinity,
          url: `https://api.pacemusic.ru${path}`,
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          callback(response.data)
        })
        .catch((error) => {
          console.log(error);
        });  
    }
}

module.exports = {
    CoreAPI : new CoreAPI()
}