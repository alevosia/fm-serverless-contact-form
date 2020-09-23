require('dotenv').config()

const mailgun = require('mailgun-js')

const mg = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
})

exports.handler = (event, _context, callback) => {
	console.log({ body: event.body })

	const data = JSON.parse(event.body)

	const email = {
		from: 'John Doe <john.doe@gmail.com>',
		to: `${data.name} <${data.email}>`,
		subject: data.subject,
		text: data.body,
	}

	mg.messages().send(email, (error, response) => {
		callback(error, {
			statusCode: 200,
			body: JSON.stringify(response),
		})
	})
}
