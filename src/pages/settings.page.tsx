import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faLock,
  faMoon,
  faGlobe,
  faCircleQuestion,
  faMessage,
  faRightFromBracket,
  faChevronRight,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./settings.page.css";
import { MainLayout } from "../layouts/main.layout";

interface SettingsUser {
  name: string;
  email: string;
}

export function SettingsPage() {
  const user: SettingsUser = {
    name: "John Cooper",
    email: "john.cooper@example.com",
  };

  return (
    <MainLayout title="Settings">
      <div className="settings-page">
        <div className="user-profile">
          <div className="avatar">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <section className="settings-section">
          <h3>ACCOUNT</h3>
          <div className="settings-list">
            <button className="settings-item">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile Information</span>
              <FontAwesomeIcon icon={faChevronRight} className="chevron" />
            </button>
            <button className="settings-item">
              <FontAwesomeIcon icon={faBell} />
              <span>Notifications</span>
              <FontAwesomeIcon icon={faChevronRight} className="chevron" />
            </button>
            <button className="settings-item">
              <FontAwesomeIcon icon={faLock} />
              <span>Privacy & Security</span>
              <FontAwesomeIcon icon={faChevronRight} className="chevron" />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>APP SETTINGS</h3>
          <div className="settings-list">
            <div className="settings-item">
              <FontAwesomeIcon icon={faMoon} />
              <span>Dark Mode</span>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <button className="settings-item">
              <FontAwesomeIcon icon={faGlobe} />
              <span>Language</span>
              <div className="language-select">
                <span>English</span>
                <FontAwesomeIcon icon={faChevronRight} className="chevron" />
              </div>
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>SUPPORT</h3>
          <div className="settings-list">
            <button className="settings-item">
              <FontAwesomeIcon icon={faCircleQuestion} />
              <span>Help Center</span>
              <FontAwesomeIcon icon={faChevronRight} className="chevron" />
            </button>
            <button className="settings-item">
              <FontAwesomeIcon icon={faMessage} />
              <span>Contact Support</span>
              <FontAwesomeIcon icon={faChevronRight} className="chevron" />
            </button>
          </div>
        </section>

        <button className="sign-out-button">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Sign Out</span>
        </button>
      </div>
    </MainLayout>
  );
}
