import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Field, Form } from "react-final-form"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import { login } from "../../redux/actions"

const Login = (props) => {
	const [loginError, setLoginError] = useState(props.error)
	useEffect(() => {
		setLoginError(props.error)
	}, [props.error])

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	const onSubmit = async (values) => {
		await sleep(300)

		const loginData = {
			email: values.email,
			password: values.password,
		}
		props.login(loginData)
	}

	if (props.token) return <Redirect to='/' />

	return (
		<section className='login'>
			<Form
				onSubmit={onSubmit}
				validate={(values) => {
					const errors = {}
					if (!values.email) {
						errors.email = "Required"
					}
					if (!values.password) {
						errors.password = "Required"
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
						<span className='error'>{loginError}</span>
						{submitError && <div className='error'>{submitError}</div>}
						<div className='buttons'>
							<button type='submit' disabled={submitting}>
								Login
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
		error: state.auth.errorLogin,
	}
}

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
