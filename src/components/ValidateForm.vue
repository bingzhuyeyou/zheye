<template>
  <form @submit.prevent="submitForm">
    <slot></slot>
    <slot name="submit">
      <button type="submit" class="btn btn-primary">Submit</button>
    </slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type validateFunc = () => boolean

type Events = {
  'form-item-validate': validateFunc;
  'form-item-init'?: () => void;
}
export const emitter = mitt<Events>()

export interface PublicMethod {
  clearValidate: () => void
}

export default defineComponent({
  emits: ['form-submit'],
  setup(props, context) {
    let funcArr: validateFunc[] = []
    const submitForm = () => {
      const bool = funcArr.map((func) => func()).every(bool => bool)
      context.emit('form-submit', bool)
    }
    const callback = (func: validateFunc) => {
      funcArr.push(func)
    }
    emitter.on('form-item-validate', callback)
    onUnmounted(() => {
      emitter.off('form-item-validate', callback)
      funcArr = []
    })
    const clearValidate = () => {
      emitter.emit('form-item-init')
    }
    return {
      submitForm,
      clearValidate
    }
  }
})
</script>

<style scoped>
</style>
