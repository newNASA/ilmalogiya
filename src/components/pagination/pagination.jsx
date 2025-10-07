import "./pagination.scss";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagination">
      {/* Boshiga o'tish */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="first-last-btn"
      >
        « First
      </button>

      {/* Oldingi sahifa */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>

      {/* Raqamli sahifalar */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}

      {/* Keyingi sahifa */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>

      {/* Oxiriga o'tish */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="first-last-btn"
      >
        Last »
      </button>
    </div>
  );
};

export default Pagination;
