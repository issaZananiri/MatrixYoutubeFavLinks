import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/categories`;
const categorySubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('category')));

export const categoryService = {
    category: categorySubject.asObservable(),
    get categoryValue () { return categorySubject.value },

    register,
    getAll,
    getById,
    update,
    delete: _delete
};



function register(category) {
    return fetchWrapper.post(`${baseUrl}/register`, category);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            // update stored category if the logged in category updated their own record
            if (id === categorySubject.value.id) {
                // update local storage
                const category = { ...categorySubject.value, ...params };
                localStorage.setItem('category', JSON.stringify(category));

                // publish updated category to subscribers
                categorySubject.next(category);
            }
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
