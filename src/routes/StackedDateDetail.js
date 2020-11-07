import React from 'react';
import { useParams } from "react-router-dom";

function StackedDateDetail() {
  let { id } = useParams();
  console.log(id)
  return (
    <div>
        StackedDateDetail
    </div>
  );
}

export default StackedDateDetail;