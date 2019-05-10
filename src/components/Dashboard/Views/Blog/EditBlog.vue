<template>
  <div class="edit-blogs">

     <div class="row" style="margin-bottom:20px">
      <div class="col-md-3">
        <ul class="list-inline">
          <li>
              <div>
                  <input type="checkbox" @click="select()" v-model="selectAll">
              </div>
          </li>
          <li>
            <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm">Tags</button>
            <button type="button" class="btn btn-default btn-sm">Publish</button>
            <button type="button" class="btn btn-default btn-sm">Draft</button>
            </div>
          </li>
          <li>
          <div class="btn-magnify">
             <i class="ti-trash" style="font-size:25px; top:5px;left:5px;cursor:pointer"></i>
           </div>
          </li>
        </ul>
      </div>
      <div class="col-md-3 col-md-offset-6" style="margin-top:6px;">
        <ul class="list-inline">
          <li>
           <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm btn-move-left">
                <span class="btn-label">
                  <i class="ti-angle-left"></i>
                </span>
              </button>
              <button type="button" class="btn btn-default btn-sm">1</button>
              <button type="button" class="btn btn-default btn-sm btn-move-right">
                <span class="btn-label">
                  <i class="ti-angle-right"></i>
                </span>
              </button>
            </div>
          </li>
           <li>
           <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">Page Limit</button>
            </div>
          </li>
            <li>
           <div class="btn-group">
              <button type="button" class="btn btn-default btn-sm">Add Blog</button>
            </div>
          </li>
        </ul>
      </div>
    </div> <!--row-->

  <div v-for="(items,index) in BlogData">
    <div class="row">
    <div class="col-md-12">
        <div class="card">
          <div class="card-content">
          <div class="row">
            <div class="col-md-7">
              <ul class="list-inline" style="margin-top:3px">
                <li>
                  <div>
                    <input type="checkbox" id="items.id" :value="items.id" v-model="selected">
                  </div>
                </li>
                <li>
                  <div>
                 <router-link :to="{ name: 'Blog Page', params: { setname1: items }}">
                 <h5>{{items.content[0].title}}</h5>
                </router-link>
                 
                  </div>
                </li>
                <li>
                 <div class="text-primary" style="overflow:hidden;text-overflow:ellipsis;height:18px">
                    {{items.content[0].sections[0].content}}
                 </div>
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-md-offset-2">
                <ul class="list-inline" style="margin-top:30px">
                  <li>
                      <h6>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    </li>
                    <li>
                      <h6>Author&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    </li>
                    <li>
                      <h6>Likes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    </li>
                    <li>
                      <h6>Publish Date</h6>
                    </li>
                  </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div><!--row-->
  </div><!--items-->


  </div><!--edit blog-->
</template>
<script>

  export default {
    data () {
         return {
        selected: [],
        selectAll : false,
         BlogData: [ 
           {
            id:1,
            name:'Khalid Muctar' ,
            description: 'Mangi Usog',
            content:[{
              title: 'Nag gym sa mangi usog da masi',
              publishDate: '08-06-2018',
              sections:[{
                name:'Panang',
                content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatuSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatu',
              }],
              state: true
            }],
             status:true
          },
          {
            id:2,
            name:'Hanjala Muctar' ,
            description: 'Lagu Ipun',
            content:[{
              title: 'Nag dagang timbangan',
              publishDate: '08-06-2018',
              sections:[{
                name:'Kiki',
                content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatuSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatuSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatu',
              }],
              state: true
            }],
             status:true
          },
           {
            id:3,
            name:'Walad Muctar' ,
            description: 'Pangasu',
            content:[{
              title: 'Mag asu adlaw adlaw amuna in sakit nya',
              publishDate: '08-06-2018',
              sections:[{
                name:'Panang',
                content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatuSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatuSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatu',
              }],
              state: true
            }],
             status:true
          },
        ],

        }//return
      },//data
    methods: {
      select(){
        console.log("select")
        console.log(this.selectAll)

        this.selected = []
        if(!this.selectAll){
            for(let i in this.BlogData){
              this.selected.push(this.BlogData[i].id)
            }
        }
      }
     },
    mounted(){
    },

  };
  </script>
<style>

</style>