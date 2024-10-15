const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pathakteja@gmail.com',
		pass: 'oqhbqnoalzrjvjfv'
	}
});

// Function to send an email
// const sendMail = (email, subject, html) => {
// 	const mailOptions = {
// 		from: process.env.EMAIL_USER,
// 		to: email,
// 		subject: subject,
// 		// text: `Hello ${name},\n\n${message}`, // Plain text body
// 		html: html


// 	};

// 	// Send mail
// 	transporter.sendMail(mailOptions, (error, info) => {
// 		if (error) {
// 			console.error('Error occurred while sending email:', error);
// 			// Check if the error has a specific code
// 			if (error.response) {
// 				console.error('Error response:', error.response);
// 			}
// 			return; // Exit the function on error
// 		}

// 		// Success message
// 		console.log(`Email sent successfully: ${info.response}`);
// 	});
// };

const sendMail = (emails, subject, html) => {
	emails.forEach((email) => {
		const mailOptions = {
			from: 'pathakteja@gmail.com',
			to: email,
			subject: subject,
			html: html
		};

		// Send mail
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(`Error occurred while sending email to ${email}:`, error);
				if (error.response) {
					console.error('Error response:', error.response);
				}
				return; // Continue to next email
			}

			// Success message for each email
			console.log(`Email sent successfully to ${email}: ${info.response}`);
		});
	});
};

module.exports = sendMail;
