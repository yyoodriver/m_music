import service from '../index.js'


// 获取歌单详情页的数据
export const getMusicItemList = (data) => {
    return service({
        method: "GET",
        url: `/playlist/detail?id=${data}`
    })
}
// 获取歌单所有歌曲
export const getItemList = (data) => {
    return service({
        method: "GET",
        url: `/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}
// 获取歌曲的歌词
export const getMusicLyric = (data) => {
    return service({
        method: "GET",
        url: `/lyric?id=${data}`
    })
}
