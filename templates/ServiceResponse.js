class ServiceResponse {
    constructor(code, message, data){
        this.code = code;
        this.message = message;
        this.data = data;
    }

    getCode() {
        return this.code;
    }

    getMessage() {
        return this.message;
    }

    getData() {
        return this.data;
    }
}

module.exports = ServiceResponse;