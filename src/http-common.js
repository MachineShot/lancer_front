import axios from "axios";
import authHeader from './services/auth-header';

export default axios.create({
    baseURL: "https://lancer-stpp.herokuapp.com",
    headers: {
        "Content-type": "application/json",
        "Authorization": authHeader()
}
});
