const CrudRepository = require('./crud-repository');
const Contact = require('../model/contact-model');

class ContactRepository extends CrudRepository {
  constructor() {
    super(Contact);
  }
}

module.exports = ContactRepository;
