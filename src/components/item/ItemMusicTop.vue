<template>
  <div class="itemMusicTop">
    <img src="" alt="">
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-jiantouzuo"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-nav-list"></use>
      </svg>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  foo: "playlist"
})
console.log(props)
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem;

  .itemLeft, .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    span {
      font-size: .4rem;
      color: #fff;
    }

    .icon {
      //fill: #fff; // 填充颜色
    }
  }
}
</style>
