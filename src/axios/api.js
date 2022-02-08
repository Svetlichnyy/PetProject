import axios from "axios";


const token = localStorage.getItem('token') || ""
export default axios.create({
    baseURL: 'https://young-brushlands-01487.herokuapp.com/api',
    headers:{

        Authorization : `Bearer ${token}`
    }
})


