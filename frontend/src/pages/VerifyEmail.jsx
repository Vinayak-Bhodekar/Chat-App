import React, {useState} from "react";
import axios from "axios";

function VerifyEmail({email}) {
    const [otp, setOtp] = useState("")
    const [message, setMessage] = useState("")

    const handleOTPSending = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.get("")
        } catch (error) {
            
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-lg shadow-gray-500/80">
            <div className="bg-whie p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold text-center mb-4">Verify Your Email</h2>
                <p className="text-sm text-gray-500 text-center mb-4">Enter the OTP</p>

                <form onSubmit={handleOTPSending}>
                    <input 
                    type="email"
                    value={email}
                    readOnly
                    className="w-full p-2 mb-4 border rounded"
                    />

                    <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >Change</button>

                    <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >Send OTP</button>
                </form>

                <button
                onClick={handleResend}
                className="w-full mt-3 text-blue-500 underline"
                >Resend OTP</button>   

                {message && (
                <p className="text-center text-sm mt-3 text-gray-700">{message}</p>
                )}
            </div>

        </div>
    )
}