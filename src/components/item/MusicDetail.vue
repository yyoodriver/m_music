<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg"/>
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true"  @click="musicStore.updateDetailShow">
        <use xlink:href="#icon-jiantouzuo"></use>
      </svg>
      <div class="leftMarquee" @click="backHome">
        <Vue3Marquee style="color: #ffffff">
          {{ musicList.name }}
        </Vue3Marquee>
        <span v-for="(item) in musicList.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiantouyou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!data.isLyricShow">
    <img src="../../assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!musicStore.getBtnShow}">
    <img src="../../assets/cd.png" alt="" class="img_cd">
    <img @click="data.isLyricShow=true"
         :src="musicList.al.picUrl" alt="" class="img_ar"
         :class="{img_ar_active:!musicStore.getBtnShow,img_ar_paused:musicStore.getBtnShow}">
  </div>
  <div class="musicLyric" v-show="data.isLyricShow">
    <!--    {{ musicStore.getLyricList }}-->
    <!--    {{ lyric() }}-->
    <p v-for="item in lyric()" :key="item">
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xihuan1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liuyan1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>
    <div class="footerContent"></div>
    <input type="range" class="range" :min="0" v-model="musicStore.getCurrentTime" :max="musicStore.getDurationTime"
           step="0.05">
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shunxubofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="musicStore.getBtnShow" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {Vue3Marquee} from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {useMusic} from "../../store/music.js"
import {nextTick, reactive, ref, watch} from "vue";
// currentTime 已播放時間
// duration All時間
const props = defineProps({
  musicList: null,
  play: null
})
// console.log(props)

const musicStore = useMusic()
const data = reactive({
  isLyricShow: false
})

const backHome = () => {
  data.isLyricShow = false
  musicStore.getDetailShow

}

const goPlay = (num) => {
  let index = musicStore.getPlayListIndex + num
  if (index < 0) {
    index = musicStore.getPlayList.length - 1
  } else if (index === musicStore.getPlayList.length) {
    index = 0
  }
  musicStore.updatePlayListIndex(index)
}

nextTick(() => {
  lyric()
})

watch(musicStore.getDurationTime, () => {
  lyric()
})

const lyric = () => {

  let arr;
  if (musicStore.getLyricList) {
    arr = musicStore.getLyricList.split(/[(\r\n)\r\n]+/).map((item, i) => {
      let min = item.slice(1, 3);
      let sec = item.slice(4, 6);
      let mill = item.slice(7, 10)
      let lrc = item.slice(11, item.length)
      // 定义毫秒
      let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + mill
      // console.log(min, sec, Number(mill), lrc);
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9)
        lrc = item.slice(10, item.length)
        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + mill
      }
      // console.log(min,sec,Number(mill),lrc);
      return {min, sec, mill, lrc, time}
    })
  }
  // console.log(arr)
  return arr
}

// console.log(musicStore.getLyricList)
</script>


<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;

  .detailTopLeft {
    display: flex;
    align-items: center;

    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;

      span {
        color: #999;
      }

      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 2rem;
    height: 3rem;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-20deg);
    transition: all 2s;
  }

  .img_needle_active {
    width: 2rem;
    height: 3rem;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-5deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_paused {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musicLyric {
  width: 100%;
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  overflow: scroll;

  p {
    color: #D3D3D3;
    margin-bottom: .3rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .range {
    width: 100%;
    height: 0.06rem;
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      fill: rgb(245, 234, 234);
    }

    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
