<template>
  <div class="add-blog">
       <div class="card">
                <div class="card-header">
                </div>
                <div class="card-content">
                <div class="form-horizontal">
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-1 control-label">Title</label>
                      <div class="col-sm-10">
                          <input type="text" 
                                  name="Title"
                                 class="form-control"
                                  v-model="selected2.headline"
                                 v-validate="modelValidations.Title">
                        <small class="text-danger" v-show="Title.invalid">
                        {{ getError('Title') }}
                      </small>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-1 control-label">Image</label>
                      <div class="col-sm-10">
                          <input type="text" 
                                  name="Image"
                                 class="form-control"
                                 v-model="selected2.headerImage"
                                 v-validate="modelValidations.Image">
                        <small class="text-danger" v-show="Image.invalid">
                        {{ getError('Image') }}
                      </small>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-1 control-label"></label>
                      <div class="col-sm-10">
                       <vue-editor name="Content" v-validate="Text" v-model="selected2.content"></vue-editor>
                       <div style="margin-top: 5px; " v-show="errors.has('Content')" class="text-danger">{{ errors.first('Content') }}</div>  
                         <small class="text-danger" v-show="Text.invalid">
                        {{ getError('Text') }}
                      </small>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-1 control-label">Author</label>
                       <div class="col-sm-10">
                          <input type="text" 
                                  name="Author"
                                 class="form-control"
                                 v-model="selected2.author"
                                 v-validate="modelValidations.Author">
                        <small class="text-danger" v-show="Author.invalid">
                        {{ getError('Author') }}
                      </small>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-1 control-label">Date Picker</label>
                      <div class="col-sm-10">
                        <div class="col-md-4">
                        <div class="form-group">
                          <el-date-picker v-model="selected2.publishDate"  type="date" placeholder="Pick a day"
                            :picker-options="pickerOptions1">
                          </el-date-picker>
                        </div>
                      </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="form-group">
                      <label class="col-sm-1 control-label">Tags</label>
                       <div class="col-sm-10">
                          <input type="text" 
                                  name="Tags"
                                 class="form-control"
                                  v-model="selected2.tags"
                                 v-validate="modelValidations.Tags">
                        <small class="text-danger" v-show="Tags.invalid">
                        {{ getError('Tags') }}
                      </small>
                      </div>
                    </div>
                  </fieldset>
                  </div>
                  <div class="card-footer">.
                    <div  style="float:right">
                   <button class="btn btn-xs btn-fill  btn-info" :disabled="errors.any()" @click="validate()">Save</button>
                    </div>
                </div>
                </div>
            </div>
  </div>
</template>
<script>
import {mapFields} from 'vee-validate'
import { VueEditor } from 'vue2-editor'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import axios from 'axios';
  export default {
  computed: {
    ...mapFields(['Title', 'Image','Text','Date','Tags','Author'])
  },
  components: {
    'vue-editor' :VueEditor,
    [DatePicker.name]: DatePicker
   },
  data () {
return {    
          selected2: {
          show:false,
          id:'',
          author:'',
          headerImage:'',
          content:'<p></p>',
          headline:'',
          publishDate:'2018 05 27',
          tags:[],
          publicTemp:'',
        }, 
        modelValidations: {
          Title: {
            required: true
          },
          Image: {
            required: true,
          },
          Text: {
            required: true,
          },
          Date: {
            required: true,
          },
          Tags: {
            required: true,
          },
          Author: {
            required: true,
          },
        },    
      pickerOptions1: {
        shortcuts: [{
          text: 'Today',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        },
        {
          text: 'Yesterday',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        },
        {
          text: 'A week ago',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      datePicker: '2018 07 03',
      style:{},
      preview:{
        id:"",
        author:"",
        headerImage:"",
        content:"",
        headline:"",
        publishDate:"",
        tags:""
      },
      selected: [], 
      newsArray: [],
      content:' ',
      itemsHeadline:'',
      }
    },
    methods: {
      getError (fieldName) {
      return this.errors.first(fieldName)
     },
     validate () {
        this.$validator.validateAll().then(async (isValid) => {
          this.$emit('on-submit', this.registerForm, isValid)
          if(isValid && this.selected2.content === '<p></p>'){
            alert("Missing Input!");
          }else if(this.selected2.content === ''){
             alert("Missing Input");
          }
          else{
            if(await this.saveThisUpper() && isValid){
              alert("save Success");
              this.refreshThis();
            }else{
              alert("Error saving")  
            }
            
            
          }
        })
    },
    refreshThis(){
      this.$router.go(this.$router.currentRoute)
    },
     async saveThisUpper(){
      let data = {
        "query":"mutation($publishDate:String,$headline:String!,$image:String,$author:String,$content:String!,$tags:[String]){news(headline:$headline,image:$image,author:$author,content:$content,tags:$tags,publishDate:$publishDate)}",
        "variables":{
          "headline":this.selected2.headline,
          "image":this.selected2.itemsHeadline,
          "author":this.selected2.author,
          "content":this.selected2.content,
          "publishDate":this.selected2.publishDate,
          "tags":""
        }
      }

      if(this.selected2.tags.indexOf(' ') !== -1){
          var tagSplit = this.selected2.tags.split(" ");
          data.variables["tags"] = tagSplit
        }else{
          data.variables["tags"] = this.selected2.tags
        }
           const postSuccess = axios.post(this.post_url,JSON.stringify(data),this.post_config_auth).then((response) => {
                return true;
              }).catch((err) => {
                return false
              });
            return await postSuccess;
        },  
     
     }//methods
  };
</script>
<style>

.extended-forms .el-select {
    width: 100%;
    margin-bottom: 30px;
  }
</style>
