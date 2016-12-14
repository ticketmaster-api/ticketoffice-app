import React, { Component, PropTypes } from 'react';
import CurrentEventsItem from './CurrentEventsItem';

class CurrentEvents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentEvents } = this.props;

    const currentEventItem = currentEvents.map((currentEvent) => (
      <CurrentEventsItem key={currentEvent.id} currentEvent={currentEvent} />
    ));

    return (
      <div className="currentEvents">
        <ul className="currentEvents-list">
          {currentEventItem}
        </ul>
      </div>
    );
  }
}

CurrentEvents.propTypes = {
  currentEvents: PropTypes.array.isRequired
};

export default CurrentEvents;
