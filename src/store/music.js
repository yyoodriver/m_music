import {defineStore} from "pinia";

export const useMusic = defineStore('music', {
    state: () => ({
        playList: [{// 播放列表
            al: {
                id: 2285010,
                name: "世界",
                pic: 109951168111472450,
                picUrl: "https://p2.music.126.net/625-tE8OzdM-rWO37PgqlQ==/109951168111472442.jpg",
                pic_str: "109951168111472442",
            },
            id: 25706282,
            name: "夜空中最亮的星",
            ar: [{
                name: "逃跑计划"
            }]
        }],
        playListIndex: 0, // 默认下标为0
        isBtnShow: true, // 暂停按钮显示
        detailShow: false, // 歌曲详情页显示
        lyricList: {}, //歌词
        currentTime: 0, // 当前时间
        duration: 0, // 总时间
        isLogin: false //判断是否登录
    }),
    getters: {
        getPlayList(state) {
            return state.playList
        },
        getBtnShow(state) {
            return state.isBtnShow
        },
        getPlayListIndex(state) {
            return state.playListIndex
        },
        getDetailShow(state) {
            return state.detailShow
        },
        getLyricList(state) {
            return state.lyricList
        },
        getCurrentTime(state) {
            return state.currentTime
        },
        getDurationTime(state) {
            return state.duration
        },
        getIsLogin(state){
            return state.isLogin
        }

    },
    actions: {
        updateIsBtnShow(value) {
            this.isBtnShow = value
        },
        updatePlayList(value) {
            this.playList = value
            console.log(this.playList)
        },
        updatePlayListIndex(value) {
            this.playListIndex = value
        },
        updateDetailShow() {
            this.detailShow = !this.detailShow
        },
        updateLyricList(value) {
            this.lyricList = value
        },
        updateCurrentTime(value) {
            this.currentTime = value
        },
        updateDurationTime(value) {
            this.duration = value
        },
        pushPlayList(value) {
            this.playList.push(value)
        }
    }

})
