import React, { Component, PropTypes } from 'react';

class SVG extends Component {

  constructor(props) {
    super(props);
    this.generatePlainHTMLUseTag = this.generatePlainHTMLUseTag.bind(this);
  }

  componentDidMount() {
    this.refs.svg.setAttribute('focusable', 'false');
  }

  generatePlainHTMLUseTag() {
    return `<use xlink:href="${this.props.href}" />`;
  }

  render() {
    var useTag = this.generatePlainHTMLUseTag();
    return (
      <svg className={this.props.className} dangerouslySetInnerHTML={{__html: useTag }} role="img" aria-hidden="true" ref="svg"/>
    );
  }
}

SVG.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired
};

export default SVG;