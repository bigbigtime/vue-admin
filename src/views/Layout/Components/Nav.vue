<template>
    <div id="nav-wrap">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
            <template v-for="(item, index) in router">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{ item.meta.name }}</span>
                    </template>
                    <template v-if="item.children && item.children.length > 0">
                        <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
export default {
    name: 'LayoutNavMenu',
    setup(props, { root }){
        const router = reactive(root.$router.options.routes)
        console.log(router)
        // 挂载完成后
        onMounted(() => {
            
        })

        return {
            router
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: $navMenu;
    height: 100vh;
    background-color: #344a5f;
}
</style>