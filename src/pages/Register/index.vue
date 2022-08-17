<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 
          <router-link to="/Login">登录</router-link> 
        </span>
      </h3>
      <!-- 表单验证 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="手机号码"
          prop="phone"
          style="width: 400px; margin: 0 auto; float: none"
        >
          <el-input
            type="text"
            v-model="ruleForm.phone"
            autocomplete="off"
            :rules="[
              { required: true, message: '账号不能为空' },
              { type: 'number', message: '手机号码必须为数字值' },
            ]"
          ></el-input>
        </el-form-item>
        <el-form-item
          
          label="验证码"
          style="width: 400px; margin: 0 auto"
          prop="code"
          rules="{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="ruleForm.code"></el-input
          ><el-button @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
          style="width: 400px; margin: 0 auto"
        >
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
          style="width: 400px; margin: 0 auto"
        >
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >完成注册</el-button
          >
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="content">
        <label for="p">手机号:</label>
        <input
          id="p"
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          style="width: 170px"
          type="text"
          placeholder="请输入验证码"
          v-model="code"
        />
        <button style="width: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password"/>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password1"/>
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <!-- <div class="controls">
        <input name="m1" type="checkbox" :checked="arrge" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div> -->
      <!-- <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div> -->
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        phone: "",
        code: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
    // return {
    //   //手机号
    //   phone: "",
    //   //验证码
    //   code: "",
    //   //密码
    //   password: "",
    //   //验证密码
    //   password1: "",
    //   //同意条款
    //   arrge: true,
  },
  methods: {
    submitForm(formName) {
      const { phone, code, pass } = this.ruleForm;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          alert("注册成功");
          await this.$store.dispatch("getUserRegister", {
            phone,
            code,
            pass,
          });
          this.$router.push("/Login");
        } else {
          console.log("注册失败");
          return false;
        }
      });
    },

    async getCode() {
      try {
        const { phone } = this.ruleForm;
        phone && (await this.$store.dispatch("getCode", phone));
        this.ruleForm.code = this.$store.state.user.code;
      } catch (error) {
        alert(error.message);
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    // .content {
    //   margin-bottom: 18px;

    //   position: relative;

    //   label {
    //     font-size: 14px;
    //     width: 96px;
    //     margin-left: -40px;
    //     display: inline-block;
    //   }

    //   input {
    //     width: 270px;
    //     height: 38px;
    //     padding-left: 8px;
    //     box-sizing: border-box;
    //     margin-left: 5px;
    //     outline: none;
    //     border: 1px solid #999;
    //   }

    //   .error-msg {
    //     position: absolute;
    //     top: 100%;
    //     left: 495px;
    //     color: red;
    //   }
    // }

    // .controls {
    //   text-align: center;
    //   position: relative;

    //   input {
    //     vertical-align: middle;
    //     margin-left: 61px;
    //   }

    //   .error-msg {
    //     position: absolute;
    //     top: 100%;
    //     left: 495px;
    //     color: red;
    //   }
    // }

    // .btn {
    //   text-align: center;
    //   line-height: 36px;
    //   margin: 30px 0 0 55px;

    //   button {
    //     outline: none;
    //     width: 270px;
    //     height: 36px;
    //     background: #e1251b;
    //     color: #fff !important;
    //     display: inline-block;
    //     font-size: 16px;
    //   }
    // }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>