import { useState } from 'react';

export default function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(event) {
    if (event.target.name === 'avatar') {
      setValue(event.target.files[0])
    } else {
      setValue(event.target.value);
    }
  }

  return {
    value,
    onChange: handleChange
  };
}
