import React from 'react';
import { useParams } from "react-router-dom";

function StackedDayDetail() {
  let { id } = useParams();
  console.log(id)
  return (
    <div>
        StackedDayDetail
    </div>
  );
}

export default StackedDayDetail;