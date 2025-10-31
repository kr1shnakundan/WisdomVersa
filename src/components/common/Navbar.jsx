import React, { useEffect } from 'react'
import { Link, matchPath } from 'react-router-dom'
import wisdomverse from '../../assets/Images/WisdomVerse2.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useState  } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constant'
import { AiOutlineShoppingCart ,AiOutlineMenu } from 'react-icons/ai'
import { apiConnector } from '../../services/apiconnector'
import { category } from '../../services/apis'

// ---------------------------------NAVBAR IS COMPLEX, STUDY AGAIN---------------------------------
const Navbar = () => {

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  const {user} = useSelector((state) =>state.profile);
  const {token} = useSelector((state) =>state.auth);
  const {totalItems} = useSelector((state) =>state.cart);

  const location = useLocation();


  const fetchSublinks = async() =>{
    setLoading(true);
    try{
      const result = await apiConnector("GET" , category.CATEGORY_URL);
      // console.log("Printing Sublink result : ",result);
      // console.log("subLink is : ",subLinks);  
      setSubLinks(result.data.data);
      // console.log("subLink after update is : ",subLinks);
    } catch(error){
      console.log("could not fetch category detail : ",error)
    }
    setLoading(false);
  }

  useEffect (() =>{
    fetchSublinks();
    //  console.log("subLink in useEffect is : ",subLinks);
  },[])

  console.log("sublink after useEffect is :",subLinks);

  const matchRoute =(route) =>{
    return matchPath({path:route} ,location.pathname)
  }


  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}>
      <div className='flex flex-row w-11/12 max-w-maxContent items-center justify-between '>
        <Link to={"/"}>
            <img src={wisdomverse} alt="" className='w-[160px] h-[55px] ' loading='lazy' />
        </Link>


        {/* home / catalog / about us / contact us */}
        <div className='hidden md:block'>
          <ul className='flex flex-row gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((links , index) =>{
                return(
                  //-----------------------------------the subLink.filter is not working properly...check it...
                  <li key={index}>
                    {links.title === "Catalog" ? (
                      <div>
                        <div className={` ${matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                             }
                          text-richblack-5 flex flex-row items-center cursor-pointer gap-1 group`}>
                          <p>{links?.title}</p>
                          <BsChevronDown />
                          <div  className="invisible absolute  top-[5%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                            { loading ? (
                              <p className='text-center'>Loading...</p>
                            ):(
                              (subLinks && subLinks.length ?(
                                <>
                                  {
                                    subLinks?.filter(
                                      (subLink) =>(subLink?.courses?.length > 0)
                                    )?.map((subLink,i) =>{
                                      return(
                                        <Link key={i} 
                                        to={`/Catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} 
                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                        >
                                        
                                          <p>{subLink.name}</p>
                                        </Link>
                                      )
                                    })
                                  }

                                </>
                              )
                              :(
                                <div className='text-center'>no course found</div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>
                    ):(
                    <div>
                      <Link to={`${links?.path}`} >
                      {
                        <p
                        className={`${
                          matchRoute(links?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }` }
                      >
                        {links.title}
                      </p>
                      }
                      </Link>
                    </div>
                  )}
                  </li>
                )
              })
            }
          </ul>
        </div>
        

        {/* Login / Logout / profile / cart / dashboard */}
        <div className='hidden lg:flex flex-row gap-2 items-center'>
            {
              // ---------------------------------------cart needed to be check----------------------
              user && user.account_type !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to = "/dashboard/cart" className="relative" >
                  <AiOutlineShoppingCart className='relative '/>
                  {totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )}
                </Link>
              )
            },

           { token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )},
          {
            token === null && (
              <Link to = "/signup" >
                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
                  Sign up
                </button>
              </Link>
            )
          }
        </div>
        <button className="mr-4 lg:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
    
  )
}

export default Navbar