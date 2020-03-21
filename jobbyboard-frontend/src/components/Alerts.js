import React, {useState} from 'react';
import { Grid } from '@material-ui/core';

const Alerts = ({alerts}) => {
  const color = useState(() => {
    if (!!alerts.errors) {
      return 'red'
    } else if (!!alerts.notifications) {
      return 'green'
    }
  })

  const formatAlerts = (alertMessages) => {
    return(
      <>
      {alertMessages.map((message,i) => {
        return <Grid container justify="center" key={i}>{message}</Grid>
      })}
      </>
    )
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
      <Grid container justify="center" direction="column" spacing={1} style={{ marginTop: '2em', color: `${color[0]}` }}>
        {displayAlerts()}
      </Grid>
    </>
  )

}

export default Alerts;
