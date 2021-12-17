export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));

    if (user && token) {
        console.log("Auth header. Token: ", token)
        console.log("Auth header. User: ", user)
        return "Bearer " + token ;
    } else {
        console.log("Failed authHeader");
        return {};
    }
}
