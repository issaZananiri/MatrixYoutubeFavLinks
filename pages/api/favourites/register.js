const bcrypt = require('bcryptjs');

import { apiHandler, favouritesRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

function register(req, res) {
    const { favouritename, ...favourite } = req.body;

    favouritesRepo.create(favourite);
    return res.status(200).json({});
}
