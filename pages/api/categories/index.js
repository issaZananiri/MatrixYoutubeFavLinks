import { apiHandler, categoriesRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getCategories
});

function getCategories(req, res) {

    const response = categoriesRepo.getAll()
    return res.status(200).json(response);
}
