import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="navbar bg-primary p-4 text-white">
        <div className="navbar-start">
          <h1 className="text-2xl font-bold">
            <Link to="/">LOGO</Link>
          </h1>
        </div>
        <div className="navbar-end">
          {/* ทำปุ่ม ในโทรศัพท์ */}
          <div className="dropdown dropdown-end">
            {/* ปุ่ม ในโทรศัพท์ */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>{" "}
            </div>
            {/*เมนู เมื่อจอโทรศัพท์ */}
            <ul
              tabIndex={0}
              className="text-black dropdown-content menu menu-sm z-1 mt-3 w-52 p-2  rounded-box  bg-primary-content flex"
            >
              <li>
                <Link to="/">จดหมาย</Link>
              </li>
              <li>
                <Link to="/edit">แก้ไข</Link>
              </li>
            </ul>
          </div>
          {/*dropdown */}
          {/* ทำปุ่ม ในคอมพิวเตอร์ */}
          <div className="hidden lg:flex">
            <Link to="/" className="btn btn-ghost text-xl">
              จดหมาย
            </Link>
            <Link to="/edit" className="btn btn-ghost text-xl">
              แก้ไข
            </Link>
          </div>
        </div>{" "}
        {/*navbar-end */}
      </nav>
    </>
  );
}
