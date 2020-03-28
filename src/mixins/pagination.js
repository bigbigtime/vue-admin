let pagination = {
    data(){
        return {
            currentPage: 1,
            pageSize: 2,
            total: 0,
            pageSizes: [2, 20, 50, 100]
        }
    },
    created(){

    },
    mounted(){},
    methods: {
        handleSizeChange(val){
            this.tableConfig.requestData.data.pageSize = val
            this.tableLoadData()
        },
        handleCurrentChange(val){
            this.tableConfig.requestData.data.pageNumber = val
            this.tableLoadData()
        }
    }
}
export default pagination;