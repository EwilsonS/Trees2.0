import axios from "axios";

export default {
    // Create tree
    saveTree: function (treeName) {
        return axios.post("/api/trees", treeName)
    },
    // Get tree by name
    getTree: function (name) {
        return axios.get("/api/trees/" + name);
    },
    // Get tree by Id
    getTreeById: function (id) {
        return axios.get("/api/trees/" + id);
    },
    // Get all trees
    getTrees: function () {
        return axios.get("/api/trees");
    },
    // Update tree
    addFactory: function (id, data) {
        return axios.put("/api/trees/addFactory/" + id, data)
    },
    // Remove factory
    pullFactory: function (id, data) {
        return axios.put("/api/trees/pullFactory/" + id, data)
    },
    // Change Name
    changeName: function (id, data) {
        return axios.put("/api/trees/changeName/" + id, data)
    },
    // Change Range
    changeRange: function (id, data) {
        return axios.put("/api/trees/changeRange/" + id, data)
    }
};