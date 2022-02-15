export default function errorHandler(e) {
    let error = e

    if (e.response && e.response.data.hasOwnProperty('message')) {
        error = e.response.data.message;
    }
    console.log(error)
    return new Error(error)
}