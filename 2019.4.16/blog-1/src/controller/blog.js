const getList = (author, keyword) => {
    //先返回假数据

    return [{
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'jizou'
    },
    {
        id: 2,
        title: '标题B',
        content: '内容B',
        createTime: 1586610491112,
        author: 'fengfeng'
    }, {
        id: 3,
        title: '标题C',
        content: '内容C',
        createTime: 1586690491112,
        author: 'xinyu'
    }]
}

const getDetail = (id)=>{

    //先返回假數據
    return [{
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'jizou'
    }]
}
module.exports = {
    getList,
    getDetail
}