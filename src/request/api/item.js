import service from '../index.js'


// 获取歌单详情页的数据
export const getMusicItemList = (data) => {
    return service({
        method: "GET",
        url: `/playlist/detail?id=${data}`
    })
}
