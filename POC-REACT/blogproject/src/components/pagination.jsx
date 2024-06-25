import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const showPagesInfo = totalPages > 0 ? `Showing ${currentPage} out of ${totalPages} pages` : "No posts to display";

  return (
    <div className="pagination">
      <div className="pagination-info">{showPagesInfo}</div>
      <div className="pagination-buttons">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        {pageNumbers.map((index) => (
          <button
            key={index}
            className={currentPage === index ? "active" : ""}
            onClick={() => onPageChange(index)}
          >
            {index}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
