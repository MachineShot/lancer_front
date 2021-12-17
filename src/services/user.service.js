import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/api/users");
    }

    get(id) {
        return http.get(`/api/users/${id}`);
    }

    create(data) {
        return http.post("/register", data);
    }

    login(data) {
        return http.post('/authenticate', data).then(response => {
            if (response.data) {
                console.log(response);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(data.username));
            }
        });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.log("logout. ", localStorage);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    update(id, data) {
        return http.put(`/api/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/api/users/${id}`);
    }
}

export default new UserDataService();