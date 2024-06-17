import React from 'react'
import { Menu, X } from 'lucide-react'
import { LogoIcon } from './Footer'

const menuItems = [
	{
		name: 'CLI',
		href: '#cli',
	},
]

function Logo() {
	return (
		<div className="inline-flex items-center space-x-2">
			<span>
				<LogoIcon/>
			</span>
			<span className="font-bold">emozi</span>
		</div>
	)
}

function DesktopMenu() {
	return (
		<div className="hidden grow items-start lg:flex">
			<ul className="ml-12 inline-flex space-x-8">
				{menuItems.map((item) => (
					<li key={item.name}>
						<a
							href={item.href}
							className="text-sm font-semibold text-white hover:underline"
						>
							{item.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

function MobileMenu({ toggleMenu }: { toggleMenu: () => void }) {
	return (
		<div className="lg:hidden">
			<Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
		</div>
	)
}

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<div className="relative w-full bg-dark">
			<div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
				<Logo />
				<DesktopMenu />
				<div className="hidden lg:block">
					<button
						type="button"
						className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
						onClick={() =>
							window.open(
								'https://github.com/shravanasati/emozi-website',
								'_blank'
							)
						}
					>
						GitHub
					</button>
				</div>
				<MobileMenu toggleMenu={toggleMenu} />
				{isMenuOpen && (
					<div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
						<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="px-5 pb-6 pt-5">
								<div className="flex items-center justify-between">
									<Logo />
									<div className="-mr-2">
										<button
											type="button"
											onClick={toggleMenu}
											className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
										>
											<span className="sr-only">Close menu</span>
											<X className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>
								</div>
								<div className="mt-6">
									<nav className="grid gap-y-4">
										{menuItems.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
											>
												<span className="ml-3 text-base font-medium text-gray-900">
													{item.name}
												</span>
											</a>
										))}
									</nav>
								</div>
								<button
									type="button"
									className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
									onClick={() =>
										window.open(
											'https://github.com/shravanasati/emozi-website',
											'_blank'
										)
									}
								>
									GitHub
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
