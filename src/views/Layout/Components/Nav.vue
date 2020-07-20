<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
        <el-menu 
          :default-active="defalutActive" 
          class="el-menu-vertical-demo" 
          :collapse="isCollapse" 
          background-color="transparent" 
          text-color="#fff" 
          active-text-color	="#fff"
          router>
          <template v-for="(item, index) in routers">
            <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
              <!-- 一级菜单 -->
              <template slot="title">
                <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                <span slot="title">{{ item.meta.name }}</span>
              </template>
              <!-- 子级菜单 -->
              <template v-for="subItem in item.children">
                <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path" >
                  {{ subItem.meta.name }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
        
    </div>
</template>
<script>
import { reactive, computed } from '@vue/composition-api';
export default {
  // compiler
    name: 'navMenu',
    setup(props, { root }){
      /**
       * data 数据
       */
      const routers = reactive(root.$router.options.routes);
      /**
       * 监听路由变化
       */
      const defalutActive = computed(() => {
        const route = root.$route;
        const { path } = route;
        return path;
      })
      /**
       * computed 监听
       */
      const isCollapse = computed(() => root.$store.state.app.isCollapse);
      return {
        isCollapse,
        routers,
        defalutActive
      }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.logo {
  text-align: center;
  img { 
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all .3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all .3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap { width: $navMenu; }
}
.close {
  #nav-wrap { width: $navMenuMin; }
  .logo img { width: 60%; }
}
</style>