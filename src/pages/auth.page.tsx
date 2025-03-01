import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuthStore } from "../store/auth.store";
import "./auth.page.css";
import { Logo } from "../components/Logo";

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleEmailLogin = () => {
    // TODO: Implement email login
    console.log("Email login clicked");
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log("Google login clicked");
  };

  const handleGuestLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <Logo />
        <div className="auth-header">
          <h1>Welcome to Rang Loom</h1>
          <p>
            The lovely <FontAwesomeIcon icon={faHeart} /> color blender
          </p>
        </div>

        <div className="auth-buttons">
          <Button
            className="p-button-outlined email-button"
            onClick={handleEmailLogin}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Continue with
            Email
          </Button>

          <Button
            className="p-button-outlined google-button"
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Continue with
            Google
          </Button>

          <div className="divider">
            <span>or</span>
          </div>

          <Button
            className="p-button-text guest-button"
            onClick={handleGuestLogin}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Continue as Guest
          </Button>
        </div>

        <div className="auth-footer">
          <p>By continuing, you agree to our</p>
          <div className="auth-links">
            <a href="/terms">Terms of Service</a>
            <span> and </span>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};
