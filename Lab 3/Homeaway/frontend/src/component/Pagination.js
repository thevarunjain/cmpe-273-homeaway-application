import React from 'react';
import _ from "lodash";

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange} = props;
 // console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if(pagesCount === 1) return null;
  const pages = _.range(1,pagesCount+1); //return an array

  return (
    <div>
      <nav> 
        <ul className="pagination">
        {pages.map(page => (
          <li className={page === currentPage ? "page-item active" : "page-item "} key= {page}>
          <a className="page-link" onClick={()=>{onPageChange(page)}}>{page}</a>
          </li>
        ))}
        </ul>
      </nav>
    </div>
  )
}
export default Pagination;
 