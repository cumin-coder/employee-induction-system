<template>
  <!-- Form -->
  <el-button type="text" @click="dialogFormVisible = true"
    >open a Form nested Dialog</el-button
  >
  <el-dialog v-model="dialogFormVisible" title="修改信息">
    <el-form ref="formRef" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" style="width: 220px"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="male" size="large">男</el-radio>
          <el-radio label="female" size="large">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="出生年月">
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

      <el-form-item label="身份证号码">
        <el-input v-model="form.idCard" style="width: 220px"></el-input>
      </el-form-item>

      <el-form-item label="入职时间">
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

      <el-form-item label="电话号码">
        <el-input v-model="form.number" style="width: 220px"></el-input>
      </el-form-item>

      <el-form-item label="薪资">
        <el-input v-model="form.salary" style="width: 220px"></el-input>
      </el-form-item>

      <el-form-item label="职位">
        <el-radio-group v-model="form.department">
          <el-radio label="c1" size="large">1级</el-radio>
          <el-radio label="c2" size="large">2级</el-radio>
          <el-radio label="c3" size="large">3级</el-radio>
          <el-radio label="c4" size="large">4级</el-radio>
          <el-radio label="c5" size="large">5级</el-radio>
          <el-radio label="c6" size="large">6级</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { reactive, ref } from "vue";
export default {
  name: "DialogEditInfo",
};
</script>
<script lang="ts" setup>
function onCancel() {
  dialogFormVisible.value = false;
}
const dialogFormVisible = ref(false);
const form = reactive({
  name: "",
  sex: "male",
  birthday: "",
  idCard: "",
  joinDate: "",
  number: "",
  salary: "",
  department: "",
});
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>