import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { signOutAC } from "../redux/actions"

const Header = () => {
	const authToken = useSelector((state) => state.auth.token)
	const dispatch = useDispatch()

	const onSignOut = () => {
		dispatch(signOutAC())
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className='header-container'>
					<div className='header-left'>
						<NavLink to='/' className='logo'>
							POSTS
						</NavLink>
						{authToken ? (
							<NavLink to='/createPost' className='post-create_link'>
								create post
							</NavLink>
						) : null}
					</div>
					{authToken ? (
						<button onClick={() => onSignOut()}>Sign Out</button>
					) : (
						<div className='auth'>
							<NavLink to='/login'>Login</NavLink>
							<NavLink to='/register'>Sign up</NavLink>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
