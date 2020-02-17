import React from 'react';
import { connect } from 'react-redux';
import { isSignedIn } from '../actions/sessionsActions';
import { useEffect } from 'react';


const DashBoardContainer = (props) => {

  // useEffect(() => {
  //   props.dispatch(isSignedIn(props.state.api.domain))
  // })

  return <div>{props.state.api.domain}</div>

}

const mapStateToProps = state => {
  return {state: state}
}

export default connect(mapStateToProps)(DashBoardContainer);
