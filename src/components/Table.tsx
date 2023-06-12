import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

type RaceResult = {
	grand_prix: string
	date: string
	winner: string
	car: string
	laps: number
	time: string
}

function Table() {
	const [allResults, setAllResults] = useState([] as RaceResult[])

	const [filterResults, setFilterResults] = useState([] as RaceResult[])
	const [years, setYears] = useState(['all'])
	const [currentPage, setCurrentPage] = useState(1)
	const [resultsPerPage] = useState(10)

	const [filter, setFilter] = useState({
		year: 'all',
		grand_prix: '',
		winner: '',
		car: '',
	})

	const indexOfLastPost = currentPage * resultsPerPage
	const indexOfFirstPost = indexOfLastPost - resultsPerPage
	const currentResults = filterResults.slice(indexOfFirstPost, indexOfLastPost)
	const totalPage = Math.ceil(filterResults.length / resultsPerPage)

	const paginate = ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1)
	}

	const handleFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const name = e.target.name
		const value = e.target.value
		setFilter({ ...filter, [name]: value })
	}

	const fetchRaceResults = async () => {
		try {
			const res = await fetch(`http://localhost:3000/race_results`)
			const data = await res.json()
			setAllResults(data)
			setFilterResults(data)
		} catch (error) {
			console.log(error)
		}
	}

	const filterRace = () => {
		const { year, grand_prix, winner, car } = filter
		let tempResults = [...allResults]
		if (year !== 'all') {
			tempResults = tempResults.filter((item) => item.date.includes(year))
		}
		if (grand_prix) {
			tempResults = tempResults.filter((item) => item.grand_prix.toLowerCase().includes(grand_prix.toLowerCase()))
		}
		if (winner) {
			tempResults = tempResults.filter((item) => item.winner.toLowerCase().includes(winner.toLowerCase()))
		}
		if (car) {
			tempResults = tempResults.filter((item) => item.car.toLowerCase().includes(car.toLowerCase()))
		}
		setFilterResults(tempResults)
	}

	const fetchListYears = async () => {
		try {
			const res = await fetch(`http://localhost:3000/years`)
			const data = await res.json()
			setYears(['all', ...data])
		} catch (error) {
			console.log(error)
		}
	}

	const clearFilter = () => {
		setFilter({
			year: 'all',
			grand_prix: '',
			winner: '',
			car: '',
		})
	}

	useEffect(() => {
		filterRace()
		setCurrentPage(1)
	}, [filter])

	useEffect(() => {
		fetchRaceResults()
		fetchListYears()
	}, [])

	return (
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
			<div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
					<div className="px-6 py-4 grid gap-3 xl:flex xl:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
						<div>
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">RACE RESULTS</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">{filterResults.length} results</p>
						</div>

            <div className="flex flex-col gap-2 lg:flex-row justify-center items-center">
              {/* select years */}
              <select
                className="w-full lg:w-auto py-2 px-3 pr-9 block border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                name="year"
                onChange={handleFilter}
                value={filter.year}
              >
                {years &&
                  years.map((item, i) => {
                    if (item === 'all')
                      return (
                        <option key={i} value={item}>
                          Anytime
                        </option>
                      )
                    return (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    )
                  })}
              </select>
              {/* search grand */}
              <div className="relative w-full lg:w-auto">
                <input
                  type="text"
                  id="search-brand"
                  name="grand_prix"
                  className="w-full py-2 px-4 pl-11 block border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Search grand prix"
                  onChange={handleFilter}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
              {/* search winner */}
              <div className="relative w-full lg:w-auto">
                <input
                  type="text"
                  id="search-winner"
                  name="winner"
                  className="w-full py-2 px-4 pl-11 block border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Search winner"
                  onChange={handleFilter}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
              {/* search brand */}
              <div className="relative w-full lg:w-auto">
                <input
                  type="text"
                  id="search-car"
                  name="car"
                  className="w-full py-2 px-4 pl-11 block border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Search car"
                  onChange={handleFilter}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
              {/* clear filter */}
              <button
                type="button"
                className="py-2 px-4 inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-8000"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
					</div>

					<div className="-m-1.5 mb-0 lg:-mb-1.5  overflow-x-auto">
						<div className="p-1.5 min-w-full inline-block align-middle">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-slate-50 dark:bg-slate-800">
									<tr>
										<th scope="col" className="pl-6 py-3 text-left">
											<div className="flex items-center gap-x-2">
												<span className="text-xs uppercase font-normal tracking-wide text-gray-400 dark:text-gray-200">
													GRAND PRIX
												</span>
											</div>
										</th>

										<th scope="col" className="px-6 py-3 text-left">
											<div className="flex items-center gap-x-2">
												<span className="text-xs uppercase font-normal tracking-wide text-gray-400 dark:text-gray-200">
													DATE
												</span>
											</div>
										</th>

										<th scope="col" className="px-6 py-3 text-left">
											<div className="flex items-center gap-x-2">
												<span className="text-xs uppercase font-normal tracking-wide text-gray-400 dark:text-gray-200">
													WINNER
												</span>
											</div>
										</th>

										<th scope="col" className="px-6 py-3 text-left">
											<div className="flex items-center gap-x-2">
												<span className="text-xs uppercase font-normal tracking-wide text-gray-400 dark:text-gray-200">
													CAR
												</span>
											</div>
										</th>

										<th scope="col" className="px-6 py-3 text-left">
											<div className="flex items-center gap-x-2">
												<span className="text-xs uppercase font-normal tracking-wide text-gray-400 dark:text-gray-200">
													LAPS
												</span>
											</div>
										</th>

										<th scope="col" className="px-6 py-3 text-right">
											<div className="flex items-center gap-x-2">
												<span className="text-xs uppercase font-normal tracking-wide text-gray-400 dark:text-gray-200">
													TIME
												</span>
											</div>
										</th>
									</tr>
								</thead>

								<tbody className="">
									{currentResults &&
										currentResults.map((result: RaceResult, index) => {
											return (
												<tr
													key={index}
													className="odd:bg-white hover:bg-gray-100 dark:odd:bg-gray-800 dark:hover:bg-gray-700"
												>
													<td className="h-px w-px whitespace-nowrap">
														<div className="px-6 py-4">
															<span className="text-sm text-gray-700">
																{result.grand_prix}
															</span>
														</div>
													</td>
													<td className="h-px w-72 whitespace-nowrap">
														<div className="px-6 py-4">
															<span className="text-sm text-gray-500">{result.date}</span>
														</div>
													</td>
													<td className="h-px w-72 whitespace-nowrap">
														<div className="px-6 py-4">
															<span className="text-sm text-gray-700">
																{result.winner}
															</span>
														</div>
													</td>
													<td className="h-px w-72 whitespace-nowrap">
														<div className="px-6 py-4">
															<span className="text-sm text-gray-700">{result.car}</span>
														</div>
													</td>
													<td className="h-px w-72 whitespace-nowrap">
														<div className="px-6 py-4">
															<span className="text-sm text-gray-800">{result.laps}</span>
														</div>
													</td>
													<td className="h-px w-72 whitespace-nowrap">
														<div className="px-6 py-4">
															<span className="text-sm text-gray-800">{result.time}</span>
														</div>
													</td>
												</tr>
											)
										})}
								</tbody>
							</table>
						</div>
					</div>

          <div className="px-6 py-4 grid gap-3 md:flex md:justify-center md:items-center border-t border-gray-200 dark:border-gray-700">
            <div>
              <ReactPaginate
                onPageChange={paginate}
                pageCount={totalPage}
                forcePage={currentPage - 1}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                breakLabel="···"
                previousLabel={'←'}
                nextLabel={'→'}
                containerClassName={'pagination flex justify-center items-center space-x-2'}
                pageLinkClassName={
                  'w-8 h-8 text-sm text-gray-500 hover:border hover:rounded-md flex justify-center items-center gap-2'
                }
                previousLinkClassName={
                  'w-8 h-8 text-sm flex justify-center items-center rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                }
                nextLinkClassName={
                  'w-8 h-8 text-sm flex justify-center items-center rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                }
                activeLinkClassName={'active pointer-events-none rounded-md border shadow-sm'}
                disabledLinkClassName={'text-gray-400 pointer-events-none'}
              />
            </div>
          </div>
			</div>
		</div>
	)
}
export default Table
