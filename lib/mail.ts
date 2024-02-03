import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendEmailVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmationLink = `${domain}/verify/mail/?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Please verify your email address',
    html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email address.</p>`
  });
};

export const sendPasswordVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmationLink = `${domain}/verify/key/?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Please verify your password reset',
    html: `<p>Click <a href="${confirmationLink}">here</a> to change your password.</p>`
  });
};

export const send2FAVerificationEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Please verify your 2FA code',
    html: `<p>Your code is ${token}</p>`
  });
};
