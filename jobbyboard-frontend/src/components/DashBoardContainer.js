import React from 'react';
import { connect } from 'react-redux';

const DashBoardContainer = (props) => {

  return <div>{props.state.api.domain}</div>

}

const mapStateToProps = state => {
  return {state: state}
}

export default connect(mapStateToProps)(DashBoardContainer);
