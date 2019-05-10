<template>
  <div class="card card-user">
        <div class="view view-cascade overlay">
          <img class="card-img-top" src="static/img/faces/background.jpg"alt="Card image cap">
            <div class="mask rgba-white-slight"></div>
        </div>

    <div class="card-content" style="min-height: 295px">
      <div class="author">
        <img class="avatar" src="static/img/faces/face-4.jpg" alt="...">
      </div>


      <div class="text-center" style="    margin-top: -23px">
      <h3 class="title"> {{userProfilePage.data.Lastname}} {{userProfilePage.data.Firstname}}
      <br>
      </h3>
      <div>
        <p style="font-size:14px">{{userProfilePage.data.Email}} | {{userProfilePage.data.Username}} </p> 
        <p style="font-size:14px">@{{userCardConvertDate(userProfilePage.data.Birthdate)}}</p>
      </div>

      </div>

    <div class="text-center">
     
           <p style="font-size:14px">{{userProfilePage.address.City}}   {{userProfilePage.address.Street}}</p>  
           <p style="font-size:14px">{{userProfilePage.address.Country}}</p>

    </div>

    <div style="float:left;margin-top: 50px;
    margin-left: -10px;" class="category">
      <small>ID: {{userProfilePage.data.UserID}}</small>
    </div>
    </div>


  </div>
</template>
<script>

import axios from 'axios'

  export default {
    data () {
      return {
        userProfilePage:{
          data:{},
          address:{}

        },
        userTitle: '',
        //deta
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ]
      }
    },
    methods: {
    getUserProfileData(){
        const data = {
           "query":"query{ Profile{UserID,Username,Email,Roles,Firstname,Lastname,Birthdate,Language,Created,Address { Country,City,Street } } }"
        }
        axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
        this.userProfilePage.data = response.data.Profile
        this.userProfilePage.address = response.data.Profile.Address
        console.log("data from usercard: ",    this.userProfilePage.data)

          }).catch((err) => {
           console.log(err);
          });
      },
    userCardConvertDate(date_var){
    var d = new Date(date_var),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        today = '' + d.getDay().toString();

    var thisDay = "";
        if(today == "1" ){
          thisDay = "Monday"
        }else if(today == "2"){
          thisDay = "Tuesday"
        }else if(today == "3"){
          thisDay = "Wednesday"
        }else if(today == "4"){
          thisDay = "Thursday"
        }else if(today == "5"){
          thisDay = "Friday"
        }else if(today == "6"){
          thisDay = "Satday"
        }
         else {
          thisDay = "Sunday"
        }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return  thisDay + " " + month + "/"+ day + "/"+ year + " ";
  },
    },
    mounted(){
      this.getUserProfileData()

    }
  }

</script>
<style>

</style>
