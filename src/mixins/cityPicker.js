import { GetCityPicker } from "@/api/common"
import { reactive, toRefs } from '@vue/composition-api'
export function cityPicker(){

    const data = reactive({
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: "",
        provinceData: [],
        cityData: [],
        areaData: [],
        streetData: []
    })

    const resultData = reactive({
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: "",
    })
    /**
     * 获取省份
     */
    const getProvince = () => {
        getData({ type: "province" });
    }
    /**
     * 选择省份，获取城市
     */
    const handlerProvince = (val) => {
        resetValue({type: "city"})
        getData({ type: "city", province_code: val });
    }
    /**
     * 选择城市，获取区县
     */
    const handlerCity = (val) => {
        resetValue({type: "area"});
        getData({ type: "area", city_code: val });
    }
    /**
     * 选择区县，获取街道
     */
    const handlerArea = (val) => {
        resetValue({type: "street"});
        getData({ type: "street", area_code: val });
    }
    /**
     * 选择街道
     */
    const handlerStreet = (val) => {
        resetValue({type: ""})
    }
    /**
     * 获取数据
     */
    const getData = (requestData) => {
        GetCityPicker(requestData).then(response => {
            data[`${requestData.type}Data`] = response.data.data.data
        })
    }
    /**
     * 重置选项
     */
    const resetValue = (params) => {
        const valueJson = {
            city: ['cityValue', 'areaValue', 'streetValue'],
            area: ['areaValue', 'streetValue'],
            street: ['streetValue']
        }
        const arrObj = valueJson[params.type];
        // 清空指定的key值
        if(arrObj) { arrObj.forEach(item => data[item] = '') }
        // 数据集合处理
        result()
    }

    /**
     * 返回数据集合
     */
    const result = () => {
        for(let key in resultData)(
            resultData[key] = data[key]
        )
    }
    return {
        data,
        resultData,
        // ...toRefs(data),   // 把对象类型转为基础数据类型，可进行解构响应
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea,
        handlerStreet
    }
}