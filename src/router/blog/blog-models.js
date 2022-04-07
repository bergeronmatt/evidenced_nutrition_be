const db = require('../../data/config');

function getImages() {
    return db('images');
}

function findImage(id) {
    const image = db('images').where({ id }).first()
    return image;
}

function addImage(name, data) {
    return db('images')
        .insert({
            name: name,
            image: data
        })
        .then(([id]) => {
            return findImage(id)
        })
}

function deleteImage(id) {
    return db('image').where('id', id).del()
}

module.exports = {
    getImages,
    findImage,
    addImage,
    deleteImage
}