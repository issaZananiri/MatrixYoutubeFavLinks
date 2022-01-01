const bcrypt = require('bcryptjs');

import { apiHandler } from 'helpers/api';
import { favouritesRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

function getById(req, res) {
    const favourite = favouritesRepo.getById(req.query.id);

    if (!favourite) throw 'favourite Not Found';

    return res.status(200).json(omit(favourite, 'hash'));
}

function update(req, res) {
    const favourite = favouritesRepo.getById(req.query.id);

    if (!favourite) throw 'favourite Not Found';

    // split out password from favourite details 
    const { password, ...params } = req.body;

    // validate

    // only update hashed password if entered
    if (password) {
        favourite.hash = bcrypt.hashSync(password, 10);
    }

    favouritesRepo.update(req.query.id, params);
    return res.status(200).json({});
}

function _delete(req, res) {
    favouritesRepo.delete(req.query.id);
    return res.status(200).json({});
}
