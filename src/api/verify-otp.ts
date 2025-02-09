async function verifyOtp(email: string, otp: number, referral?: string) {
  try {
    const response = await fetch("https://www.nointernet.in/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp, email, referral }),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify OTP: ${response.status}`);
    }

    const data = (await response.json()) as unknown as {
      email: string;
      message: string;
      referralCode: string;
    };

    return { status: response.status, data };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

export default verifyOtp;
