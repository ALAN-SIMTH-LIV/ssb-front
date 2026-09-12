<template>
    <div>
        <div class="phone-input">
            <input v-model="phone" type="text" placeholder="请输入手机号码" @input="validatePhone" />
            <span v-if="phoneError" class="error">{{ phoneError }}</span>
        </div>
        <Verify @success="success" :mode="'pop'" :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }" ref="verify" />
    </div>
</template>

<script>
import Verify from "@/components/verifition/Verify.vue";
import request from "@/components/verifition/utils/axios";

export default {
    name: "App",
    components: {
        Verify,
    },
    data() {
        return {
            phone: "",
            phoneError: "",
        };
    },
    mounted() {
        // 显示验证弹窗
        this.$refs.verify.show();
    },
    methods: {
        validatePhone() {
            // 基本的手机号码验证（示例：10-12位数字）
            const phoneRegex = /^\d{10,12}$/;
            this.phoneError = phoneRegex.test(this.phone)
                ? ""
                : "请输入有效的手机号码（10-12位数字）";
        },
        success(params) {
            // 构建 SmsRequest 数据
            const smsRequest = {
                // phone: this.phone, // 来自用户输入,这里只做二次验证的演示,因此不传入phone参数
                captchaVerification: params.captchaVerification, // 来自 Verify 组件
            };

            debugger
            // 发送请求到后端
            request({
                url: "/sendLoginCode",
                method: "post",
                data: smsRequest,
            })
                .then((response) => {
                    console.log("短信请求成功：", response.data);
                    // 跳转到登录页面
                    this.$router.push("/login");
                })
                .catch((error) => {
                    console.error("短信请求失败：", error);
                    alert("发送验证码失败，请重试。");
                });
        },
    },
};
</script>

<style scoped>
.phone-input {
    margin-bottom: 20px;
}

input {
    padding: 10px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}
</style>
