import { userService } from "../services/user.service";

const root = process.env.PUBLIC_URL;
const path = `${root}/api/`;

const http = url => {

    let base = (url, properties) => {
        
        return new Promise((resolve, reject) => {

            let token =  userService.getToken();

            let headers = {};

            if(token) headers = { 'Authorization': `Bearer ${token}`}

            fetch(`${url}`, {...properties, headers})
                .then(processResponse)
                .catch(error => reject(error))
                .then(response => resolve(response));

        })
    };

    let getParameters = function(data) {
        let queryString = '';

        if (data) {
            let parameters = '';

            if (typeof data == 'function')
                parameters = data();
            else
                parameters = data;

            for (const prop in parameters) {
                queryString += `&${prop}=${parameters[prop]}`
            }

        }

        return queryString.length > 0 ? queryString.replace('&', '?') : queryString;

    };

    const _url = `${path}${url}`;

    return {
        
        asGet: (data = null) => {

            let params = getParameters(data);

            return base(`${_url}${params}`, { method: 'GET' });

        },
        asPost: data => {
            return new Promise((resolve, reject) => {
                fetch(_url, {
                        method: 'POST',
                        body: data ? JSON.stringify(data) : null,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8",
                            'Authorization': 'Bearer ' +  userService.getToken()
                        }
                    })
                    .then(processResponse)
                    .catch(error => reject(error))
                    .then(data => resolve(data));
            })
        },
        asDelete: (data = null) => {
            let params = getParameters(data);

            return base(`${_url}${params}`, { method: 'DELETE', headers: {                
                'Authorization': 'Bearer ' +  userService.getToken()
            }});

        },
        asFile: (file = null) => {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('file', file);
                fetch(_url, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' +  userService.getToken()
                        },
                        body: formData
                    })
                    .then(processResponse)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            })
        },
    }
}

const processResponse = resp => {

    return new Promise((resolve, reject) => {

        if (resp.status == httpStatus.badRequest)
            resp.text().then(err => reject(err));

        if (resp.status == httpStatus.internalServerError)
            resp.text().then(err => reject('Error interno en la aplicacion'));

        if (resp.status == httpStatus.unauthorized)
        {
            window.location.href = '/account/login';
        }

        if (resp.status == httpStatus.ok)
            resp.json().then(data => resolve(data))

    })

}

const httpStatus = {
    ok : 200,
    badRequest : 400,
    unauthorized : 401,
    internalServerError : 500
}

export { path };
export default http;