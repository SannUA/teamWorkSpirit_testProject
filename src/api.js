import axios from "axios";

const instance =  axios.create({
  baseURL: "http://localhost:9000"
})

export default {
  fetchUsers: () => instance.get("/users"),
  getUser: (id) => instance.get(`/users/${id}`),
  editUser: (id, data) => instance.put(`/users/${id}`, data),
  deleteUser: (id) => instance.delete(`/users/${id}`),
  createUser: (data) => instance.post("users", data)
}