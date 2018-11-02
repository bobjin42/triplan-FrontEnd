import React, { Component, Fragment } from 'react';
import styled from 'styled-components'
import Video from '../icon/Untitled.mp4'


class Home extends Component {
  render() {
    const video = {
      src: '../icon/Untitled.mp4'
    }
    return (
      <Fragment>
        <video id="background-video" loop autoPlay>
         <source src={Video} type="video/mp4" />
         <source src={Video} type="video/ogg" />
        </video>

      </Fragment>
    );
  }

}

export default Home;

// <img src={gif} />
