const fs = require('fs');

// favourites in JSON file for simplicity, store in a db for production applications
let favourites = require('data/favourites.json');

export const favouritesRepo = {
    getAll: () => favourites,
    getById: id => favourites.find(x => x.id.toString() === id.toString()),
    find: x => favourites.find(x),
    create,
    update,
    delete: _delete
};

function create(favourite) {
    // generate new favourite id
    favourite.id = favourites.length ? Math.max(...favourites.map(x => x.id)) + 1 : 1;

    // set date created and updated
    favourite.dateCreated = new Date().toISOString();
    favourite.dateUpdated = new Date().toISOString();

    // add and save favourite
    favourites.push(favourite);
    saveData();
}

function update(id, params) {
    const favourite = favourites.find(x => x.id.toString() === id.toString());

    // set date updated
    favourite.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(favourite, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted favourite and save
    favourites = favourites.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/favourites.json', JSON.stringify(favourites, null, 4));
}