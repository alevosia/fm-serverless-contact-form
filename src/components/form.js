import React, { useReducer } from 'react'
import styles from './form.module.css'

const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE'

const INITIAL_STATE = {
	name: '',
	email: '',
	subject: '',
	body: '',
}

const formReducer = (state, action) => {
	switch (action.type) {
		case UPDATE_FIELD_VALUE:
			return {
				...state,
				[action.payload.field]: action.payload.value,
			}

		default:
			return state
	}
}

const Form = () => {
	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

	const handleSubmit = (event) => {
		event.preventDefault()

		console.log(state)
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

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
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
	)
}

export default Form
