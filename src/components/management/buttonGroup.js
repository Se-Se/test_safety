import React from "react";
import { Button, Row, Col } from "tea-component";
import intl from 'react-intl-universal';

export default function ButtonGroup(props) {
function sureClick(){
    props.sureClick()
}
function cancelClick(){
    props.cancelClick()
}
  return (
    <Row >
      <Col span={24}>
        <Button size="l" type="primary" style={{ marginRight: "20px",width:'100px',height:'40px' }} onClick={sureClick}>
          {props.primaryText||intl.get('MANAGE_RESOURCE_SAVE')}
        </Button>
        <Button type="weak" style={{ width:'100px',height:'40px' ,color:'black'}}  onClick={cancelClick}>{props.weakText||intl.get('MANAGE_RESOURCE_CANCEL')}</Button>
      </Col>
    </Row>
  );
}
