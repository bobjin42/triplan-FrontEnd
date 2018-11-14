import React, { Component } from 'react';
import { Table, TextArea, Input, Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { planDetail, pushPlanDetail } from '../store/actions';

class TimePlanRow extends Component {

  state = {
    start_time: "",
    end_time: "",
    note: "",
    id: "",
    location_name: "",
    tripId: "",
    plan_id: "",
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      location_name: this.props.place.name,
      tripId: this.props.tripId,
      plan_id: this.props.plan_id
    })
  }

  updatePlanTime = () => {
    if (this.props.plan.find(plan => plan.id == this.state.id)){
      this.props.planDetail(this.state)
    } else {
      this.props.pushPlanDetail(this.state)
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    }, this.updatePlanTime)
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={this.props.place.thumbnail_url}/>
            <Header.Content className="tableimg">
              {this.props.place.name}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{this.props.place.perex}</Table.Cell>
        <Table.Cell>
          <Input name='start_time' value={this.state.start} onChange={this.handleChange} icon='clock outline' iconPosition='left' placeholder='Enter your start time...' />
          <Input name='end_time' value={this.state.end} onChange={this.handleChange} icon='clock' iconPosition='left' placeholder='Enter your end time...' />
        </Table.Cell>
        <Table.Cell><TextArea name='note' value={this.state.notes} onChange={this.handleChange} autoHeight placeholder='Add your notes' /></Table.Cell>
      </Table.Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    plan: state.planReducer.plan,
    planIns: state.planReducer.planIns
  }
}

export default connect(mapStateToProps, { planDetail, pushPlanDetail })(TimePlanRow)
