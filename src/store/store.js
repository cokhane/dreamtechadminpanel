import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
	state:{
  products:[
        {name:'Banana Skin', price:20},
        {name:'Shiny Star', price:40},
        {name:'Green Shells', price:60},
        {name:'Red Shells', price:80}
  ],

  languageCode:{
  	code:window.localStorage.getItem("lang")
  },

  navPanel: [
  {
    name: 'Dashboard',
    icon: 'ti-dashboard',
    path: '/overview'
  },

  {
    name: 'News',
    icon: 'fa fa-address-card-o',
    path: '/news'
  },

  {
    name: 'Users',
    icon: 'ti-book',
    path: '/users'
  },
   {
    name: 'Roles And Permission',
    icon: 'ti-user',
    path: '/rolesandpermission'
  },
  {
    name: 'Languages',
    icon: 'ti-world',
    path: '/languages'
  },
  {
    name: 'Tokens',
    icon: 'ti-control-record',
    path: '/tokens'
  },
  {
    name: 'Contact Us',
    icon: 'ti-comments',
    path: '/contacts'
  },
  {
    name: 'Mail',
    icon: 'ti-email',
    path: '/mail'
  },
 

]
	},
	getters:{ //traserve inside a derived and do something with the keys
		saleProducts:state=>{
    	var saleProducts =  state.products.map( product =>{
          return {
            name:"**" + product.name +"**",
            price: product.price/2
          }
        });
        return saleProducts
		},
   	viewLanguageCode:(state)=>{
      		return state.languageCode.code
      	},
	 	viewNavPanel:(state)=>{
      		return state.navPanel
      	},
	},
	mutations:{ // change the data
    reducePrice:(state,payload)=>{
    	state.products.forEach(product =>{
    		product.price -= payload
    	})
    },

   getLanguageCode:(state,payload)=>{
    state.languageCode.code = payload
    }
	},
	actions:{ // for async mutation
	 	reducePrice:(context,payload)=>{
	 		setTimeout(function(){// this is just a sample async function. //wait if this true then commits the mutation
	 			context.commit('reducePrice',payload)
	 		},2000) // changes in mutation will run after 2 secondss
	 	},
 		getLanguageCode:(context,payload)=>{
			context.commit('getLanguageCode',payload)
	 	}
	}

})

