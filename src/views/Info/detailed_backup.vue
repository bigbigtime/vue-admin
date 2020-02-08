<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="信息分类：">
                <el-select v-model="form.category">
                    <el-option v-for="item in data.category" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：">
                <el-upload
                    class="avatar-uploader"
                    action="http://up-z2.qiniup.com"
                    :data="data.uploadImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="发布日期：">
                <el-date-picker v-model="form.datatime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="详细内容：">
               <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption"/>
            </el-form-item>
          
            <el-form-item>
                <el-button type="primary">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { GetList } from "@/api/news";
import { UploadImgToken } from "@/api/common";
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import { timestampToTime } from "@/utils/common";
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    name: "infoDetailed",
    components: { quillEditor },
    setup(props, { root }){
        /**
         * 这里的代码又执行了一次
         */
        const data = reactive({
            id: root.$route.params.id || root.$store.getters["infoDetailed/infoId"],
            title: root.$route.params.title || root.$store.getters["infoDetailed/infoTitle"],
            category: [],
            editorOption: {},
            uploadImg: {
                tokey: "",
                key: ""
            }
        })

        const form = reactive({
            category: "",
            title: "",
            imageUrl: "",
            datatime: "",
            content: null,
            
        })
        /**
         * 缩略图
         */
        const handleAvatarSuccess = (res, file) => {
            console.log(res)
            form.imageUrl = `http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/${res.key}`;
        }

        // https://www.jianshu.com/p/fd3168881247

        const beforeAvatarUpload = (file) => {
            
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                root.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                root.$message.error('上传头像图片大小不能超过 2MB!');
            }
            let suffix = file.name
            let key = encodeURI(`${suffix}`)
            data.uploadImg.key = key
            return isJPG && isLt2M;
        }

        /**
         * 分类请求
         */
        const getInfoCategory = () => {
            root.$store.dispatch('common/getInfoCategory').then(response => {
                data.category = response
            })
        }
        /**
         * 当前ID请求数据
         */
        const getInfo = () => {
            let requestData = {
                pageNumber: 1,
                pageSize: 1,
                id: data.id
            }
            GetList(requestData).then(response => {
                let responseData = response.data.data.data[0]
                form.category = responseData.categoryId
                form.title = responseData.title
                form.content = responseData.content
                form.datatime = timestampToTime(responseData.createDate)
            })
        }
        /**
         * 
         */
        const getUploadImgToken = () => {
            UploadImgToken().then(response => {
                data.uploadImg.token = response.data.data.token
            })
        }

        onMounted(() =>{
            getInfoCategory();
            getInfo();
            getUploadImgToken()
        }) 
        return {
            data, form,
            handleAvatarSuccess, beforeAvatarUpload
        }
    }    
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>