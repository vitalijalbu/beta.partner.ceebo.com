import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardContent,
  Link,
} from "framework7-react";

const AreaList = ({ areas }) => {
  if (!areas.length) return "Non ci sono dati da mostrare";

  return (
    <Row noGap>
      {areas.map((data, i) => (
        <Col width="50" key={i}>
          
          <Card
            calssName="area-card"
            outline
            style={{ background: data.color }}
          >
            <Link noLinkClass style={{color: 'initial'}} href={"/delivery/" + data.id}>
            <CardHeader>
              <h3>{data.name}</h3>
            </CardHeader>
            <CardContent>{data.total_count +' ordini totali'}</CardContent>
            </Link>
          </Card>
          
        </Col>
      ))}
    </Row>
  );
};

export default AreaList;
