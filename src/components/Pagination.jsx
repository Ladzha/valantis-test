import React, {useState} from 'react'

const Pagination = ({onPrevClick, onNextClick}) => {

  // const [pageNumber, setPageNumber] = useState()

  const handlePrev=()=>{
    onPrevClick()
  }

  const handleNext=()=>{
    onNextClick()
  }

  return (
    <div className="pagination-container">
      <button 
      disabled
      type="button"
      className="button left"
      onClick={()=>{onPrevClick()}}
      >
      {'<'}
      </button>
      <button 
      type="button"
      className="button right"
      onClick={handleNext}
      >
      {'>'}
      </button>
    </div>
  )
}

export default Pagination 