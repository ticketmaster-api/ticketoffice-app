import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { createLocation } from 'history';
import { fetchComponentDataBeforeRender } from '../../common/api/fetchComponentDataBeforeRender';
import configureStore from '../../common/store/configureStore';
import routes from '../../common/routes';
import packagejson from '../../../package.json';

const renderFullPage = (html, initialState, env = 'development') => {
  const cssTag = env == 'production'? '<link rel="stylesheet" type="text/css" href="/static/app.css">' : '';
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
        <title>Ticket Office</title>
        ${cssTag}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/static/bundle.js"></script>
        <script src="/socket.io/socket.io.js"></script>
      </body>
    </html>
    `;
};

export function reactRouting(req, res) {
  // session is available via req.session

  const location = createLocation(req.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    const store = configureStore({
      session: req.session,
      version: packagejson.version,
      environment: process.env.NODE_ENV
    });

    const InitialView = (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    //This method waits for all render component promises to resolve before returning to browser
    fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
    .then(() => {
      const componentHTML = ReactDOMServer.renderToString(InitialView);
      const initialState = store.getState();
      res.status(200).end(renderFullPage(componentHTML, initialState, process.env.NODE_ENV));
    })
    .catch(err => {
      res.end(renderFullPage('',{},process.env.NODE_ENV));
    });
  });
}
