function Hero() {
	return (
		<div className="relative overflow-hidden">
			<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="mt-5 max-w-3xl text-center mx-auto">
					<h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
						Race Results{' '}
						<span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent uppercase">
							Formula1
						</span>
					</h1>
					<p className="mt-3 text-lg text-gray-800 dark:text-gray-400">
						Enter the world of Formula 1. Your go-to source for the latest F1 news, video highlights, GP
						results, live timing, in-depth analysis and expert commentary.
					</p>
				</div>

				<div className="mt-10 relative max-w-5xl mx-auto">
					<div className="w-full object-cover h-96 sm:h-[480px] bg-[url('./hero.webp')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

					<div className="absolute bottom-12 -left-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
						<div className="bg-white w-48 h-48 rounded-lg dark:bg-slate-900"></div>
					</div>

					<div className="absolute -top-12 -right-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
						<div className="bg-white w-48 h-48 rounded-full dark:bg-slate-900"></div>
					</div>
				</div>
			</div>
		</div>

		// <div className="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('../svg/component/polygon.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('../svg/component/polygon-dark.svg')]">

		// 	<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-10">
		// 		<div className="mt-5 max-w-3xl text-center mx-auto">
		// 			<h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
		// 				Race Results{' '}
		// 				<span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent uppercase">
		// 					Formula1
		// 				</span>
		// 			</h1>
		// 		</div>

		// 		<div className="mt-5 max-w-3xl text-center mx-auto">
		// 			<p className="text-lg text-gray-600 dark:text-gray-400">
		// 				Enter the world of Formula 1. Your go-to source for the latest F1 news, video highlights, GP
		// 				results, live timing, in-depth analysis and expert commentary.
		// 			</p>
		// 		</div>

		// 		<div className="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center">
		// 			<a
		// 				className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
		// 				href="#"
		// 			>
		// 				Get started
		// 			</a>
		// 			<a
		// 				className="relative group inline-flex justify-center items-center gap-x-3.5 text-center bg-white border hover:border-gray-300 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:bg-slate-900 dark:border-gray-800 dark:hover:border-gray-600 dark:shadow-slate-700/[.7] dark:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
		// 				href="#"
		// 			>
		// 				Contact now
		// 			</a>
		// 		</div>
		// 	</div>
		// </div>
	)
}
export default Hero
