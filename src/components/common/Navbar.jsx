import React, { useEffect, useRef, useState } from "react"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"

import wisdomverse from "../../assets/Images/WisdomVerse2.png"
import { NavbarLinks } from "../../data/navbar-links"
import { ACCOUNT_TYPE } from "../../utils/constant"
import { apiConnector } from "../../services/apiconnector"
import { category } from "../../services/apis"
import ProfileDropdown from "../core/Auth/ProfileDropdown"
import { logout } from "../../services/operations/authAPI"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const menuRef = useRef(null)

  const [subLinks, setSubLinks] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { totalItems } = useSelector((state) => state.cart)

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const res = await apiConnector("GET", category.CATEGORY_URL)
        setSubLinks(res.data.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchSublinks()
  }, [])

  /* ---------------- CLOSE MENU ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setIsMenuOpen(false)
    setIsCatalogOpen(false)
  }, [location.pathname])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsCatalogOpen(false)
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-14 border-b border-b-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
        }`}
      >
        <div className="mx-auto flex h-full w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={wisdomverse}
              alt="logo"
              className="h-[55px] w-[160px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, i) => (
                <li key={i}>
                  {link.title === "Catalog" ? (
                    <div className="group relative">
                      <div className="flex cursor-pointer items-center gap-1">
                        Catalog <BsChevronDown />
                      </div>
                      <div className="invisible absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 translate-y-6 rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
                        {subLinks
                          ?.filter((c) => c.courses?.length > 0)
                          .map((c, i) => (
                            <Link
                              key={i}
                              to={`/Catalog/${c.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block rounded-lg px-3 py-2 hover:bg-richblack-50"
                            >
                              {c.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path} className="hover:text-yellow-25">
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {!token && (
              <>
                <Link to="/login">
                  <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-25">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-25">
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {token && <ProfileDropdown />}
          </div>

          {/* Menu Icon */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen((p) => !p)}
          >
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      </div>

      {/* ================= BACKDROP ================= */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-richblack-900/60 backdrop-blur-md transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ================= MOBILE / MD MENU ================= */}
      <div
        ref={menuRef}
        className={`fixed top-14 left-0 z-50 w-full bg-richblack-800 border-t border-richblack-700 shadow-2xl transition-all duration-300 ease-out lg:hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-5 text-richblack-25">
          {/* -------- LOGGED IN -------- */}
          {token && (
            <>
              {/* Profile Header */}
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={user?.image}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <Link
                    to="/dashboard/my-profile"
                    onClick={closeMenu}
                    className="text-xs text-richblack-300 hover:text-yellow-25"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* MD ONLY */}
              <div className="hidden md:flex flex-col gap-3">
                <Link to="/dashboard/my-profile" onClick={closeMenu}>Dashboard</Link>

                {user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link
                    to="/dashboard/cart"
                    onClick={closeMenu}
                    className="flex items-center gap-2"
                  >
                    Cart
                    {totalItems > 0 && (
                      <span className="ml-auto rounded-full bg-richblack-600 px-2 text-xs text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}

                <button
                  onClick={() => {
                    dispatch(logout(navigate))
                    closeMenu()
                  }}
                  className="text-left text-pink-200"
                >
                  Logout
                </button>
              </div>

              {/* SM ONLY */}
              <div className="md:hidden">
                <div className="mb-4 flex flex-col gap-3">
                  <Link to="/dashboard/my-profile" onClick={closeMenu}>Dashboard</Link>

                  {user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link
                      to="/dashboard/cart"
                      onClick={closeMenu}
                      className="flex items-center gap-2"
                    >
                      Cart
                      {totalItems > 0 && (
                        <span className="ml-auto rounded-full bg-richblack-600 px-2 text-xs text-yellow-100">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      dispatch(logout(navigate))
                      closeMenu()
                    }}
                    className="text-left text-pink-200"
                  >
                    Logout
                  </button>
                </div>

                <div className="my-4 border-t border-richblack-700" />

                <ul className="flex flex-col gap-4">
                  <Link to="/" onClick={closeMenu}>Home</Link>

                  <button
                    onClick={() => setIsCatalogOpen((p) => !p)}
                    className="flex items-center justify-between"
                  >
                    Catalog
                    <BsChevronDown
                      className={`transition-transform ${
                        isCatalogOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`ml-4 overflow-hidden rounded-md bg-richblack-900 transition-all duration-300 ${
                      isCatalogOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {subLinks
                      ?.filter((c) => c.courses?.length > 0)
                      .map((c, i) => (
                        <Link
                          key={i}
                          to={`/Catalog/${c.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-richblack-700"
                          onClick={closeMenu}
                        >
                          {c.name}
                        </Link>
                      ))}
                  </div>

                  <Link to="/about" onClick={closeMenu}>About Us</Link>
                  <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
                </ul>
              </div>
            </>
          )}

          {/* -------- LOGGED OUT -------- */}
          {!token && (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={closeMenu}>Log in</Link>
              <Link to="/signup" onClick={closeMenu}>Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
