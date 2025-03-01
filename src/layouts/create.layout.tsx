import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "./create.layout.css";

interface CreateLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const CreateLayout: React.FC<CreateLayoutProps> = ({
  children,
  title = "Blend Colors",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="create-layout">
      <header className="create-layout-header">
        <button className="nav-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>{title}</h1>
        <button className="nav-button">
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
      </header>
      <main className="create-layout-content">{children || <Outlet />}</main>
    </div>
  );
};

export default CreateLayout;
