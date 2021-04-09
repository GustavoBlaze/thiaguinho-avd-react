import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import List from './pages/List';

const RouterWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route exact path="/teacher/:name" component={List} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterWrapper;
