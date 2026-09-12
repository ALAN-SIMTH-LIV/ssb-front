<!-- src/views/TestVerification.vue -->
<template>
    <div>
        <Verify @success="success" :mode="'pop'" :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }" ref="verify" />
        <button @click="useVerify">调用验证组件</button>
    </div>
</template>

<script>
import Verify from '@/components/verifition/Verify.vue'

export default {
    name: 'TestVerification',
    components: { Verify },
    methods: {
        success(params) {
            console.log('验证成功，返回参数：', params)
        },
        useVerify() {
            this.$refs.verify.show()
        }
    }
}
</script>
