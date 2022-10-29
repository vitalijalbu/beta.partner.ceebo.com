import React, { useState, useEffect } from "react";
import { Block, BlockTitle, Preloader, Row } from "framework7-react";
import Item from "./Item";

const SectionList = ({ data, onUpdate }) => {
 /* if (!data) return (<div className="empty-state">Non ci sono ordini da mostrare</div>);
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 768px)").matches);

  useEffect(() => {
    const handler = (e) => setMatches( e.matches );
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }, []);
*/
  return (
    <>      
    <BlockTitle medium>{data.name}</BlockTitle>
      {Array.isArray(data.items) ? (
        <Row>
          {data.items.map((item, i) => (
              <Item data={item} key={i} onUpdate={onUpdate}/>
          ))}
        </Row>
      ) : (
        <Block strong>Nessun prodotto</Block>
      )}
    </>
  );
      
};

export default SectionList;
