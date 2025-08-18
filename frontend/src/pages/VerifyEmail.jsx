import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function VerifyEmail({email}) {
    const [otp, setOtp] = useState("")
    const [message, setMessage] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [skip, setSkip] = useState(false)

    const navigate = useNavigate()

    const handleOTPSending = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.get("http://localhost:9000/api/Users/OTPsender")
            setMessage("OTP sent Successfully!")
        } catch (error) {
            setMessage("Failed to send OTP")
            console.log(error)
        }
    }

    const handleResend = async() => {
        try {
            await axios.get("http://localhost:9000/api/Users/OTPsender")
            setMessage("OTP resent Successfully!")
        } catch(error) {
            setMessage("failed to resend OTP")
            console.log(error)
        }
    }

    const handleOTPVerification = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/api/Users/OTPVerification",{otp})
            setMessage("OTP verified Successfully!")
            navigate("/Dashboard")
        } catch (error) {
            setMessage("Wrong OTP")
            console.log(error)
        }
    }

    const handleSkip = async (e) => {
        e.preventDefault()

        try{
            navigate("/DashBoard")
        }
        catch(error) {
            console.log("Can't navigate to Dashboard")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-lg shadow-gray-500/80">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold text-center mb-4">Verify Your Email</h2>
                <p className="text-sm text-gray-500 text-center mb-4">Enter the OTP</p>

                {!otpSent && (<form onSubmit={handleOTPSending}>
                    <input 
                    type="email"
                    value={email}
                    readOnly
                    className="w-full p-2 mb-4 border rounded"
                    />

                    <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >Send OTP</button>

                    
                </form>)}

                {otpSent && (
                    <>
                        <button
                        onClick={handleResend}
                        className="w-full mt-3 text-blue-500 underline"
                        >Resend OTP</button>
                        

                        <form onSubmit={handleOTPVerification}
                        className="mt-4">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full p-2 mb-2 border rounded"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Submit OTP
                            </button>
                        </form>
                    </>
                )}

                {message && (
                <p className="text-center text-sm mt-3 text-gray-700">{message}</p>
                )}
            </div>

            <div>
                <button
                    className="bg-blue-500 text-blue hover:bg-blue-600 mt-3 text-white"
                    onClick={handleSkip}
                >Skip</button>
            </div>

        </div>
    )
}


export default VerifyEmail