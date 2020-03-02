import React from 'react';

import {AutoSizer} from 'react-virtualized';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import { theme } from 'kepler.gl/styles';
// import './App.css';
import {GlobalStyle} from './components/base';
import {AUTH_TOKENS} from './constants';
// import 'react-virtualized/styles.css'; // only needs to be imported once


// const KeplerGl = require('kepler.gl/components')
// .injectComponents([
//   // replaceLoadDataModal(),
//   // replaceSaveMap(),
//   // replaceMapControl(),
//   // replacePanelHeader()
// ]);
const keplerGlGetState = state => {
  return state.workshop.keplerGl
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle
        // this is to apply the same modal style as kepler.gl core
        // because styled-components doesn't always return a node
        // https://github.com/styled-components/styled-components/issues/617
        ref={node => {
          return document.getElementById('root')
        }}
      >
         <AutoSizer>
        {({ height, width }) => {
        console.log([height, width])
          return ( 
            <KeplerGl
              mapboxApiAccessToken={AUTH_TOKENS.MAPBOX_TOKEN}
              id="map"
              /*
               * Specify path to keplerGl state, because it is not mount at the root
               */
              getState={keplerGlGetState}
              width={width ? width : 1024}
              appName={'Hungerstation'}
              height={ height? height:1024}
              version={'v20.03.02'}
            />
           )}}
      </AutoSizer>
      </GlobalStyle>
    </ThemeProvider>
  );
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  dispatchToProps
)(App);
