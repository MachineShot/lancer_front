import http from "../http-common";

class QueryDataService {
    getAll() {
        return http.get("/api/queries");
    }

    get(id) {
        return http.get(`/api/queries/${id}`);
    }

    getByEmployee(id) {
        return http.get(`/api/employees/${id}/queries/`);
    }

    create(data) {
        return http.post('/api/queries', data);
    }

    update(id, data) {
        return http.put(`/api/queries/${id}`, data);
    }

    delete(id) {
        return http.delete(`/api/queries/${id}`);
    }
}

export default new QueryDataService();
