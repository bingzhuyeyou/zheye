<template>
  <div class="validate-input-container pb-3">
    <input
      v-model="inputRef.val"
      v-bind="$attrs"
      type="email"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed, onUnmounted } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean
}
export type RulesProp = RuleProp[]

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    rules: {
      type: Array as PropType<RulesProp>,
      required: true
    },
    modelValue: String
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: computed({
        get() {
          return props.modelValue || ''
        },
        set(newVal) {
          context.emit('update:modelValue', newVal)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = (): boolean => {
      const allPassed = props.rules.every((rule) => {
        const val = typeof inputRef.val === 'string' ? inputRef.val : ''
        let passed = true
        switch (rule.type) {
          case 'required':
            passed = (val.trim() !== '')
            break
          case 'email':
            passed = emailReg.test(val)
            break
          case 'custom':
            passed = rule.validator ? rule.validator() : true
            break
          default:
            break
        }
        inputRef.message = rule.message
        return passed
      })
      inputRef.error = !allPassed
      return allPassed
    }
    const initInputData = () => {
      inputRef.val = ''
      inputRef.error = false
      inputRef.message = ''
    }
    emitter.on('form-item-init', initInputData)
    onMounted(() => {
      emitter.emit('form-item-validate', validateInput)
    })
    onUnmounted(() => {
      emitter.off('form-item-init', initInputData)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>
</style>
