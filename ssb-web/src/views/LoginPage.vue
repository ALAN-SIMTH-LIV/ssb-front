<template>
    <div class="login-container">
        <h2>登录</h2>
        <div class="input-group">
            <input type="tel" v-model="phoneNumber" placeholder="请输入手机号" @input="validatePhone" />
            <span v-if="phoneError" class="error-message">{{ phoneError }}</span>
        </div>
        <div class="captcha-group">
            <input type="text" v-model="captcha" placeholder="请输入验证码" />
            <button @click="goToSlider" class="captcha-btn" :disabled="!!phoneError">获取验证码</button>
        </div>
        <button @click="login" class="login-btn">登录</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const phoneNumber = ref('');
const captcha = ref('');
const phoneError = ref('');
const router = useRouter();

const validatePhone = () => {
    const phoneRegex = /^\d{11}$/;
    if (!phoneNumber.value) {
        phoneError.value = '手机号不能为空';
    } else if (!phoneRegex.test(phoneNumber.value)) {
        phoneError.value = '请输入有效的11位手机号';
    } else {
        phoneError.value = '';
    }
};

const goToSlider = () => {
    if (!phoneError.value) {
        console.log('跳转到滑块验证页面:', phoneNumber.value)
        router.push({ path: '/slider', query: { phone: phoneNumber.value } });
    } else {
        console.log('手机号格式错误，未跳转:', phoneError.value);
    }
};

const login = () => {
    if (!phoneNumber.value || !captcha.value || phoneError.value) {
        alert('请填写正确的手机号和验证码！');
        return;
    }
    console.log('登录中...', {
        phoneNumber: phoneNumber.value,
        captcha: captcha.value
    });
};
</script>

<style scoped>
/* 保持原有样式不变 */
.login-container {
    width: 300px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h2 {
    color: #333;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
    position: relative;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
}

.captcha-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.captcha-group input {
    flex: 1;
    margin-right: 10px;
}

.captcha-btn {
    padding: 10px 20px;
    background-color: #ff8c00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.captcha-btn:hover {
    background-color: #e07b00;
}

.captcha-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.login-btn {
    width: 100%;
    padding: 10px;
    background-color: #ff8c00;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #e07b00;
}

.error-message {
    color: #ff0000;
    font-size: 12px;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 5px;
}
</style>
