<template>
  <div class="FooterMusic">
    <div class="FooterLeft" @click="musicStore.updateDetailShow">
      <img :src="musicStore.getPlayList[musicStore.getPlayListIndex].al.picUrl"
           :alt="musicStore.getPlayList[0].al.pic_str">
      <div>
        <Vue3Marquee>
          {{ musicStore.getPlayList[musicStore.getPlayListIndex].name }}
        </Vue3Marquee>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="FooterRight">
      <svg class="icon" aria-hidden="true" v-if="musicStore.getBtnShow" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
    <audio ref="audio"
           :src="`https://music.163.com/song/media/outer/url?id=${musicStore.getPlayList[musicStore.getPlayListIndex].id}.mp3`"></audio>
  </div>
  <van-popup v-model:show="musicStore.getDetailShow" position="right" :style="{ height: '100%',width:'100%' }">
    <MusicDetail :musicList="musicStore.getPlayList[musicStore.getPlayListIndex]" :play="play"
                 :isbtnShow="musicStore.getBtnShow"/>
  </van-popup>
</template>

<script setup>
import {Vue3Marquee} from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {useMusic} from "../../store/music.js"
import {watch, ref, onMounted, reactive} from "vue";
import MusicDetail from "./MusicDetail.vue"
import {getMusicLyric} from "../../request/api/item.js";

const musicStore = useMusic()
const audio = ref()
const data = reactive({
  interVal: 0
})
const play = () => {
  // 判断音乐是否播放
  if (audio.value.paused) {
    audio.value.play()
    // musicStore.getters.updateIsbtnShow(false)
    musicStore.updateIsBtnShow(false)
    updateTime() // 播放就调用函数传值
  } else {
    audio.value.pause()
    musicStore.updateIsBtnShow(true)
    clearInterval(data.interVal) // 暂停清除定时器
  }
}
watch(
    () => [musicStore.getPlayListIndex, musicStore.getPlayList], () => {
      // 监听如果下标发生改变，就自动播放音乐
      audio.value.autoplay = true
      if (audio.value.paused) {// 如果时暂停状态，改变图标
        musicStore.updateIsBtnShow(false)
      }
      if (musicStore.getBtnShow) {
        // 如果时暂停状态，改变图标
        audio.value.autoplay = true
        musicStore.updateIsBtnShow(false)
      }
      geci()
    }
)

const geci = () => {
  const id = musicStore.getPlayList[musicStore.getPlayListIndex].id
  getMusicLyric(id).then(res => {
    musicStore.updateLyricList(res.data.lrc.lyric)
  })
}
const updateTime = () => {
  data.interVal = setInterval(() => {
    musicStore.updateDurationTime(audio.value.duration)
    musicStore.updateCurrentTime(audio.value.currentTime)
  }, 1000)
}
onMounted(() => {
  geci()
})

</script>

<style scoped lang="less">
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 10px;
  justify-content: space-between;

  .FooterLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .FooterRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>
