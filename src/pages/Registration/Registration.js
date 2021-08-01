import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Field, Form } from "react-final-form"
import { connect, useDispatch } from "react-redux"
import { Redirect } from "react-router"
import { authErrorAC, signUp } from "../../redux/actions"

const Registration = (props) => {
	const [authError, setAuthError] = useState(props.error)
	useEffect(() => {
		setAuthError(props.error)
	}, [props.error])

	const dispatch = useDispatch()
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
	const clearErr = (ms) =>
		setTimeout(() => {
			dispatch(authErrorAC())
		}, ms)

	const onSubmit = async (values) => {
		await sleep(300)
		if (values.password !== values.confirmPassword) {
			return { confirmPassword: "Passwords is not equal" }
		} else {
			const regData = {
				name: values.login,
				email: values.email,
				password: values.password,
				password_confirmation: values.confirmPassword,
			}
			props.signUp(regData)
		}
		clearErr(5000)
	}

	if (props.token) return <Redirect to='/' />

	return (
		<section className='signUp'>
			<Form
				onSubmit={onSubmit}
				validate={(values) => {
					const errors = {}
					if (!values.login) {
						errors.login = "Required"
					}
					if (!values.email) {
						errors.email = "Required"
					}
					if (!values.password) {
						errors.password = "Required"
					}
					if (!values.confirmPassword) {
						errors.confirmPassword = "Required"
					}
					return errors
				}}
				render={({
					submitError,
					handleSubmit,
					form,
					submitting,
					pristine,
					values,
				}) => (
					<form onSubmit={handleSubmit}>
						<Field name='login'>
							{({ input, meta }) => (
								<div>
									<label>Login</label>
									<input {...input} type='text' placeholder='Login' />
									{(meta.error || meta.submitError) &&
										meta.touched && (
											<span>{meta.error || meta.submitError}</span>
										)}
								</div>
							)}
						</Field>
						<Field name='email'>
							{({ input, meta }) => (
								<div>
									<label>Email</label>
									<input {...input} type='text' placeholder='Email' />
									{(meta.error || meta.submitError) &&
										meta.touched && (
											<span>{meta.error || meta.submitError}</span>
										)}
								</div>
							)}
						</Field>
						<Field name='password'>
							{({ input, meta }) => (
								<div>
									<label>Password</label>
									<input
										{...input}
										type='password'
										placeholder='Password'
									/>
									{meta.error && meta.touched && (
										<span>{meta.error}</span>
									)}
								</div>
							)}
						</Field>
						<Field name='confirmPassword'>
							{({ input, meta }) => (
								<div>
									<label>Confirm password</label>
									<input
										{...input}
										type='password'
										placeholder='Confirm password'
									/>
									{(meta.error || meta.submitError) &&
										meta.touched && (
											<span>{meta.error || meta.submitError}</span>
										)}
								</div>
							)}
						</Field>
						<span className='error'>{authError}</span>
						{submitError && <div className='error'>{submitError}</div>}
						<div className='buttons'>
							<button type='submit' disabled={submitting}>
								Sign up
							</button>
							<button
								type='button'
								onClick={form.reset}
								disabled={submitting || pristine}
							>
								Reset
							</button>
						</div>
					</form>
				)}
			/>
		</section>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		error: state.auth.error,
	}
}

const mapDispatchToProps = { signUp }

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
