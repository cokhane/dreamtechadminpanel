<template>
  <div class="container">

    
    <div v-for="(items,index) in messages" :key="index">
      <div class="jumbotron text-center" style="color:white;background-color:#26394C">
          <div class="col-md-3" style="font-size: 14px;"> Name : <strong class="footer-class">{{items.name}}</strong></div>
          <div class="col-md-3 col-md-offset-6"  style="font-size: 14px;">Company : <strong class="footer-class">{{items.companyname}}</strong></div>
           <br />
          <hr class="my-4 rgba-white-light">
          <h2><strong class="footer-class">{{items.title}}</strong></h2>
          <div class="d-flex justify-content-center">
              <p class="card-text my-2 messages-class"> {{items.message}}
              </p>
          </div>
          <hr class="my-4 rgba-white-light">
          <div class="col-sm-6 col-lg-3"><i class="fa fa-phone fa-lg mt-4"></i> &nbsp;&nbsp;&nbsp;&nbsp;<span class="footer-class">{{items.phonenumber}}</span> </div>
          <div class="col-sm-6 col-lg-3"><i class="fa fa-wechat fa-lg mt-4"></i> &nbsp;&nbsp;&nbsp;&nbsp;<span class="footer-class">{{items.wechat}}</span>  </div>
          <div class="col-sm-6 col-lg-3"><i class="fa fa-qq fa-lg mt-4"></i> &nbsp;&nbsp;&nbsp;&nbsp;<span class="footer-class"> {{items.qq}}</span> </div>
          <div class="col-sm-6 col-lg-3"><i class="fa fa-skype fa-lg mt-4"></i> &nbsp;&nbsp;&nbsp;&nbsp;<span class="footer-class">{{items.skype}}</span></div>
      </div>
    </div>


  </div>
</template>
<script>
  import axios from 'axios';

  export default {

    data () {
      return {
      messages: [], 
      }
    },
    methods: {
       getMessages(){
        const data = {
          "query":
            "query{view_messages{companyname,name,phonenumber,wechat,qq,skype,title,message}}"
        }
          axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
            this.messages = response.data.data.view_messages
            console.log("messages: ", this.messages)
          }).catch((err) => {
             console.log(err);
          });
      },
     },
    mounted(){
    this.getMessages()
   }
  }
</script>
<style>
.footer-class{
  color: #EFCA73;
}
.messages-class{
  padding-top:20px;
  padding-bottom:20px;
  font-size: 14px;
}
</style>
