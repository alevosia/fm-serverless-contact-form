import React, { useReducer } from 'react'
import styles from './form.module.css'

// action types
const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE'
const UPDATE_STATUS = 'UPDATE_STATUS'
const RESET = 'RESET'

// status
const IDLE = 'IDLE'
const PENDING = 'PENDING'
const ERROR = 'ERROR'
const SUCCESS = 'SUCCESS'

const INITIAL_STATE = {
	name: '',
	email: '',
	subject: '',
	body: '',
	status: IDLE,
}

const formReducer = (state, action) => {
	switch (action.type) {
		case UPDATE_FIELD_VALUE:
			return {
				...state,
				[action.payload.field]: action.payload.value,
			}

		case UPDATE_STATUS:
			return {
				...state,
				status: action.payload.status,
			}

		case RESET:
			return INITIAL_STATE

		default:
			return state
	}
}

const Form = () => {
	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

	const setStatus = (status) =>
		dispatch({
			type: UPDATE_STATUS,
			payload: { status },
		})

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(state)
		setStatus(PENDING)

		fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(state),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
				setStatus(SUCCESS)
			})
			.catch((error) => {
				console.error(error)
				setStatus(ERROR)
			})
	}

	// curried
	const updateFieldValue = (field) => {
		return (event) => {
			dispatch({
				type: UPDATE_FIELD_VALUE,
				payload: {
					field,
					value: event.target.value,
				},
			})
		}
	}

	if (state.status === SUCCESS) {
		return (
			<div>
				<p className={styles.success}>Message sent!</p>
				<button
					type="reset"
					onClick={() => dispatch({ type: RESET })}
					className={`${styles.button} ${styles.centered}`}
				>
					Send Again
				</button>
			</div>
		)
	}

	return (
		<>
			{state.status === ERROR && (
				<p className={styles.error}>
					Something went wrong. Please try again.
				</p>
			)}
			<form
				className={`${styles.form} ${
					state.status === PENDING && styles.pending
				}`}
				onSubmit={handleSubmit}
			>
				<label className={styles.label}>
					Name
					<input
						className={styles.input}
						type="text"
						name="name"
						onChange={updateFieldValue('name')}
						value={state.name}
					/>
				</label>
				<label className={styles.label}>
					Email
					<input
						className={styles.input}
						type="email"
						name="email"
						onChange={updateFieldValue('email')}
						value={state.email}
					/>
				</label>
				<label className={styles.label}>
					Subject
					<input
						className={styles.input}
						type="text"
						name="subject"
						onChange={updateFieldValue('subject')}
						value={state.subject}
					/>
				</label>
				<label className={styles.label}>
					Body
					<textarea
						className={styles.input}
						name="body"
						onChange={updateFieldValue('body')}
						value={state.body}
					/>
				</label>
				<button className={styles.button}>Send</button>
			</form>
		</>
	)
}

export default Form
