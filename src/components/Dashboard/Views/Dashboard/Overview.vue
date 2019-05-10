<template>
  <div class="overview">
    <!--Stats cards-->
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

      <div class="row">
      <div class="col-md-12">
      <div class="card">
        <div class="row">
          <div class="card-content">
          <div class="col-md-6">
           <p>{{dashboardGetLanguageFields.latestLogin}}</p>
           <hr>
    <div class="card-content">
      <ul class="list-unstyled team-members">
        <li>
          <div class="row" v-for="items in belovedFamilyData">
            <div class="col-xs-3">
              <div class="avatar">
                <div style="    background: black; height: 50px; width: 50px;border-radius: 50%; text-align: center;">
                  <p style=" color: white;padding: 10px; font-size: 20px;">KH</p>
                </div>
              </div>
            </div>
            <div class="col-xs-6">
                    <div class="category">
              <p class="text-info">{{items.email}}</p>
              <p class="text-primary"><small>{{items.name}}</small></p>
              </div>
            </div>
            <div class="col-xs-3 text-right">
                <p class="category">{{dashboardGetLanguageFields.aFewSecondsAgo}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
   </div>
    <div class="col-md-6">
      <p>{{dashboardGetLanguageFields.newSignup}}</p> 
        <hr>
         <div class="card-content">
          <ul class="list-unstyled team-members">
            <li>
              <div class="row" v-for="items in belovedFamilyData">
                <div class="col-xs-3">
                  <div class="avatar">
                         <div class="avatar">
                    <div style="    background: black; height: 50px; width: 50px;border-radius: 50%; text-align: center;">
                      <p style=" color: white;padding: 10px; font-size: 20px;">AN</p>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="col-xs-6">
                        <div class="category">
                  <p class="text-info">{{items.email}}</p>
                  <p class="text-primary"><small>{{items.name}}</small></p>
                  </div>
                </div>
                <div class="col-xs-3 text-right">
                    <p class="category">{{dashboardGetLanguageFields.aFewSecondsAgo}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>
<script>
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import Loading from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'
  import {mapActions} from 'vuex';
  import {mapGetters} from 'vuex'
  import axios from 'axios';

  const WorldMap = () => ({
    component: import('./../Maps/WorldMap.vue'),
    loading: Loading,
    delay: 200
  })

  export default {
    components: {
      StatsCard,
      ChartCard,
      CircleChartCard,
      WorldMap
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        getDashboardGetLanguageFields:{
          data:''
        },
        dashboardGetLanguageFields:{
          updatedNow:'',
          activeUsers:'',
          last30days:'',
          last7days:'',
          latestLogin:'',
          logins:'',
          newSignup:'',
          users:'',
          aFewSecondsAgo:''
        },
          belovedFamilyData: [{
          name: 'Khalid Muctar',
          email: 'khalidhmuctar@mangiusog.com',
          age: 24,
          hobbies: 'Exercise',
          Description: 'Matabang Pangit',
          Family:'Muctar',
          image: 'static/img/faces/face-1.jpg',


        }, {
          name: 'Hanjala Muctar',
          email: 'hanjalamuctar@panakawbasi.com',
          age: 21,
          hobbies: 'Get Iron',
          Description: 'Malaking Ngipin',
          Family:'Muctar',
          image: 'static/img/faces/face-1.jpg',



        }, {
          name: 'Walad Muctar',
          email: 'waladmuctar@pangasu.com',
          age: 19,
          hobbies: 'Play With hands',
          Description: 'Maugat Ang Kamay',
          Family:'Muctar',
          image: 'static/img/faces/face-1.jpg',


        },]
        ,
          statsCards: [ // my beloved cousin
          {
            type: 'warning',
            icon: 'ti-user',
            title: '',
            value: '99',
            footerText: ' ',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-user',
            title: '',
            value: '99',
            footerText: '',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-user',
            title: '',
            value: '23',
            footerText: '',
            footerIcon: 'ti-timer'
          },
          {
            type: 'info',
            icon: 'ti-user',
            title: '',
            value: '99',
            footerText: '',
            footerIcon: 'ti-reload'
          }
        ],
      
        earningsChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June'],
            series: [
              [230, 340, 400, 300, 570, 500, 800]
            ]
          },
          options: {
            showPoint: false,
            lineSmooth: true,
            height: '210px',
            axisX: {
              showGrid: false,
              showLabel: true
            },
            axisY: {
              offset: 40,
              showGrid: false
            },
            low: 0,
            high: 'auto',
            classNames: {
              line: 'ct-line ct-green'
            }
          }
        }

      }
    },
    computed: {
    ...mapGetters([
      'viewLanguageCode',
    ])
   },
    methods:{
      getDashboardLanguage(){
       const data = {
         "query":"query($input:view_languages_fields,$limit:Limit,$sort:sort,$search:search){view_languages(input:$input,limit:$limit,sort:$sort,search:$search){ data { id,keyword,description,date }, success,message, { path,message }, page { items,pageNo,totalPages } sortableFields,searchableFields } }",
      "variables":{
          "input":{
              "code":this.viewLanguageCode || "en",
              "set_name":"dashboard module"
          },
          "limit":{
              "to":1000,
              "page":1
          },
          "sort":{
              "field":"",
            "by":""
          },
          "search":{
              "by":"",
              "text":""
          }
      }
    };
        axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
        // console.log("getDashboardLanguage: ",response)
        this.getDashboardGetLanguageFields.data = response.data.view_languages.data
        this.setDefaultLanguage()
        }).catch((err) => {
        }); 

      },



    setDefaultLanguage(){
    this.dashboardGetLanguageFields.updatedNow = 'Updated now'
    this.dashboardGetLanguageFields.activeUsers = 'Active Users'
    this.dashboardGetLanguageFields.last30days = 'Last 30 days'
    this.dashboardGetLanguageFields.last7days = 'Last 7 days'
    this.dashboardGetLanguageFields.latestLogin = 'Latest Login'
    this.dashboardGetLanguageFields.logins = 'Logins'
    this.dashboardGetLanguageFields.newSignup = 'New Signup'
    this.dashboardGetLanguageFields.users = 'Users'
    this.dashboardGetLanguageFields.aFewSecondsAgo = 'a few seconds ago'

    this.setDashboardLanguage() 


    },

    setStatCards(){
    // console.log(this.statsCards)
    this.statsCards[0].title = this.dashboardGetLanguageFields.users
    this.statsCards[0].footerText =  this.dashboardGetLanguageFields.updatedNow
    this.statsCards[1].title = this.dashboardGetLanguageFields.activeUsers
    this.statsCards[1].footerText =  this.dashboardGetLanguageFields.last30days
    this.statsCards[2].title = this.dashboardGetLanguageFields.logins
    this.statsCards[2].footerText =  this.dashboardGetLanguageFields.last7days
    this.statsCards[3].title = this.dashboardGetLanguageFields.newSignup
    this.statsCards[3].footerText =  this.dashboardGetLanguageFields.last7days

   },


   setDashboardLanguage(){
   const languageKeys = Object.keys(this.dashboardGetLanguageFields)
   for(var i = 0; i < languageKeys.length; i++){
      for(var j = 0; j < this.getDashboardGetLanguageFields.data.length; j++){
        // console.log(this.dashboardGetLanguageFields[languageKeys[i]])
        // console.log("--------------------------")

        if(this.dashboardGetLanguageFields[languageKeys[i]] == this.getDashboardGetLanguageFields.data[j].keyword){
            this.dashboardGetLanguageFields[languageKeys[i]] =  this.getDashboardGetLanguageFields.data[j].description
            // console.log(this.dashboardGetLanguageFields[languageKeys[i]], "translate: ", this.getDashboardGetLanguageFields.data[j].keyword)

        }
      }
     }

    this.setStatCards()

   }
  


  },
  // METHODS
  watch: {
  'viewLanguageCode': function (newValue, oldValue) {
      if(oldValue != newValue){
        this.getDashboardLanguage()
      }
   },
  },
 // WATCH

  mounted(){
    this.getDashboardLanguage()

  }

  }

</script>
<style>

</style>
