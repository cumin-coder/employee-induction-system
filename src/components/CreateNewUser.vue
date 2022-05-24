<template>
  <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
    <el-form-item label="id">
      <el-input v-model="form.id" style="width: 220px" disabled></el-input>
    </el-form-item>

    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" style="width: 220px"></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex" text-color="#dfe4ea" fill="#2f3542">
        <el-radio-button label="male" size="large">男</el-radio-button>
        <el-radio-button label="female" size="large">女</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="出生年月" prop="birthday">
      <div class="block">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY年MM月DD日"
          placeholder="日期"
        >
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="身份证号码" prop="idCard">
      <el-input
        v-model="form.idCard"
        style="width: 220px"
        @blur="getIdCard"
      ></el-input>
    </el-form-item>

    <el-form-item label="入职时间" prop="joinDate">
      <div class="block">
        <el-date-picker
          v-model="form.joinDate"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY年MM月DD日"
          placeholder="日期"
        >
        </el-date-picker>
      </div>
    </el-form-item>

    <el-form-item label="电话号码" prop="number">
      <el-input v-model="form.number" style="width: 220px"></el-input>
    </el-form-item>

    <el-form-item label="薪资" prop="salary">
      <el-input v-model="form.salary" style="width: 220px"></el-input>
    </el-form-item>

    <el-form-item label="级别" prop="grade">
      <el-radio-group v-model="form.grade" text-color="#dfe4ea" fill="#2f3542">
        <el-radio-button label="c1" size="large">1级</el-radio-button>
        <el-radio-button label="c2" size="large">2级</el-radio-button>
        <el-radio-button label="c3" size="large">3级</el-radio-button>
        <el-radio-button label="c4" size="large">4级</el-radio-button>
        <el-radio-button label="c5" size="large">5级</el-radio-button>
        <el-radio-button label="c6" size="large">6级</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="部门" prop="department">
      <el-radio-group
        v-model="form.department"
        text-color="#dfe4ea"
        fill="#2f3542"
      >
        <el-radio-button label="客服组" size="large">客服组</el-radio-button>
        <el-radio-button label="保安组" size="large">保安组</el-radio-button>
        <el-radio-button label="工程组" size="large">工程组</el-radio-button>
        <el-radio-button label="保洁组" size="large">保洁组</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <el-button color="#2f3542" type="success" @click="submitForm()"
    >入职</el-button
  >
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import r from "../network/func";
// toolfunc.ts
import { getIdCard_Last_SIX } from "../toolfuncs";
export default {
  name: "CreateNewUser",
};
</script>



<script lang="ts" setup>
// 随机数
const codeid = Math.random() * (9 + 1) * 10000;

let random_IDcodeid = ref(codeid.toFixed(0));
const router = useRouter();
let formRef = ref(null);

type formType = {
  id: String | Number; // 数据的唯一标示
  name: String; // 员工姓名
  sex: String; // 员工姓别：男（1）,女（0）
  birthday: String; // 出生年月日
  idCard: String; // 身份证号码
  joinDate: String; // 入职时间
  number: String; // 员工电话号码
  salary: String; // 员工薪资
  grade: String; // 员工级别
  department: String; // 员工部门
};

const rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 4, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  birthday: [
    {
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  idCard: [
    { required: true, message: "请输入身份证号码", trigger: "blur" },
    {
      min: 18,
      max: 18,
      message: "中华人民共和国居民身份证是十八位数",
      trigger: "blur",
    },
  ],
  joinDate: [
    {
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  number: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
  ],
};

const form: formType = reactive({
  id: "",
  name: "cu",
  sex: "male",
  birthday: "2003年01月03日",
  idCard: "350722200301000000",
  joinDate: "2021年06年月15日",
  number: "15999890000",
  salary: "6000",
  grade: "c1",
  department: "客服组",
});

// 上传 新员工信息
const submitForm = () => {
  /**
   * @formRef对象 ： 是模板中的ref的属性值
   * @Vue3写法 ：formRef.value.validate()
   * @vue2写法 ：this.$refs[value].validate()
   */
  //@ts-ignore
  formRef.value.validate(async (valid: Boolean) => {
    if (valid) {
      // 1.调用接口
      // 2.上传至数据库
      // post 请求提交数据给后端接口
      // 后端已经处理了跨域请求，前端无需处理
      r.requestNewUserInsert(form).then(() => {
        ElNotification({
          title: "员工入职系统",
          message: "入职成功",
          type: "success",
        });
      });
      form.id = "";
      form.name = "";
      form.sex = "";
      form.birthday = "";
      form.idCard = "";
      form.joinDate = "";
      form.number = "";
      form.salary = "";
      form.grade = "";
      form.department = "";

      // 跳转到入职详情页
      router.push("/empdata");
    } else {
      return;
    }
  });
};

// 取身份证的最后6位
const getIdCard = function () {
  let lastnumber = getIdCard_Last_SIX(form.idCard);
  form.id = lastnumber;
};
</script>

<style lang="scss" scoped>
.el-button {
  width: 1.5rem;
  height: 0.4rem;
  font-weight: $cumin-fontWeightBold;
  color: $cumin-Size-Color;
}
</style>