export const EMAIL_VERIFY_TEMPLATE = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Verify your email</h2>
    <p>Use this OTP to verify your account for {{email}}.</p>
    <h1 style="letter-spacing: 4px;">{{otp}}</h1>
    <p>This OTP is valid for 24 hours.</p>
  </div>
`

export const PASSWORD_RESET_TEMPLATE = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Reset your password</h2>
    <p>Use this OTP to reset the password for {{email}}.</p>
    <h1 style="letter-spacing: 4px;">{{otp}}</h1>
    <p>This OTP is valid for 15 minutes.</p>
  </div>
`
