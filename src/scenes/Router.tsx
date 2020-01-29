import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import { LoginScene } from './Login';
import { FeedScene } from './Feed';


export const Router: React.FC<{}> = () => {
  return (
    <BrowserRouter>
        <Route exact path="/" component={LoginScene} />
        <Route exact path="/feed" component={FeedScene} />
    </BrowserRouter>
  );
};
