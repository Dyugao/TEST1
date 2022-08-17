<template>
  <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <transition name="sort">
                    <div class="sort"  v-show="show">
                        <div class="all-sort-list2" @click="toSearch">
                            <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key='c1.categoryId' :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.category3Id">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                    </transition>
                    </div>                 
                    
                    <nav class="nav">
                        <a href="###">服装城</a>
                        <a href="###">美妆馆</a>
                        <a href="###">尚品汇超市</a>
                        <a href="###">全球购</a>
                        <a href="###">闪购</a>
                        <a href="###">团购</a>
                        <a href="###">有趣</a>
                        <a href="###">秒杀</a>
                    </nav>
                
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'


export default {
   name:'TypeNav',
   data() {
    return {
        currentIndex:-1,
        show:true
    }
   },
   //组件挂载完毕:可以向服务器发送请求
   mounted(){
    //提醒vuex去获取数据
    
    if(this.$route.path!='/Home'){
        this.show=false
    }
   },
   computed:{
    ...mapState({
        //从state中获得数据
        categoryList:state=>state.home.categoryList
        
    })
   },
   methods:{
    //鼠标进入修改响应式数据currentIndex属性
    changeIndex:throttle(function(index){
        this.currentIndex=index;
       
    },50),
    enterShow(){
      this.show=true
    },
    leaveIndex(){
        this.currentIndex=-1
        if(this.$route.path!='/Home'){
            this.show=false
        }
    },
    //性能优化：不使用link-to
    toSearch(event){
        //最好的解决方案:编程式导航+事件委派
        //存在一些问题:事件委派,是把全部的子节点[h3,dt,dl,em]的事件委派给父亲节点
        //点击a标签的时候,才会进行路由跳转[怎么能确定点击的一定是a标签]
        //答:把子节点当中a标签,我加上自定义属性data-categoryName,其余的子节点是没有的
        //存在另外一个问题:即使你能确定点击的是a标签,如何区分是 一级,二级,三级分类的标签

        //event.target可以获取指定标签的信息
        let element=event.target;
        console.log(element.dataset);
        //用解构的方法：因为dataset里面有categoryname和category(1|2|3)id
        let {categoryname,category1id,category2id,category3id}=element.dataset;
        
        //如果a标签身上拥有categoryname一定是a标签
        if(categoryname){
            //整理路由传参的参数
            let location={name:'search'}
            let query={categoryName:categoryname}
            //一级，二级，三级分类的a标签
            if(category1id){
                query.category1Id=category1id
            }else if(category2id){
                query.category2Id=category2id
            }else{
                query.category3Id=category3id
            }
            //判断：如果路由跳转时，带有params参数，捎带脚传递过去
           //参数合并
           if(this.$route.params){
             location.params=this.$route.params
             location.query=query
            //路由跳转
            this.$router.push(location)
            }
            //整理完参数
            
        }
        
    }
   }
}
</script>

<style scoped lang="less">
 .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        
                    }
                    .cur{
                        background-color:goldenrod;
                    }
                }
            }
            .sort-enter{
                height: 0;
            }
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>