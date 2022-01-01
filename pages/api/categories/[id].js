const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { categoriesRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const category = categoriesRepo.getById(req.query.id);

    if (!category) throw 'category Not Found';

    return res.status(200).json(omit(category, 'hash'));
}

function update(req, res) {
    const category = categoriesRepo.getById(req.query.id);

    if (!category) throw 'category Not Found';

    const { password, ...params } = req.body;


  

    categoriesRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    categoriesRepo.delete(req.query.id);
    return res.status(200).json({});
}
