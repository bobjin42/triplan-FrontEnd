import React, { Component } from 'react';
import { Table, TextArea, Input, Header, Image } from 'semantic-ui-react';

class TimePlanRow extends Component {

  state = {
    start: "",
    end: "",
    notes: "",
    id: "",
    name: ""
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.place.name,
    })
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    }, () => this.props.handlePlaninfo(this.state))  
  }

  render() {
    console.log(this.state);
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
          <Input name='start' value={this.state.start} onChange={this.handleChange} icon='clock outline' iconPosition='left' placeholder='Enter your start time...' />
          <Input name='end' value={this.state.end} onChange={this.handleChange} icon='clock' iconPosition='left' placeholder='Enter your end time...' />
        </Table.Cell>
        <Table.Cell><TextArea name='notes' value={this.state.notes} onChange={this.handleChange} autoHeight placeholder='Try adding multiple lines' /></Table.Cell>
      </Table.Row>
    );
  }
}

export default TimePlanRow;
