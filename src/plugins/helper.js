// 
import jwtDecode from 'jwt-decode'; 
export default {

	data() {

		//api
    	return {
    	//process.env.ROOT_API
    		post_url: process.env.ROOT_API,
    		post_config:{
    			"headers":{
                    "Content-Type":"application/json"
                }
    		},
    		post_config_auth:{
    			"headers":{
            "Content-Type":"application/json",
            "Authorization":window.localStorage.getItem("session")
          }
    		}
        }
   	},
	methods:{
		validate_session(){
	      const dateNow = new Date();
	      const sessiondata =  window.localStorage.getItem("session");
	      if(!sessiondata){
		  	this.$router.push('/login')
	      	return null
	      }else{
	        const decoded = jwtDecode(sessiondata);
	        if((dateNow.getTime()/1000) <= decoded.exp){
	        	
    			return true;
	        }else{
	        	return false;
	        }
	      }
	    },
	},
	mounted(){
		// alert(process.env.lester);
	}
}