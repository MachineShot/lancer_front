import http from "../http-common";

class RatingDataService {
    getAll() {
        return http.get("/api/ratings");
    }

    get(id) {
        return http.get(`/api/ratings/${id}`);
    }

    getByEmployee(id) {
        return http.get(`/api/employees/${id}/ratings/`);
    }

    create(data) {
        return http.post('/api/ratings', data);
    }

    update(id, data) {
        return http.put(`/api/ratings/${id}`, data);
    }

    delete(id) {
        return http.delete(`/api/ratings/${id}`);
    }
}

export default new RatingDataService();
