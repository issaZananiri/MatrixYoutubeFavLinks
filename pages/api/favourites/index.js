import { apiHandler, favouritesRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getFavourites
});

function getFavourites(req, res) {
    // return Favourites without hashed passwords in the response
    const response = favouritesRepo.getAll();
    return res.status(200).json(response);
}
