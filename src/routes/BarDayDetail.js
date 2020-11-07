import React from 'react';
import { useParams } from "react-router-dom";

function BarDayDetail() {
  let { id } = useParams();
  console.log(id)
  return (
    <div>
        BarDayDetail
    </div>
  );
}

export default BarDayDetail;