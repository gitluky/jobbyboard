import React from 'react';
import UserForm from './UserForm';

const EditUser = (props) => {
  const fetchPath = `${props.domain}/users/${props.match.params.id}/update`;
  const fetchMethod = 'PATCH';
  return(
    <>
      <UserForm {...props} fetchPath={fetchPath} fetchMethod={fetchMethod} />
    </>
  )
}

export default EditUser;
