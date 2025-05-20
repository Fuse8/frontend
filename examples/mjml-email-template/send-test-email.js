import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs/promises'

dotenv.config()

async function sendTestEmail() {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: true, // true для 465, false для других портов
		auth: {
			user: process.env.SEND_FROM_EMAIL,
			pass: process.env.SEND_FROM_EMAIL_PASSWORD,
		},
	})

	const htmlEmailString = await fs.readFile(
		`./templates/${process.env.TEMPLATE_NAME}.html`,
		'utf-8'
	)

	// Опции письма
	const mailOptions = {
		from: `"Test Sender" <${process.env.SEND_FROM_EMAIL}>`,
		to: process.env.SEND_TO_EMAIL,
		subject: 'Test HTML Email',
		html: htmlEmailString,
	}

	const info = await transporter.sendMail(mailOptions)
	console.log('Message sent: %s', info.messageId)
}

sendTestEmail().catch(console.error)
