/**
 * mixins 为混合公共代码 ，抽离一些重复高的代码出来, 混合的好处是避免重复代码
 * 该文件为配置 获取数据 fetch 的一些公共配置
 */

export default function (defaultDataValue = null) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDataValue,
            }
        },
        //hook 函数， 和 vue 组件生命周期有关，在创建了组件实例以后会自动运行
        async created() {
            this.data = await this.fetchData();
            // 获取到数据以后不显示正在加载中了
            this.isLoading = false;
        }
    }
}