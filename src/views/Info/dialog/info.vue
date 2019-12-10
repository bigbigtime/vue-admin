<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px">
        <el-form :model="form">
            <el-form-item label="类别：" :label-width="formLabelWidth">
                <el-select v-model="form.category" placeholder="请选择活动区域">
                    <el-option label="区域一" value="11"></el-option>
                    <el-option label="区域二" value="22"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题：" :label-width="formLabelWidth">
                <el-input v-model="form.title" placehoder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况：" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content" placehoder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { reactive, ref, watch } from '@vue/composition-api';
export default {
    name: 'dialogInfo',
    props: {
        flag: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }){
        const dialog_info_flag = ref(false);
        const formLabelWidth = ref('70px');
        const form = reactive({
            category: '',
            title: '',
            content: ''
        })
        // watch
        watch(() => dialog_info_flag.value = props.flag)
        /**
         * vue2.0 methods
         */
        const close = () => {
            dialog_info_flag.value = false;
            emit("update:flag", false);
        }
        return {
            // ref
            dialog_info_flag, formLabelWidth,
            // reactive
            form, 
            // methods
            close, submit
        }
    }
}
</script>
<style scoped>

</style>