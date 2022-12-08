import service from '../index.js'

// 获取首页轮播图的数据
export const getBanner = () => {
    return service({
        method: "GET",
        url: "/banner?type=2"
    })
}

// 获取发现好歌单
export const getMusicList = () => {
    return service({
        method: "GET",
        url: "/personalized?limit=10"
    })
}
