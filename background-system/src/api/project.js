// 获取项目有关数据的请求
import requeset from "@/utils/request.js"

export function getProjects() {
  return requeset({
    url: '/api/project',
    method: 'get'
  })
}

export function modifyProject(projectInfo) {
  return requeset({
    url: `/api/project/${projectInfo.id}`,
    method: 'put',
    data: projectInfo
  })
}

export function addProject(projectInfo) {
  return requeset({
    url: "/api/project",
    method: 'post',
    data: projectInfo
  })
}

export function deleteProject(id) {
  return requeset({
    url: `/api/project/${id}`,
    method: 'delete',
  })
}
