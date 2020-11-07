import React from 'react';
import { useParams } from "react-router-dom";

function Detail() {
  let { id } = useParams();
  console.log(id)
  return (
    <div>
        Detail
    </div>
  );
}

export default Detail;