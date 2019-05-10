<template>
  <div class="test3">
    <h1>TEST2 LIST</h1>
    <div class="row">
      <div>
        <el-tag
        :key="tag"
        v-for="tag in tags.dynamicTags"
        type="primary"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag}}
      </el-tag>
      <input type="text" placeholder="Add tags" class="form-control input-new-tag"
       v-model="tags.inputValue"
       ref="saveTagInput"
       size="mini"
       @keyup.enter="handleInputConfirm"

       @blur="handleInputConfirm"/>
      </div>

      <div style="margin:20px">
        <button class="btn" @click="displayTag()">show</button>
      </div>

             
    </div>
  </div>
</template>
<script>
//map action for tracking when there is a lot of actions and mutation
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex'
  import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'


  export default {
    components:{
      [Tag.name]: Tag,

    },
    data () {
      return {
      tags: {
          dynamicTags: [],
          inputVisible: false,
          inputValue: ''
        },
      }
    },
    computed:{
      products(){
        return this.$store.state.products
      },
      // saleProducts(){
      //   return this.$store.getters.saleProducts
      // }
      ...mapGetters([ //array and you can call you getters inside
        'saleProducts'
        ])
    },
    methods:{
      // reducePrice(amount){// can accept parameters // this should always be after the mutation parameter.
      //   // this.$store.commit('reducePrice') if not performing an async function
      //   this.$store.dispatch('reducePrice',amount)
      // }
      convertTitle(){
          var str  = "Si Lester ikup ay kumakain ng basang panty"
          var strsplit = str.split(' ')
          var combinestr = strsplit[0] + " " +strsplit[1] + ".."
         
          console.log(strsplit) 
          console.log(combinestr) 
        },
      ...mapActions([
        'reducePrice'
        ]),

      handleClose (tag) {
        this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1)
      },
      handleInputConfirm () {
        let inputValue = this.tags.inputValue
        if (inputValue) {
          this.tags.dynamicTags.push(inputValue)
        }
        this.tags.inputVisible = false
        this.tags.inputValue = ''
      },
      displayTag(){
        console.log(this.tags.dynamicTags)
      }


    },



    mounted(){
      this.convertTitle()
    }

  };
</script>
<style>
</style>
