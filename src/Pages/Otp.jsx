import axios from "axios";
import { API } from "../GlopbalApi/GlobalApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../Styles/otp.css"
import { toast } from "react-toastify";

export const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (index < otp.length - 1 && e.target.value !== "") {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const OTP = otp.join("");
      const { data } = await axios.post(`${API}/auth/otp/verification`, {
        userId: userId,
        otp: OTP,
      });
      if (data.successStatus) {
        navigate(`/${userId}/home`);
        window.localStorage.setItem("token",data.token)
        setOtp(["", "", "", "", "", ""]);
        toast.success("user verified sucessfully",{autoClose:5000,closeOnClick:true})
      } else {
        setOtp(["", "", "", "", "", ""]);
        toast.error("Verification failed. try again.",{autoClose:5000,closeOnClick:true})
      }
    } catch (error) {
        setOtp(["", "", "", "", "", ""]);
      navigate("/login");
      toast.error("Verification failed. try again.",{autoClose:5000,closeOnClick:true})
    }
  };

  return (
    <div className="container otp">
      <h2>Enter OTP</h2>
      <div className="otp-container">
        {otp.map((ele, index) => (
          <input
            key={index}
            type="text"
            value={ele}
            onChange={(e) => handleInputChange(e, index)}
            maxLength="1"
            id={`otp-input-${index}`}
            tabIndex={index + 1}
          />
        ))}
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};
