<template>
  <ItemMusicTop :playlist="state.playlist"/>
</template>

<script setup>
import {useRoute} from 'vue-router'
import {reactive, onMounted} from "vue";
import {getMusicItemList} from '../request/api/item.js'
import ItemMusicTop from '../components/item/ItemMusicTop.vue'

const state = (reactive({
  playlist: {}
}))

onMounted(async () => {
  let id = useRoute().query.id
  // console.log(id)
  let res = await getMusicItemList(id)
  // console.log(res)
  state.playlist = res.data.playlist
})
</script>

<style scoped>

</style>
