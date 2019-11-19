import { binding, onMounted, onUnmounted } from "vue";
export const useMouse = () => {
  const x = binding(0)
  const y = binding(0)
  const update = e => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return { x, y }
}