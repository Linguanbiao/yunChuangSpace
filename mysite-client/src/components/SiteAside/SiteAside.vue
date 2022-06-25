<template>
   <div class="site-aside-container">
       <template v-if="data">
       <div class="avatar" >
           <Avatar :url="data.avatar" :size = '150'></Avatar>
       </div>
       <h1 class="introduce">{{data.siteTitle}}</h1>
       </template>
       <Menu></Menu>
       <Contact v-if="data"></Contact>
       <p class="footer" v-if="data">{{data.icp}}</p>
   </div>
  
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Menu from '@/components/SiteAside/Menu.vue';
import Contact from '@/components/SiteAside/Contact.vue'
import {mapState} from 'vuex'
export default {
     components:{
         Avatar : Avatar,
         Menu : Menu,
         Contact : Contact
     },
     computed:{
       ...mapState("setting", ["data"]),     // setting 模块下的 data 数据
     }
}
</script>

<style lang="less" scoped>
@import '~@/style/var.less';
.site-aside-container{
    height: 100%;
    width: 100%;
    background: @dark;
    padding: 20px 0;
    box-sizing: border-box;
    overflow-y: auto;
    .avatar{
        height: 150px;
        width: 150px;
        margin: 0 auto;
    }
    h1{
        font-size: 20px;
        text-align: center;
        color: #fff;
    }
    .footer{
        text-align: center;
        font-size: 12px;
    }
}
</style>>

</style>