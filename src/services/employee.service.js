import http from "../http-common";

class EmployeeDataService {
    getAll() {
        return http.get("/api/employees");
    }

    get(id) {
        return http.get(`/api/employees/${id}`);
    }

    create(data) {
        return http.post('/api/employees', data);
    }

    update(id, data) {
        return http.put(`/api/employees/${id}`, data);
    }

    delete(id) {
        return http.delete(`/api/employees/${id}`);
    }
}

export default new EmployeeDataService();
