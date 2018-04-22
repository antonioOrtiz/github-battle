import React, { Component } from 'react';
/* named imports if what we are importing is coming in as an object */
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px',
  },
};

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
    };
  }
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

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300,
};
