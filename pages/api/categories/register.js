import { apiHandler, categoriesRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

function register(req, res) {
    const category  = req.body;



    categoriesRepo.create(category);
    return res.status(200).json({});
}
