import React from 'react';
import './Pagination.scss'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';


const Pagination = ({ currentPage, totalPages, goToPage }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FiArrowLeft />
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    disabled={pageNumber === currentPage}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FiArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
