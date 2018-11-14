import React, { Component, Fragment } from 'react';
import { Accordion, Icon, List, Segment } from 'semantic-ui-react';

class TravelPlan extends Component {

  state = { activeIndex: "" }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    if(this.props.travelPlan !== []){
      return (
        <Segment className="opcailty">
          <Accordion>
            {this.props.travelPlan.map((travelPlan, index) => {
              return(
                <Fragment key={index}>
                  <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    {travelPlan.trip_title + " " + travelPlan.start_date + " ~ " + travelPlan.end_date}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    {travelPlan.plans.map(plan => {
                      return(
                        <List key={plan.id}>
                          <List.Item>
                            <List.Content>
                              <List.Header>{plan.location_name}</List.Header>
                              {plan.start_time && plan.end_time ? <List.Description>{plan.start_time.replace(/[a-zA-Z]+/g, " ").slice(0, -8) + " ~ " + plan.end_time.replace(/[a-zA-Z]+/g, " ").slice(0, -8)}</List.Description> : null}
                              <List.Description>{plan.note}</List.Description>
                            </List.Content>
                          </List.Item>
                        </List>
                      )
                    })}
                  </Accordion.Content>
                </Fragment>)
              })}
            </Accordion>
          </Segment>
        )
    }
  }
}

export default TravelPlan;
