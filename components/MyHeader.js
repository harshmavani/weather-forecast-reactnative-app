import React from 'react';
import { Appbar } from 'react-native-paper';


const MyHeader = (props) =>{
    return (
        <Appbar.Header style={{color:"red"}}>
            <Appbar.Content title="Weather Forecast" subtitle={props.title} style={{alignItems:'center'}}/>
      </Appbar.Header>
    )
}
export default MyHeader;