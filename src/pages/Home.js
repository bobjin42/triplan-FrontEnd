import React, { Component, Fragment } from 'react';
// import gif from '../icon/background.gif';
import styled from 'styled-components'

const Container = styled.img`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SearchBox = styled.div`
  background-color: white;
  box-sizing: border-box;
  border-radius: 2px;
  z-index:1
  width:320px;
  margin: 20px 20px 0px 20px
  padding: 20px 20px 30px 20px
  display:inline-block
  text-aligh: left;
`

class Home extends Component {
  render() {
    return (
      <Fragment>
  
        <SearchBox>123</SearchBox>
      </Fragment>
    );
  }

}

export default Home;

// <img src={gif} />
