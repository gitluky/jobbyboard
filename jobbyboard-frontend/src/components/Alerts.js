import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';

const Alerts = ({alerts}) => {
  const [color, setColor] = useState('')

  useEffect(() => {
    if (!!alerts.errors) {
      setColor('red')
    } else if (!!alerts.notifications) {
      setColor('green')
    }
  },[alerts])

  const formatAlerts = (alertMessages) => {
    if (!!alertMessages) {
      return(
        <>
        {alertMessages.map((message,i) => {
          return <Grid container justify="center" key={i}>{message}</Grid>
        })}
        </>
      )
    } else {
      return ''
    }
  }

  const displayAlerts = () => {
    if (!!alerts.errors) {
      return formatAlerts(alerts.errors);
    } else if (!!alerts.notifications) {
      return formatAlerts(alerts.notifications);
    }
  }

  return(
    <>
      <Grid container justify="center" direction="column" spacing={1} style={{ marginTop: '2em', color: `${color}` }}>
        {displayAlerts()}
      </Grid>
    </>
  )

}

export default Alerts;
