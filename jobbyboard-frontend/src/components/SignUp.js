import React from 'react';
import UserForm from './UserForm';

const SignUp = (props) => {
  const fetchPath = `${props.domain}/users`;
  const fetchMethod = 'POST';
  return(
    <>
      <UserForm {...props} fetchPath={fetchPath} fetchMethod={fetchMethod} />
    </>
  )
}

export default SignUp;
