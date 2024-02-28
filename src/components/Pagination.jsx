import React, {useState} from 'react'
import { Pagination as PaginationElement} from '@mui/material';

const Pagination = ({onPageChange}) => {

  const [pageQuantity, setPageQuantity] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange=(event, value)=>{
    setCurrentPage(value)
    onPageChange()
    console.log(currentPage);
  }

  return (
    <div className="pagination-container">
      <PaginationElement 
      count={pageQuantity} 
      shape="rounded"
      showFirstButton  
      showLastButton 
      onChange={handleChange} />
    </div>
  )
}

export default Pagination