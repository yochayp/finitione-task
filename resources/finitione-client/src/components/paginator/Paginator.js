const Paginator = ({ links, page, setPage, totalPages }) => {
  return (
    <>
      <nav aria-label="Page navigation" >
        <ul className="pagination justify-content-center" >
          <li className={`shadow page-item ${page == 1 ? 'disabled' : ''}`}>
            <a className="page-link"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}

            >Previous</a>
          </li>
          {links?.map((link,i) => {
            if (!isNaN(link.label)) {
              return <li key={i} className={`shadow page-item ${link.active ? 'active' : ''}`}><a className="page-link" onClick={() => setPage(link.label)}>{link.label}</a></li>
            }
          })}
          <li className={`page-item ${page == totalPages ? 'disabled' : ''}`}>
            <a className="page-link shadow"
              onClick={() => setPage((prev) => prev + 1)}
            >Next</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Paginator;