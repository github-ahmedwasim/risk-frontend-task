import { useState } from 'react'
import ReactPaginate from 'react-paginate'

import { ITEMS_PER_PAGE } from '../utils/constants'

const TableHeader = ({ title }) => (
  <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    {title}
  </th>
)

const TableData = ({ title }) => (
  <td className='px-6 w-[20vw] py-4 max-w-[20vw] whitespace-nowrap text-slate-400 text-ellipsis overflow-hidden'>
    {title}
  </td>
)

const CryptoTable = ({ data, heading }) => {
  const [currentPage, setCurrentPage] = useState(0)

  const offset = currentPage * ITEMS_PER_PAGE
  const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE)
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE)

  const handlePageChange = ({ selected }) => setCurrentPage(selected)

  return (
    <>
      <h1 className='text-white text-2xl sm:text-5xl py-2 text-center text-gradient m-5 sm:m-10'>
        {heading}
      </h1>
      <div className='max-w-6xl mx-auto overflow-x-auto shadow-2xl max-w-[90%] shadow-slate-600'>
        <div className='bg-gray shadow overflow-hidden sm:rounded-lg'>
          <div className='min-w-full overflow-x-auto'>
            <table className='min-w-max divide-y divide-gray-200'>
              <thead className='bg-gray'>
                <tr>
                  <TableHeader title='Maker Token' />
                  <TableHeader title='Taker Token' />
                  <TableHeader title='Maker Amount' />
                  <TableHeader title='Taker Amount' />
                  <TableHeader title='Maker' />
                  <TableHeader title='Taker' />
                </tr>
              </thead>
              {data.length === 0 ? (
                <tbody>
                  <tr>
                    <td className='px-6 py-4 text-center text-white' colSpan={6}>
                      No Order To Show
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className='bg-gray-900 divide-y divide-gray-200'>
                  {currentPageData?.map((record, index) => (
                    <tr key={index}>
                      <TableData title={record.makerToken} />
                      <TableData title={record.takerToken} />
                      <TableData title={record.makerAmount} />
                      <TableData title={record.takerAmount} />
                      <TableData title={record.maker} />
                      <TableData title={record.taker} />
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      <div className='h-10' />

     {data.length > 0 &&
		  	<ReactPaginate
					previousLabel={'Prev'}
					nextLabel={'Next'}
					breakLabel={'...'}
					breakClassName={'break-me'}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName={'flex justify-center'}
					pageClassName={'mx-1 pl-4 pr-4 rounded border-solid border-2 border-gray-600 text-white'}
					previousClassName={'mx-1 pl-4 pr-4 rounded border-solid border-2 border-gray-600 text-white'}
					nextClassName={'mx-1 pl-4 pr-4 rounded border-solid border-2 border-gray-600 text-white'}
					activeClassName={'bg-gray-600 pl-1 pr-1 rounded text-white'}
				/>
			}
    </>
  )
}

export default CryptoTable
