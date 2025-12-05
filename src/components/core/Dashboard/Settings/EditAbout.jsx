import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import { useState } from "react";
import { LuSave ,LuSaveOff } from "react-icons/lu";

export default function EditAbout () {
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [about, setAbout] = useState(user?.additionalDetails?.about || "")
    const [loading, setLoading] = useState(false)

    const disable = about.trim()=== "";

    const submitAbout = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const formData = {
        about: about
      }
      await dispatch(updateProfile(token, formData))
      toast.success("About updated successfully")
      navigate(-1)
    } catch (error) {
      console.log("ERROR IN EDITPROFILE: ", error)
      toast.error(error.message || "Failed to update about")
    } finally {
      setLoading(false)
    }
  }

    return (
      <div className="flex flex-col gap-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 text-richblack-5">
        <h2 className="text-xl font-semibold text-richblack-25">About</h2>
        
        <form onSubmit={submitAbout} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="about" className="text-sm text-richblack-300">
              About Yourself
            </label>
            <textarea
            required
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Enter Bio Details"
              className="w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 text-richblack-100 placeholder-richblack-400 focus:border-richblue-500 focus:outline-none focus:ring-1 focus:ring-richblue-500"
              rows={5}
              disabled={loading}
            />
            <p className="text-xs text-richblack-400">
              Write a short introduction about yourself
            </p>
          </div>

          <div className="flex justify-end gap-2">
              <button
              type="submit"
              className={`${disable ? "bg-pure-greys-200 hover:bg-pure-greys-500 opacity-50 " 
                : " bg-yellow-25 hover:bg-yellow-50"} text-richblack-900 px-7 py-3 rounded-full 
              cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
              border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]`}
              
              >
                  <div className="flex gap-1 items-center">
                      {disable ? <LuSaveOff /> : <LuSave />}
                      {loading ? "Updating..." : "Update"}
                  </div>
                  
              </button>
              
                  <button
                  type="button"
                  onClick={() => {
                      navigate("/dashboard/my-profile")
                  }}
              className={`bg-richblack-700 text-richblack-50 px-7 py-3 rounded-full 
              cursor-pointer my-4 font-semibold text-lg transition-all duration-200 hover:scale-95
              border border-richblack-50 hover:shadow-[0_0_0_1px_#F472B6,0_0_0_2px_#538fbd]`}
              >
                  Cancel
              </button>
              
          </div>
        </form>
      </div>
    )
}