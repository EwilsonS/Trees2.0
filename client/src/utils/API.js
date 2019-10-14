import axios from "axios";

export default {
    saveTree: function (treeName) {
        return axios.post("/api/trees", treeName)
    },
    getTree: function (name) {
        return axios.get("/api/trees/" + name)
    },
    getTrees: function () {
        return axios.get("/api/trees");
    },
    addFactory: function (id, data) {
        return axios.put("/api/trees/addFactory/" + id, data)
    },
    pullFactory: function (id, data) {
        return axios.put("/api/trees/pullFactory/" + id, data)
    },
    changeName: function (id, data) {
        return axios.put("/api/trees/changeName/" + id, data)
    },
    changeRange: function (id, data) {
        return axios.put("/api/trees/changeRange/" + id, data)
    }
};