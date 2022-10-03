'use strict';
/**
   * Route path extraction
   * @module DataCollection
   * @param {model}  - The model and id and data params can be extracted from path here
   *  @return {method} - The method appropriate to the model CRUD operation will be returned
   */
class DataCollection {
  constructor(model) {
    this.model = model;
  }
  get(id) {
    if (id) {
      return this.model.findOne({ id });
    }
    else {
      return this.model.findAll({});
    }
  }
  create(record) {
    return this.model.create(record);
  }
  update(id, data) {
    return this.model.findOne({ where: { id } })
      .then(record => record.update(data));
  }
  delete(id) {
    return this.model.destroy({ where: { id }});
  }
}

module.exports = DataCollection;
