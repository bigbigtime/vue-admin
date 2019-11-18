<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api';
export default {
    name: "svgIcon",
    // props: ['iconClass', 'className'],
    props: {
        // 分页
        iconClass: {
            type: String,  // 定义接收的值类型
            default: ''
        },
        className : {
            type: String,
            default: ''
        }
    },
    setup(props){
        const msg = ref("手把手撸码的说法的前端");
        const number = ref(1);

        // 计算属性，得出最终结果，并返回
        const iconName = computed(() => `#icon-${props.iconClass}`)

        const svgClass = computed(() => {
            if(props.className) {
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
        })

        return {
            msg,
            iconName,
            svgClass
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>