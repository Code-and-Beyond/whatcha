import logo from '../../assets/Logos/company_logo.png'

const LeftNavHeader = () => {
	return (
		<div className='header'>
			<img src={ logo } className="header__logo u-c-pointer" alt='company logo' />
			<h1>Icon2</h1>
			<h1>Icon3</h1>
		</div>
	)
}

export default LeftNavHeader
