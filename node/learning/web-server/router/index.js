const methodRoutes = {
  get: {},
  post: {},
  patch: {}
};

const routerHandlers = Object.keys(methodRoutes).reduce(
  (handlerObj, method) => {
    handlerObj[method] = (path, handler) =>
      (methodRoutes[method][path] = handler);
    return handlerObj;
  },
  {}
);
const execute = (req, res) => {
  let urls = ["/datetostring/", "/parsedate?"];
  let router = methodRoutes[req.method.toLowerCase()];
  let handler = undefined;

  if (router) {
    let url =
      (req.url.indexOf(urls[0]) !== -1 &&
        urls[0].substring(0, urls[0].length - 1)) ||
      (req.url.indexOf(urls[1]) !== -1 &&
        urls[1].substring(0, urls[1].length - 1)) ||
      req.url;

    handler = router[url];
  }

  if (handler) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
};

module.exports = {
  ...routerHandlers,
  execute,
  methodRoutes
};
