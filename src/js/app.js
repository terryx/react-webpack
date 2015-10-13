'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {} from '../css/app.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        This is a sub heading in Inconsolata. This paragraph is in Inconsolata.
        <img src={require('../images/webpack.png')} alt=""/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
