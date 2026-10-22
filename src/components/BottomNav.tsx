import { BarChart3, Calendar, House } from "lucide-react";
import { NavLink } from "react-router";

export const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : undefined)}>
        <House size={22} />
        ホーム
      </NavLink>
      <NavLink to="/calendar" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
        <Calendar size={22} />
        カレンダー
      </NavLink>
      <NavLink to="/analysis" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
        <BarChart3 size={22} />
        分析
      </NavLink>
    </nav>
  );
};