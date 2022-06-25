import Mock from 'mockjs';
// 利用 mock 模拟 getBanner 请求服务器返回的数据
Mock.mock("/api/banner", "get", {
    code: 0,
    msg: "",
    data: [{
            id: '1',
            midImg: 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720__480.jpg',
            bigImg: 'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg',
            title: '凛冬将至',
            description: '人唯有恐惧的时候方能勇敢'
        },
        {
            id: '2',
            midImg: 'https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536__340.jpg',
            bigImg: 'https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg',
            title: '如果画面可以定格',
            description: '那最好一直停留在我们初次相见的场景'
        },
        {
            id: '3',
            midImg: 'https://cdn.pixabay.com/photo/2015/09/09/19/56/office-932926__340.jpg',
            bigImg: 'https://cdn.pixabay.com/photo/2015/09/09/19/56/office-932926_960_720.jpg',
            title: '说点啥呢',
            description: '想不出来了'
        },
        {
            id: '4',
            midImg: 'https://cdn.pixabay.com/photo/2020/04/02/22/05/home-office-4996834__340.jpg',
            bigImg: 'https://cdn.pixabay.com/photo/2020/04/02/22/05/home-office-4996834_960_720.jpg',
            title: '成功',
            description: '我不甘死在平庸里'
        },
    ]
})