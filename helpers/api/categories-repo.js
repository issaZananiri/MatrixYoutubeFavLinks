const fs = require('fs');

// categories in JSON file for simplicity, store in a db for production applications
let categories = require('data/categories.json');

export const categoriesRepo = {
    getAll: () => categories,
    getById: id => categories.find(x => x.id.toString() === id.toString()),
    find: x => categories.find(x),
    create,
    update,
    delete: _delete
};

function create(category) {
    // generate new category id
    category.id = categories.length ? Math.max(...categories.map(x => x.id)) + 1 : 1;

    // set date created and updated
    category.dateCreated = new Date().toISOString();
    category.dateUpdated = new Date().toISOString();

    // add and save category
    categories.push(category);
    saveData();
}

function update(id, params) {
    const category = categories.find(x => x.id.toString() === id.toString());

    // set date updated
    category.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(category, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted category and save
    categories = categories.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/categories.json', JSON.stringify(categories, null, 4));
}