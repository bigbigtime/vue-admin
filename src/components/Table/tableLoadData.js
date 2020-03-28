import { reactive } from '@vue/composition-api';
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
export function loadData(){

    const tableData = reactive({
        item: [],
        total: 0
    });

    const tableLoadData = (params) => {
        
        let requestJson = params
        let requestData = {
            url: requestUrl[requestJson.url],
            method: requestJson.method,
            data: requestJson.data
        }
        loadTableData(requestData).then(response => {
            let responseData = response.data.data.data;
            // 后台返回数据时，并不是返回一个数组，有时返回一个null，统一返回的是数组，无论是否空 array
            tableData.item = responseData;
            tableData.total = responseData.length === 0 ? 0 : response.data.data.total
        }).catch(error => {})
    }

    return {
        tableData, tableLoadData
    }
}

/**
 * 说明业务逻辑是什么
 */