import React from "react";

function AuthorSection({ instructor }) {
  return (
    <div className="mb-12 py-4">
      <p className="text-[28px] font-semibold mb-4">Author</p>
      <div className="flex items-center gap-4 py-4">
        <img
          src={
            instructor?.image ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName} ${instructor?.lastName}`
          }
          alt="Author"
          className="h-14 w-14 rounded-full object-cover"
        />
        <p className="text-lg">
          {instructor?.firstName} {instructor?.lastName}
        </p>
      </div>
      <p className="text-richblack-50">
        {instructor?.additionalDetails?.about || 
         "Experienced instructor passionate about teaching and helping students succeed."}
      </p>
    </div>
  );
}

export default AuthorSection;