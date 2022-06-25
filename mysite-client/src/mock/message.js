/**
 * mock 拦截请求留言板的数据，并返回一些模拟数据
 */
import Mock from 'mockjs'
import qs from "qs"
Mock.mock(/^\/api\/message\/?(\?.+)?$/, 'get', function (option) { // 返回的是一个回掉函数
    const query = qs.parse(option.url);
    return Mock.mock({
        code: 0,
        msg: '',
        data: {
            total: 52,
            [`rows|${query.limit || 10}`]: [{
                id: "@guid",
                nickName: "@cname",
                content: "@cparagraph(1,10)",
                createDate: Date.now(),
                "avatar|1": [
                    "https://avatars.devrant.com/v-37_c-3_b-5_g-m_9-1_1-2_16-3_3-2_8-1_7-1_5-1_12-2_6-2_10-1_2-10_22-1_15-3_4-1.jpg",
                    "https://avatars.devrant.com/v-37_c-3_b-1_g-m_9-2_1-1_16-9_3-6_8-4_7-4_5-4_12-1_6-7_10-5_2-59_22-1_11-2_18-4_19-3_4-4_20-13_21-5.jpg",
                    "https://avatars.devrant.com/v-37_c-3_b-6_g-m_9-1_1-1_16-6_3-6_8-2_7-2_5-1_12-1_6-1_10-3_2-14_22-8_18-2_19-2_4-1_20-1.jpg",
                    "https://avatars.devrant.com/v-37_c-3_b-4_g-m_9-1_1-2_16-12_3-1_8-1_7-1_5-1_12-2_6-15_2-20_22-7_15-10_4-1.jpg",
                    "https://avatars.devrant.com/v-37_c-3_b-7_g-m_9-1_1-7_16-1_3-1_8-1_7-1_5-1_12-7_6-10_2-31_22-6_15-3_18-1_19-1_4-1.jpg",
                    "https://avatars.devrant.com/v-37_c-3_b-1_g-m_9-1_1-6_16-1_3-1_8-1_7-1_5-1_12-6_6-10_10-1_2-3_22-6_19-1_4-1.jpg"
                ]
            }]
        }
    })

})

Mock.mock('/api/message', 'post', {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickName: "@cname",
        content: "@cparagraph(1,10)",
        createDate: Date.now(),
        "avatar|1": [
            "https://avatars.devrant.com/v-37_c-3_b-5_g-m_9-1_1-2_16-3_3-2_8-1_7-1_5-1_12-2_6-2_10-1_2-10_22-1_15-3_4-1.jpg",
            "https://avatars.devrant.com/v-37_c-3_b-1_g-m_9-2_1-1_16-9_3-6_8-4_7-4_5-4_12-1_6-7_10-5_2-59_22-1_11-2_18-4_19-3_4-4_20-13_21-5.jpg",
            "https://avatars.devrant.com/v-37_c-3_b-6_g-m_9-1_1-1_16-6_3-6_8-2_7-2_5-1_12-1_6-1_10-3_2-14_22-8_18-2_19-2_4-1_20-1.jpg",
            "https://avatars.devrant.com/v-37_c-3_b-4_g-m_9-1_1-2_16-12_3-1_8-1_7-1_5-1_12-2_6-15_2-20_22-7_15-10_4-1.jpg",
            "https://avatars.devrant.com/v-37_c-3_b-7_g-m_9-1_1-7_16-1_3-1_8-1_7-1_5-1_12-7_6-10_2-31_22-6_15-3_18-1_19-1_4-1.jpg",
            "https://avatars.devrant.com/v-37_c-3_b-1_g-m_9-1_1-6_16-1_3-1_8-1_7-1_5-1_12-6_6-10_10-1_2-3_22-6_19-1_4-1.jpg"
        ]
    }
})