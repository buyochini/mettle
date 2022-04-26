const pactum = require('pactum');

pactum.request.setDefaultTimeout(20000);
pactum.request.setDefaultHeaders({ 'content-type': 'application/json' });

let spec = pactum.spec();

class Service {
  constructor(endPoint, method, payload = null, query) {
    this.endPoint = endPoint;
    this.method = method;
    this.payload = payload;
    this.query = query;

    spec = pactum.spec();
  }

  async getRequestWithQuery() {
    return spec.get(this.endPoint).withQueryParams('query', this.query).inspect().toss();
  }

  async getRequest() {
    return spec.get(this.endPoint).inspect().toss();
  }

  async deleteRequest() {
    return spec.delete(this.endPoint).inspect().toss();
  }

  async postRequest() {
    return spec.post(this.endPoint).withJson(this.payload).inspect().toss();
  }

  async putRequest() {
    return spec.put(this.endPoint).withJson(this.payload).inspect().toss();
  }

  async patchRequest() {
    return spec.patch(this.endPoint).withJson(this.payload).inspect().toss();
  }

  getSpec() {
    return spec;
  }
}

module.exports = { Service };
