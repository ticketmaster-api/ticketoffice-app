import React, { Component, PropTypes } from 'react';
import getFormattedEventDate from '../util/eventDateFormatter';

class PresaleItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, startDateTime, endDateTime, description, url } = this.props.presale;
    const start = getFormattedEventDate(new Date(startDateTime));
    const end = getFormattedEventDate(new Date(endDateTime));
    const desc = description || '';

    let nameComponent = null;
    if (url) {
      nameComponent = (<a className="presale-name" href={url} target="_blank">{name}</a>);
    } else {
      nameComponent = (<span className="presale-name">{name}</span>);
    }

    let tooltip = null;
    if (desc) {
      tooltip = (
        <div className="tooltip tooltip--top">
          <div className="tooltip__content">
            {desc}
          </div>
        </div>
      );
    }

    return (
      <li className="presale-list-item">
        <div>{nameComponent} <span className="presale-date">({start.full} - {end.full})</span></div>
        {tooltip}
      </li>
    );
  }
}

PresaleItem.propTypes = {
  presale: PropTypes.object.isRequired
};

export default PresaleItem;
