<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-jiantouzuo"></use>
    </svg>
    <input type="text" placeholder="请输入歌名或歌手" v-model="data.searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in data.keyWordList" :key="item" class="spanKey" @click="searchHistory">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
    <div class="item" v-for="(item, i) in data.searchList" :key="i">
      <div class="itemLeft" @click="updateIndex(item)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.ar" :key="index">{{
              item1.name
            }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mv !==0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-liebiao2"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// data({
//   keyWordList: [],
//   searchKey: ""
// })

import {onMounted, reactive, watch} from "vue";
import {getSearchMusic} from "../request/api/home.js";
import {useMusic} from "../store/music.js"

const musicStore = useMusic()
const data = reactive({
  keyWordList: [],
  searchKey: "",
  searchList: []
})


const enterKey = async () => {
  if (data.searchKey !== "") {
    console.log(data)
    data.keyWordList.unshift(data.searchKey)
    // 去重
    data.keyWordList = [...new Set(data.keyWordList)]
    // 固定长度
    if (data.keyWordList.length > 10) {
      data.keyWordList.splice(data.keyWordList.length - 1, 1)
    }
    localStorage.setItem("keyWordList", JSON.stringify(data.keyWordList))
    let res = await getSearchMusic(data.searchKey)
    data.searchList = res.data.result.songs
    console.log(res)
    data.searchKey = ""
  }
}

const delHistory = () => {
  localStorage.removeItem("keyWordList")
  data.keyWordList = []
}
const searchHistory = async (item) => {
  let res = await getSearchMusic(item)
  console.log(res)
  data.searchList = res.data.result.songs
}
const updateIndex = (item) => {
  musicStore.pushPlayList(item)
  musicStore.updatePlayListIndex(musicStore.getPlayList.length - 1)
}

// onMounted(() => {
//   data.keyWordList = JSON.parse(localStorage.getItem('keyWordList'))
// })
</script>

<style scoped lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999999;
    width: 90%;
    padding: .1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: .2rem;
  position: relative;

  .searchSpan {
    font-weight: 700;
  }

  .spanKey {
    padding: .1rem .2rem;
    background-color: #a4aabc;
    border-radius: .4rem;
    margin: .1rem .2rem;
    display: inline-block;
  }

  .icon {
    width: .3rem;
    height: .3rem;
    position: absolute;
    right: .2rem;
  }
}

.itemList {
  width: 100%;
  padding: .2rem;

  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;

      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }

      div {
        p {
          width: 4.54rem;
          height: .4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        span {
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }

        margin-left: 0.3rem;
      }
    }

    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;

      .icon {
        fill: #999;
      }

      .bofang {
        position: absolute;
        left: 0;
      }

      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
