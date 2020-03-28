<template>
    <div class="overflow-h">
        <el-row :gutter="10">
            <el-col :span="6" v-if="init.province">
                <el-select v-model="data.provinceValue" @change="handlerProvince">
                    <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.city">
                <el-select v-model="data.cityValue" @change="handlerCity">
                    <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.area">
                <el-select v-model="data.areaValue" @change="handlerArea">
                    <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.street">
                <el-select v-model="data.streetValue" @change="handlerStreet">
                    <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { cityPicker } from "@/mixins/cityPicker"
import { watch, onBeforeMount, reactive } from '@vue/composition-api'
export default {
    name: "cityPicker",
    props: {
        cityPickerLevel: {
            type: Array,
            default: () => []
        },
        cityPickerData: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { emit }){
        // 初始化省市区街联动
        const init = reactive({
            province: false,
            city: false,
            area: false,
            street: false,
        })
        // 线件方法
        const { getProvince,  handlerProvince, handlerCity, handlerArea, handlerStreet, data, resultData } = cityPicker();
        /**
         * 初始化
         */
        const initCieyPicker = () => {
            let initData = props.cityPickerLevel
            if(initData.length == 0) {
                for(let key in init) {
                    init[key] = true
                }
            }else{
                initData.forEach(item => {
                    init[item] = true
                });
            }
        }
        /**
         * 
         */
        watch([
            () => resultData.provinceValue,
            () => resultData.cityValue,
            () => resultData.areaValue,
            () => resultData.streetValue,
        ], ([province, city, area, street]) => {
            emit("update:cityPickerData", resultData)
        })



        onBeforeMount(() => {
            // 初始化
            initCieyPicker()
            // 获取省份
            getProvince()
        })

        return {
            init,
            data,
            handlerProvince,
            handlerCity,
            handlerArea,
            handlerStreet
        }
    }
}
</script>
<style lang="scss" scoped>

</style>