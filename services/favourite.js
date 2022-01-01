import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/favourites`;
const favouriteSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('favourite')));

export const favouriteService = {
    favourite: favouriteSubject.asObservable(),
    get favouriteValue () { return favouriteSubject.value },

    register,
    getAll,
    getById,
    update,
    delete: _delete
};



function register(favourite) {
    return fetchWrapper.post(`${baseUrl}/register`, favourite);
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

            if (id === favouriteSubject.value.id) {
     
                const favourite = { ...favouriteSubject.value, ...params };
                localStorage.setItem('favourite', JSON.stringify(favourite));

                favouriteSubject.next(favourite);
            }
            return x;
        });
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
