const url = {
  PRODUCT_DEVELOPMENT_URL: 'https://pokesearch-server.herokuapp.com/api',
  SEARCH: '/search',
};

const getProductDevelopmentUrlWithPath = (path = '') => {
  return url.PRODUCT_DEVELOPMENT_URL + path;
};

module.exports = {
  url,
  getProductDevelopmentUrlWithPath,
};
