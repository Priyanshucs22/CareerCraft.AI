import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-200 px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">Career Planner</Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
            <button onClick={logout} className="btn btn-error">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
