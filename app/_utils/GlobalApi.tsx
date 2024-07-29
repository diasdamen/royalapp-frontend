// import axios from "axios";

const { default: axios } = require("axios");

const axiosClient=axios.create({
    baseURL: "https://royalapp-backend.onrender.com/api"
});

const getRoom= () =>axiosClient.get('/rooms?populate=*');

export default{
    getRoom
};