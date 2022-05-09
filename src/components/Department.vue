<template>
  <!-- 搜索框 -->
  <div class="search-container" v-if="props.isShowSearch">
    <div class="input-item">
      <input
        v-model="search"
        type="text"
        placeholder="请输入员工姓名 . . ."
        class="input"
      />
      <div class="input-btn">搜索</div>
    </div>
  </div>
  <el-table :data="filterTableData" border height="500px">
    <el-table-column label="员工 ID" prop="id" />
    <el-table-column label="姓名" prop="name" />
    <el-table-column label="性别" prop="sex" />
    <el-table-column label="出生年月" prop="birthday" />
    <el-table-column label="身份证号码" prop="idCard" />
    <el-table-column label="入职时间" prop="joinDate" />
    <el-table-column label="电话号码" prop="number" />
    <el-table-column label="目前薪资" prop="salary" />
    <el-table-column label="级别" prop="grade">
      <template #default="scope">
        <el-tag disable-transitions effect="dark" color="#95d475">{{
          scope.row.grade
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="部门" prop="department">
      <template #default="scope">
        <el-tag disable-transitions effect="dark">{{
          scope.row.department
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button
          class="search_input_edit"
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button
          class="search_input_delete"
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="paging" v-if="props.isShowSearch">
    <el-pagination
      popper-class="cumin"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
      :page-size="tableData.pageSize"
      :page-sizes="tableData.pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

  <!----Dialog对话框 ---->
  <el-dialog v-model="dialogFormVisible" title="正 在 修 改 信 息">
    <el-form ref="formRef" :model="form" label-width="120px">
      <el-form-item label="id">
        <el-input v-model="form.id" style="width: 220px" disabled></el-input>
      </el-form-item>
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
        <el-input
          v-model="form.idCard"
          @blur="getIdCard"
          style="width: 220px"
        ></el-input>
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

      <el-form-item label="级别">
        <el-radio-group v-model="form.grade">
          <el-radio label="c1" size="large">1级</el-radio>
          <el-radio label="c2" size="large">2级</el-radio>
          <el-radio label="c3" size="large">3级</el-radio>
          <el-radio label="c4" size="large">4级</el-radio>
          <el-radio label="c5" size="large">5级</el-radio>
          <el-radio label="c6" size="large">6级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部门">
        <el-radio-group v-model="form.department">
          <el-radio label="客服组" size="large">客服组</el-radio>
          <el-radio label="保安组" size="large">保安组</el-radio>
          <el-radio label="工程组" size="large">工程组</el-radio>
          <el-radio label="保洁组" size="large">保洁组</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ref, computed, reactive, defineProps } from "vue";
import { ElNotification } from "element-plus";
import r from "../network/func";
import { useRouter } from "vue-router";
// toolfunc.ts

import { getIdCard_Last_SIX } from "../toolfuncs";
export default {
  name: "Department",
};
</script>

<script lang="ts" setup>
const props = defineProps({
  NAME: Object,
  // 如果不传这个参数的话，默认组件中是不显示 《搜索框》 的
  isShowSearch: {
    type: Boolean,
    default: false,
  },
});
interface User {
  id: String; // 数据的唯一标示
  name: String; // 员工姓名
  sex: String; // 员工姓别：男（1）,女（0）
  birthday: String; // 出生年月日
  idCard: String; // 身份证号码
  joinDate: String; // 入职时间
  number: String; // 员工电话号码
  salary: String; // 员工薪资
  grade: String; // 员工级别
  department: String; // 员工部门
}

let tableData = reactive({
  qi: [], // 全部数据的集合数组
  total: 0, // 总分页条目数
  pageNum: 1, // 当前的页码
  pageSize: 5, // 每页显示条目个数
  pageSizes: [5, 10, 15, 20, 30],
  navigateFirstPage: 1, // 上一页
  navigateLastPage: 3, // 下一页
  lastPage: false, // 是最后一页？
  firstPage: false, // 是第一页？
  hasNextPage: true, // 有下一页？
  hasPreviousPage: true, // 有上一页？
});
const search = ref("");
const dialogFormVisible = ref(false);
const form = reactive({
  id: "",
  name: "",
  sex: "",
  birthday: "",
  idCard: "",
  joinDate: "",
  number: "",
  salary: "",
  grade: "",
  department: "",
});

const router = useRouter();
/**
 * ---------------------------------------------------------------------------------------------
 */

// 分页下拉框内容发生改变
const handleSizeChange = (val: number) => {
  tableData.pageSize = val;
  gq();
};

/**
 * @val 当前在第几页
 */
const handleCurrentChange = (val: number) => {
  let index = (val - 1) * tableData.pageSize;
  r.requestGetPaing(index, tableData.pageSize).then((res) => {
    tableData.qi = res.data;
  });
};

//搜索框改变时触发
const searchInput = async function (name: String) {
  // 调用查找接口，获取数据
  const { data } = await r.requestSearchUser(name);
  tableData.qi = data.msg;
  // 当数据是空的时候
  if (!tableData.qi.length) {
    gq();
  }
};

/**
 * @gq 获取指定部门人员信息 || 获取所有部门人员信息
 * @g getSecurity()
 * @q qi_requestQueryinfo()
 */
function gq() {
  /**
   * 说明：如果不是 '/empdata' 路径的话就执行getSecurity函数，此函数的意思是：获取指定部门人员信息
   */
  if (router.currentRoute.value.path !== "/empdata") {
    //获取指定部门人员信息
    r.requestGetSecurity(props.NAME ? props.NAME.name : null).then((res) => {
      const { msg } = res;
      tableData.qi = msg;
    });
  } else {
    /**
     * @关于分页功能的接口说明
     * 页面初始化的时候，第一次初始化加载 0 - 5 条数据
     */
    r.requestGetPaing(0, tableData.pageSize).then((res) => {
      tableData.qi = res.data;
    });
    r.request_qi_requestQueryinfo().then((res) => {
      let { result } = res;
      tableData.total = result.length;
    });
  }
}
// 第一次执行，显示数据
gq();
const filterTableData = computed(() =>
  tableData.qi.filter(
    (data: any) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

// 1.打开修改操作
const handleEdit = (index: number, row: User) => {
  console.log(index, row);

  // open《Dialog 对话框》component
  dialogFormVisible.value = true;
  // 1. 通过参数 row 获取到每次点击的用户
  const {
    id,
    name,
    sex,
    birthday,
    idCard,
    joinDate,
    number,
    salary,
    grade,
    department,
  } = row;
  // 2. 复制给 form 属性
  form.id = id as string;
  form.name = name as string;
  form.sex = sex as string;
  form.birthday = birthday as string;
  form.idCard = idCard as string;
  form.joinDate = joinDate as string;
  form.number = number as string;
  form.salary = salary as string;
  form.grade = grade as string;
  form.department = department as string;
};

// 2.确认修改操作
const onConfirm = async function () {
  // 1，拿到修改后的数据
  const updataForm = form;
  // 2. 调用接口修改数据
  await r.requestUpdataInfo(updataForm);
  gq();
  dialogFormVisible.value = false;
};

// 取身份证的最后6位
const getIdCard = function () {
  let lastnumber = getIdCard_Last_SIX(form.idCard);
  form.id = lastnumber;
};

//删除操作
/**
 * @index 当前索引
 * @row 当前数据内容
 */
const handleDelete = async (index: number, row: User) => {
  let id = row;
  // 获取到用户ID，传入给后端接口，凭借ID删除选项
  const res = await r.requestDeleteUser(id);
  // 删除，无感更新页面
  gq();
  // 删除提示框
  let { msg } = res.data;
  ElNotification({
    title: "员工离职系统",
    message: msg,
    type: "error",
  });
};
</script>

<style lang="scss" scoped>
$BACKGROUND: #2f3542;
$COLOR: #dfe4ea;

/* 搜索框 */
.search-container {
  width: 100%;
  // height: 1rem;
  margin-bottom: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-item {
  width: 100%;
  display: flex;
  justify-content: center;
}

.input {
  width: 7rem;
  // height: 0.5rem;
  border-radius: 4px 0 0 4px;
  padding-left: 0.2rem;
  font-size: 0.16rem;
  border: 1px solid $BACKGROUND;
}

.input-btn {
  width: 0.8rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  cursor: pointer;

  font-weight: bold;
  font-size: 0.16rem;
  border-radius: 0 4px 4px 0;
  background: $BACKGROUND;
  color: $COLOR;
}

.search_input_edit,
.search_input_delete {
  width: 100%;
  border: none;
  font-weight: bold;
}

.search_input_edit {
  background: $COLOR;
}

.search_input_edit:hover {
  background: $BACKGROUND;
  color: $cumin-Size-Color;
}

.search_input_delete {
  background: #fab6b6;
  margin: 0;
}

.search_input_delete:hover {
  background: #f56c6c;
}
.el-tag {
  border: none;
}

// 分页

.paging {
  display: flex;
  justify-content: center;
  margin-top: 0.2rem;
}

.cumin {
  background: red;
}
</style>