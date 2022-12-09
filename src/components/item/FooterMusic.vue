<template>
  <div class="FooterMusic">
    <div class="FooterLeft">
      <img src="" alt="">
      <div>
        <p></p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="FooterRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {mapState} from 'pinia'
import {useMusic} from "../../store/music.js"
import {computed} from "vue";

// computed(
//     ...mapState(useMusic, ['playList', 'playListIndex'])
// )


</script>

<style scoped lang="less">
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
}
</style>
