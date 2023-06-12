import heroImg from '../assets/hero.webp'

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
					<div className="w-full h-96 sm:h-[480px] rounded-xl overflow-hidden">
            <img src={heroImg} alt="hero image" className='w-full h-full object-cover object-center'/>
          </div>

					<div className="absolute bottom-12 -left-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
						<div className="bg-white w-48 h-48 rounded-lg dark:bg-slate-900"></div>
					</div>

					<div className="absolute -top-12 -right-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
						<div className="bg-white w-48 h-48 rounded-full dark:bg-slate-900"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Hero
