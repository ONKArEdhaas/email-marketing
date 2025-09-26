const nodemailer = require('nodemailer');
require('dotenv').config();

const senderAccounts = [
	{
		email: 'edhaasinfo@gmail.com',
		password: 'kbevqoffzcmjcxex'
	},
	{
		email: 'pathakteja@gmail.com',
		password: 'oqhbqnoalzrjvjfv'
	},
	{
		email: 'sales.edhaasedu@gmail.com',
		password: 'vadkwdiboselmyvk'
	},
	{
		email: 'sale.edhaasman@gmail.com',
		password: 'cbkouyjbzqlftfki'
	},
	{
		email: 'sales.edhaas11@gmail.com',
		password: 'aopnerrureevonmd'
	},
];

const sendMail = (emails, subject, html, senderMail) => {
	// Find the account corresponding to senderMail
	const account = senderAccounts.find(item => item.email === senderMail);

	if (!account) {
		console.error('Sender email not found in senderAccounts.');
		return;
	}

	// Create a transporter using the found account's credentials
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: account.email,
			pass: account.password
		}
	});

	emails.forEach((email) => {
		const mailOptions = {
			from: senderMail,
			to: email,
			subject: subject,
			html: html
		};

		// Send mail using the transporter created with the selected sender credentials
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(`Error occurred while sending email to ${email}:`, error);
				if (error.response) {
					console.error('Error response:', error.response);
				}
				return; // Continue to next email
			}
			console.log(`Email sent successfully to ${email}: ${info.response}`);
		});
	});
};

module.exports = sendMail;
