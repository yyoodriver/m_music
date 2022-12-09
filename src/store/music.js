import {defineStore} from "pinia";

export const useMusic = defineStore('music', {
    state: () => {
        return {
            playList: [{// 播放列表
                al: {
                    id: 96880875,
                    name: "Lonely",
                    pic: 109951165393210180,
                    picUrl: "https://p1.music.126.net/2ztAT9l4eOZeEUfcsqmBkA==/109951165393210183.jpg",
                    pic_str: "109951165393210183",
                },
                id: 1487478840
            }],
            playListIndex: 0, // 默认下标为0
        }
    },
    getters: {},
    actions: {}

})
