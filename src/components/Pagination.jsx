import { Pagination as PaginationElement} from '@mui/material';

const Pagination = ({totalPages, currentPage, onPageClick}) => {
  return (
    <div className="pagination-container">
      <PaginationElement 
      count={totalPages}
      page={currentPage}
      shape="rounded"
      showFirstButton  
      showLastButton 
      onChange={onPageClick} />
    </div>
  )
}

export default Pagination