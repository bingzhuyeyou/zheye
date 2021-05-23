import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>): Ref<boolean> => {
  const isClickOutside = ref(false)
  const handle = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handle)
  })
  onUnmounted(() => {
    document.addEventListener('click', handle)
  })
  return isClickOutside
}

export default useClickOutside
