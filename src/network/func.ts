import request from './main'

const r = {
  // 获取指定部门人员信息
  requestGetSecurity: (NAME: String) => {
    return request.get(
      `/querydepartment?d=${NAME}`
    ).then(res => {
      return res.data
    })
  },
  // 获取所有部门人员信息
  request_qi_requestQueryinfo: () => {
    return request.get("/queryinfo").then(res => {
      return res.data
    })
  },
  // 新员工入职 （插入操作）
  requestNewUserInsert: (form: Object) => {
    return request.post("/insertinfo", form)
  },
  // 搜索功能
  requestSearchUser: (name: String) => {
    return request.post("/searchinfo", { name })
  },
  // 调用接口修改数据
  requestUpdataInfo: (newData: Object) => {
    return request.post("/updatainfo", newData)
  },
  // 获取到用户ID，传入给后端接口，凭借ID删除选项
  requestDeleteUser: (id: Object) => {
    return request.delete("/deleteinfo", { data: { id } })
  },

  // 提供给分页功能接口
  requestGetPaing: (index: Number | String, count = 5) => {
    return request.get(`/getlimitlist?index=${index}&count=${count}`)
  }
}

export default r