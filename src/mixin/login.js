import { reactive, ref, isRef, toRefs, onMounted, watch } from '@vue/composition-api';
let LoginMixin = {
    setup(props, { root }){
        const aaaa = () => {
            console.log(11111)
        }

        console.log(333)

        const abc =  ref('111')

        

        onMounted(() => {

        })

        
    }
 };
 export default LoginMixin;