// import React, { useState, useEffect } from 'react';
// import { MdClose } from 'react-icons/md';
// import { useSelector } from 'react-redux';

// // Utility to guarantee tags is always an array
// const toArray = (value) => {
//   if (!value) return [];
//   if (Array.isArray(value)) return value;
//   if (typeof value === "string") {
//     return value
//       .split(",")
//       .map(s => s.trim())
//       .filter(Boolean);
//   }
//   return [];
// };

// const ChipInput = ({
//   label,
//   name,
//   placeholder,
//   register,
//   errors,
//   setValue,
// }) => {

//   const { editCourse, course } = useSelector((state) => state.course);

//   console.log("course.tag =", course?.tag);
// console.log("full course object =", course);

//   const [inputValue, setInputValue] = useState('');
//   const [tags, setTags] = useState([]);

//   // Initialize when editing
//   useEffect(() => {
//     if (editCourse) {
//       const safeTags = toArray(course?.tag);
//       setTags(safeTags);
//       setValue(name, safeTags);
//     }

//     register(name, {
//       required: `${label} is required`,
//       validate: (value) => {
//         const arr = toArray(value);
//         return arr.length > 0 || `${label} is required`;
//       }
//     });
//     // eslint-disable-next-line
//   }, []);

//   // Sync tags back to hook form
//   useEffect(() => {
//     setValue(name, tags);
//     // eslint-disable-next-line
//   }, [tags]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();

//       const trimmed = inputValue.trim();
//       if (!trimmed) return;

//       if (!tags.includes(trimmed)) {
//         setTags(prev => [...prev, trimmed]);
//       }
//       setInputValue("");
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(prev => prev.filter(tag => tag !== tagToRemove));
//   };

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} <sup className="text-pink-200">*</sup>
//       </label>

//       <div className="flex w-full flex-wrap gap-y-2">
//         {tags.map((tag, i) => (
//           <div
//             key={i}
//             className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
//           >
//             <span>{tag}</span>
//             <button
//               type="button"
//               className="ml-2"
//               onClick={() => removeTag(tag)}
//             >
//               <MdClose />
//             </button>
//           </div>
//         ))}

//         <input
//           id={name}
//           type="text"
//           placeholder={placeholder}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="form-style !bg-richblack-700 w-full"
//         />
//       </div>

//       {errors?.[name] && (
//         <p className="text-xs text-pink-200 ml-2">
//           {errors[name].message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ChipInput;



import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

/**
 * Ensure value is always an array of trimmed, non-empty strings.
 * Accepts: Array, CSV string, null/undefined, or other unexpected types.
 */
const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
  // fallback for unexpected types
  return [];
};

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues, // kept for parity if parent uses it
}) => {
  // The redux slice may contain a nested `course` object (slice = { section, course })
  // or may itself be the course object. Normalize to `actualCourse`.
  const courseSlice = useSelector((state) => state.course);
  const actualCourse = courseSlice?.course ?? courseSlice;

  // debug lines (remove in production if desired)
  // console.log("courseSlice =", courseSlice);
  // console.log("actualCourse =", actualCourse);
  // console.log("actualCourse.tag =", actualCourse?.tag);

  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(() => toArray(actualCourse?.tag));

  // Initialize register + set initial tags when editing
  useEffect(() => {
    // If the slice contains a nested course object that updates later,
    // prefer using the nested course's tag if present.
    setTags(toArray(actualCourse?.tag));

    // Register with react-hook-form (validate expects an array)
    register(name, {
      required: `${label} is required`,
      validate: (value) => {
        const arr = toArray(value);
        return arr.length > 0 || `${label} is required`;
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // register only once on mount; tags will be updated by other effects

  // If the redux course updates (for example, fetched after mount),
  // ensure local tags follow the store. This keeps UI in sync with async loads.
  useEffect(() => {
    setTags(toArray(actualCourse?.tag));
  }, [actualCourse?.tag]);

  // Keep react-hook-form value synced with local tags
  useEffect(() => {
    setValue(name, tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;

      // Case-insensitive duplicate check
      const exists = tags.some((t) => String(t).toLowerCase() === trimmed.toLowerCase());
      if (!exists) setTags((prev) => [...prev, trimmed]);

      setInputValue("");
    }

    // Backspace behavior: if input empty, remove last tag
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {(tags || []).map((tag, index) => (
          <div
            key={`${String(tag)}-${index}`}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              <MdClose />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-style !bg-richblack-700 w-full"
        />
      </div>

      {errors?.[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default ChipInput;

