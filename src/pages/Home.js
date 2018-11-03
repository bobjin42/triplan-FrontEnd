import React, { Component, Fragment } from 'react';
import styled from 'styled-components'
import Video from '../icon/Untitled.mp4'
import { Icon, Input } from 'semantic-ui-react'

const Container = styled.div`
  color: rgba(0, 0, 0, 0.87);
  background-color: white;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Metropolis, Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 2px;
  z-index: 1;
  width: 320px;
  margin: 20px 20px 0px;
  padding: 20px 20px 30px;
  display: inline-block;
  text-align: left;
`;

class Home extends Component {

  render() {
    const video = {
      src: '../icon/Untitled.mp4'
    }
    return (
      <Fragment>
        <div className="homeContainer">
          <video id="background-video" loop autoPlay>
           <source src={Video} type="video/mp4" />
           <source src={Video} type="video/ogg" />
          </video>
          <div>
            <Container className="searchContainer">
              <Input icon={<Icon name='search' inverted circular link />} placeholder='Search...' />
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }

}

export default Home;
