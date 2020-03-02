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
            if(responseData && responseData.length > 0) {
                tableData.item = responseData;
                tableData.total = response.data.data.total
            }
        }).catch(error => {})
    }

    return {
        tableData, tableLoadData
    }
}

/**
 * 说明业务逻辑是什么
 */