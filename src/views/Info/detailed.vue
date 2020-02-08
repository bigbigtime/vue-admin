<template>
  <el-form ref="form" :model="form" label-width="120px">

    <el-form-item label="信息分类：">
      <el-select v-model="form.categoryId">
        <el-option v-for="item in data.category" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="新闻标题：">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="缩略图：">
      <el-upload
        class="avatar-uploader"
        action="http://up-z2.qiniup.com"
        :data="data.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="发布日期：">
      <el-date-picker v-model="form.createDate" type="date" placeholder="选择日期" disabled></el-date-picker>
    </el-form-item>

    <el-form-item label="详细内容：">
      <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit" :loading="data.submitLoading">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { GetList, EdidInfo } from "@/api/news";
import { QiniuToKen } from "@/api/common";
import { timestampToTime } from "@/utils/common";
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
// 富文本编辑器
import { quillEditor } from "vue-quill-editor"; 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  name: "infoDetailed",
  components: { quillEditor },
  setup(props, { root }){
    const data = reactive({
      id: root.$route.params.id || root.$store.getters["infoDetailed/infoId"],
      category: [],
      editorOption: {},
      submitLoading: false,
      uploadKey: {
        token: "",
        key: ""
      }
    })

    const form = reactive({
      categoryId: "",
      title: "",
      createDate: "",
      content: "",
      imgUrl: ""
    })

    const handleAvatarSuccess = (res, file) => {
      form.imgUrl = `${root.$store.getters["common/qiniuUrl"]}${res.key}`
    }
      
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        root.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // 文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.uploadKey.key = key;
      return isJPG && isLt2M;
    }
 

    /**
      * 获取信息分类
      */
    const getInfoCategory = () => {
      root.$store.dispatch('common/getInfoCategory').then(response => {
        data.category = response
      })
    }

    /**
     * 获取当前ID的信息
     */
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id
      }
      GetList(requestData).then(response => {
        let responseData = response.data.data.data[0]
        form.categoryId = responseData.categoryId;
        form.title = responseData.title;
        form.createDate = timestampToTime(responseData.createDate);
        form.content = responseData.content;
        form.imgUrl = responseData.imgUrl;
      })
    }

    /**
     * 保存（修改数据时，必须注意的：一定需要一个ID）
     */
    const submit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: form.imgUrl
      }
      data.submitLoading = true
      EdidInfo(requestData).then(response => {
        let responseData = response.data
        root.$message({
          message: responseData.message,
          type: 'success'
        })
        data.submitLoading = false
      }).catch(error => {
          data.submitLoading = false
      })
    }

    /**
     * 获取七牛云token
     */
    const getQiniuToKen = () => {
      let requestData = {
        "accesskey": "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
        "secretkey": "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
        "buckety": "webjshtml"
      }
      QiniuToKen(requestData).then(response => {
        data.uploadKey.token = response.data.data.token
      })
    }

    onMounted(() => {
      getInfoCategory()
      getInfo()
      getQiniuToKen()
    })

    return {
      data, form, submit, handleAvatarSuccess, beforeAvatarUpload
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