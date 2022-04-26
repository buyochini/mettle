const { Service } = require('./service');
const HTTPMethod = require('http-method-enum');

const create = (endPoint, payload) => {
  return new Service(endPoint, HTTPMethod.POST, payload);
};

const remove = (endPoint) => {
  return new Service(endPoint, HTTPMethod.DELETE);
};

const get = (endPoint, query) => {
  return new Service(endPoint, HTTPMethod.GET, null, query);
};

const update = (endPoint, payload) => {
  return new Service(endPoint, HTTPMethod.PUT, payload);
};

const modify = (endPoint, payload) => {
  return new Service(endPoint, HTTPMethod.PATCH, payload);
};

module.exports = { create, remove, get, update, modify };
