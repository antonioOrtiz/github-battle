import React, { Component } from 'react';
/* named imports if what we are importing is coming in as an object */
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

/*
  using babel-plugin-transform-class-properties to add these props, allows us to add specific properties to our components e.g. state, propTypes, defaultProps, as well as using arrow function for the methods on the class so we won't have to bind them.
*/

export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };
  state = {
    text: this.props.text,
  };

  componentDidMount() {
    var { text, speed } = this.props; /* destructured properties on props */
    var stopper = text + '...';

    this.interval = window.setInterval(() => {
      /* ternary and using arrow functions */
      this.state.text === stopper
        ? this.setState(() => ({ text: text }))
        : this.setState(prevState => ({ text: prevState.text + '.' }));
    }, speed);
  }

  componentWillUnmount() {
    console.log('CLEAR THE INTERVAL');
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}
