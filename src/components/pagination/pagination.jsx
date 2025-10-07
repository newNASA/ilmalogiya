import "./pagination.scss";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Agar 5 tadan kam bo‘lsa, hammasini ko‘rsatamiz
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Har doim 1 va oxirgi sahifa bo‘ladi
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      // Hozirgi sahifani atrofidagi raqamlar
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
