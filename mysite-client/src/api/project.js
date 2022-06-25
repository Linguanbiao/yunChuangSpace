import request from "./request.js"
export async function getProject() {
    return await request.get('/api/project')
}