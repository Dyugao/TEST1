<template>
<div>
 <TypeNav></TypeNav>
 <ListContainer></ListContainer>
 <Recommend></Recommend>
 <Rank></Rank>
 <Like></Like>
 <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
 
 <Brand></Brand>
</div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import { mapState } from 'vuex'

export default {
    name: "Home",
    components: { ListContainer, Recommend, Like, Rank, Floor, Brand},
    mounted(){
    this.$store.dispatch('floorList')
    
   },
   computed:{
    ...mapState({
        floorList:state=>state.home.floorList
    })
   },
   
}
</script>

<style scoped>

</style>