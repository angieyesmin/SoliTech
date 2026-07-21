import "../css/Header.css";

import {
  Bell,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="header-left">
        <h1>Home</h1>

        <p>Viernes 27 de junio de 2026</p>
      </div>

      <div className="header-right">

        <button className="notification-btn">

          <Bell size={18} />

          <span className="notification-badge">
            3
          </span>

        </button>

        <button className="profile-btn">

          <div className="avatar">
            RP
          </div>

          <div className="user-info">

            <h4>Ricardo Pacheco</h4>

            <span>Usuario</span>

          </div>

          <ChevronDown size={14} />

        </button>

      </div>

    </header>
  );
}

export default Header;