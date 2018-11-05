import React, { Component, Fragment } from 'react';
import styled from 'styled-components'
import Video from '../icon/Untitled.mp4'
import { Icon, Input, Modal } from 'semantic-ui-react'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import { withRouter } from 'react-router';

const Container = styled.div`
  color: rgba(0, 0, 0, 0.87);
  background-color: white;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Metropolis, Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 10px;
  z-index: 1;
  width: 250px;
  margin: 10px 20px 200px;
  padding: 20px 20px 20px 20px;
  display: inline-block;
  text-align: left;
`;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: ""
    };
  }

  handleSelect = (range) => {
    this.setState({
      startDate: format(range.startDate._d, 'MM/DD/YYYY'),
      endDate: format(range.endDate._d, 'MM/DD/YYYY')
    })
  }

  goToShow = () => {
    this.props.history.push('/show')
  }

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
              <Input icon='plane' iconPosition='left' placeholder='Search places...' />
              <Modal trigger={<Input icon={<Icon name='search' inverted circular link onClick={this.goToShow}/>} placeholder='Search...'
                value={this.state.startDate && this.state.endDate !== "" ? this.state.startDate + " ~ " + this.state.endDate : ""}
                />
              }>
                <DateRange
                  onInit={this.handleSelect}
                  onChange={this.handleSelect}
                  />
              </Modal>
            </Container>
          </div>
        </div>
      </Fragment>
    );
  }

}

export default withRouter(Home);
