import React from 'react'
import { withRouter, useParams } from "react-router-dom";
import EBookDetailSection from '../../components/ebook/EBookDetailSection';

function EBookDetail() {

  const { id = "" } = useParams();

  return (
    <React.Fragment>
      <EBookDetailSection bookInfo={id} />
    </React.Fragment>
  )
}

export default withRouter(EBookDetail)
