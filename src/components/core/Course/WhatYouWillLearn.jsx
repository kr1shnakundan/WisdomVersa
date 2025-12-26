import React from "react";

function WhatYouWillLearn({ content }) {
  return (
    <div className="my-8 border border-richblack-600 p-8 bg-richblack-800 rounded-xl">
      <p className="text-3xl font-semibold mb-4">What you'll learn</p>
      <div className="mt-5 text-richblack-200">
        {content || "Course learning objectives will be listed here."}
      </div>
    </div>
  );
}

export default WhatYouWillLearn;
