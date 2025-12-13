
// // import { useRef, useState, useEffect } from "react"
// // import { useDropzone } from "react-dropzone"
// // import { useSelector } from "react-redux"
// // import { FiUploadCloud } from "react-icons/fi"
// // import ReactPlayer from "react-player"

// // export default function Upload({
// //     label,
// //     name,
// //     register,
// //     errors,
// //     setValue,
// //     editData = null,
// //     video = false,
// //     viewData = null
// // }) {
// //     const [selectedFile, setSelectedFile] = useState(null)
// //     const [previewSource, setPreviewSource] = useState(
// //         viewData ? viewData : editData ? editData : ""
// //     )

// //     const inputRef = useRef(null)

// //     const onDrop = (acceptedFiles) => {
// //         const file = acceptedFiles[0]
// //         if (file) {
// //             previewFile(file)
// //             setSelectedFile(file)
// //         }
// //     }

// //     const { getRootProps, getInputProps, isDragActive } = useDropzone({
// //         accept: !video
// //             ? { "image/*": [".jpeg", ".jpg", ".png"] }
// //             : { "video/*": [".mp4"] },
// //         onDrop,
// //         multiple: false,
// //         noClick: true, // Disable default click behavior
// //         noKeyboard: true
// //     })

// //     const previewFile = (file) => {
// //         const reader = new FileReader()
// //         reader.readAsDataURL(file)
// //         reader.onloadend = () => {
// //             setPreviewSource(reader.result)
// //         }
// //     }

// //     const handleClick = (e) => {
// //         // Don't trigger if clicking on video controls or cancel button
// //         if (e.target.closest('button') || e.target.closest('video')) {
// //             return
// //         }
// //         inputRef.current?.click()
// //     }

// //     useEffect(() => {
// //         register(name, { required: true })
// //     }, [register])

// //     useEffect(() => {
// //         setValue(name, selectedFile)
// //     }, [selectedFile, setValue])

// //     return (
// //         <div className="text-richblack-5 flex flex-col space-y-2">
// //             <label htmlFor={name} className="text-sm">
// //                 {label} {!viewData && <sup className="text-pink-200 ">*</sup>}
// //             </label>
// //             <div
// //                 className={`${
// //                     isDragActive ? "bg-richblack-600" : "bg-richblack-700"
// //                 }
// //                 flex min-h-[250px] cursor-pointer items-center justify-center
// //                  border-2 border-dashed border-richblack-500 rounded-lg
                 
// //             `}
// //                 {...getRootProps()}
// //                 onClick={handleClick} // Add manual click handler
// //             >
// //                 <input {...getInputProps()} ref={inputRef} />
// //                 {previewSource ? (
// //                     <div className="flex flex-col  w-full p-6 max-w-full">
// //                         {!video ? (
// //                             <img
// //                                 src={previewSource}
// //                                 alt="Preview"
// //                                 className="h-full w-full rounded-md object-cover max-w-full"
// //                             />
// //                         ) : (
// //                             <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
// //                                 <ReactPlayer
// //                                     url={previewSource}
// //                                     controls
// //                                     width="100%"
// //                                     height="100%"
// //                                     config={{
// //                                         file: {
// //                                             attributes: {
// //                                                 controlsList: 'nodownload'
// //                                             }
// //                                         }
// //                                     }}
// //                                 />
// //                             </div>
// //                         )}
// //                         {!viewData && (
// //                             <button
// //                                 type="button"
// //                                 onClick={(e) => {
// //                                     e.stopPropagation()
// //                                     setPreviewSource("")
// //                                     setSelectedFile(null)
// //                                     setValue(name, null)
// //                                 }}
// //                                 className="mt-3 text-richblack-400 underline"
// //                             >
// //                                 Cancel
// //                             </button>
// //                         )}
// //                     </div>
// //                 ) : (
// //                     <div className="flex w-full flex-col items-center p-6">
// //                         <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
// //                             <FiUploadCloud className="text-2xl text-yellow-50" />
// //                         </div>
// //                         <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
// //                             Drag and drop an {!video ? "image" : "video"}, or click to{" "}
// //                             <span className="font-semibold text-yellow-50">Browse</span> a
// //                             file
// //                         </p>
// //                         <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
// //                             <li>Aspect ratio 16:9</li>
// //                             <li>Recommended size 1024x576</li>
// //                         </ul>
// //                     </div>
// //                 )}
// //             </div>
// //             {errors[name] && (
// //                 <span className="ml-2 text-xs tracking-wide text-pink-200">
// //                     {label} is required
// //                 </span>
// //             )}
// //         </div>
// //     )
// // }

// //============================= Alternative without using DROPZONE===============================

// import React, { useState, useRef, useEffect } from 'react';
// import { Upload as UploadIcon, X, FileVideo, ImageIcon } from 'lucide-react';

// export default function Upload({ 
//   label, 
//   name, 
//   register, 
//   errors, 
//   setValue, 
//   editData = null, 
//   video = false, 
//   viewData = null 
// }) {
//   const [preview, setPreview] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
// //   const [fileName, setFileName] = useState('');
//   const fileInputRef = useRef(null);

//   // Set initial preview if editData or viewData exists
//   useEffect(() => {
//     if (editData?.[name]) {
//       setPreview(editData[name]);
//     //   setFileName(extractFileName(editData[name]));
//     } else if (viewData?.[name]) {
//       setPreview(viewData[name]);
//     //   setFileName(extractFileName(viewData[name]));
//     }
//   }, [editData, viewData, name]);


// //   const extractFileName = (url) => {
// //     if (!url) return '';
// //     const parts = url.split('/');
// //     return parts[parts.length - 1] || 'Uploaded file';
// //   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       processFile(file);
//     }
//   };

//   const processFile = (file) => {
//     const acceptedTypes = video 
//       ? ['video/mp4', 'video/webm', 'video/ogg']
//       : ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
//     if (!acceptedTypes.includes(file.type)) {
//       alert(`Please upload a valid ${video ? 'video' : 'image'} file`);
//       return;
//     }

//     const maxSize = video ? 100 * 1024 * 1024 : 5 * 1024 * 1024;
//     if (file.size > maxSize) {
//       alert(`File size should be less than ${video ? '100MB' : '5MB'}`);
//       return;
//     }

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Set value for form
//     setValue(name, file, { shouldValidate: true });
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       processFile(file);
//     }
//   };

//   const handleRemove = (e) => {
//     e.stopPropagation();
//     setPreview(null);
//     setValue(name, null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="flex flex-col space-y-2">
//       <label htmlFor={name} className="text-sm text-richblack-5">
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>
      
//       <div
//         onClick={handleClick}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`${
//           isDragging ? 'bg-richblack-600' : 'bg-richblack-700'
//         } flex min-h-[250px] cursor-pointer items-center justify-center border-2 border-dashed border-richblack-500 rounded-lg`}
//       >
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept={video ? 'video/*' : 'image/*'}
//           onChange={handleFileChange}
//           className="hidden"
//           {...(register?.[name] || {})}
//         />
        
//         {preview ? (
//           <div className="flex flex-col w-full p-6 max-w-full">
//             {!video ? (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="h-full w-full rounded-md object-cover max-w-full"
//               />
//             ) : (
//               <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
//                 <video 
//                   src={preview} 
//                   controls 
//                   className="w-full h-full"
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             )}
//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={handleRemove}
//                 className="mt-3 text-richblack-400 underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="flex w-full flex-col items-center p-6">
//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//               {video ? (
//                 <FileVideo className="text-2xl text-yellow-50" />
//               ) : (
//                 <UploadIcon className="text-2xl text-yellow-50" />
//               )}
//             </div>
//             <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//               Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//               <span className="font-semibold text-yellow-50">Browse</span> a file
//             </p>
//             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>
      
//       {errors?.[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react"
import { UploadCloud, X, FileImage } from "lucide-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  const previewFile = (file) => {
    setIsProcessing(true)
    setProgress(0)
    
    const reader = new FileReader()
    
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        setProgress(percentComplete)
      }
    }
    
    reader.onloadend = () => {
      setPreviewSource(reader.result)
      setProgress(100)
      setTimeout(() => {
        setIsProcessing(false)
      }, 300)
    }
    
    reader.onerror = () => {
      setIsProcessing(false)
      setProgress(0)
    }
    
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
      setValue(name, file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.add("bg-gray-700")
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("bg-gray-700")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("bg-gray-700")
    
    const file = e.dataTransfer.files[0]
    if (file) {
      const fileType = file.type.split("/")[0]
      if ((!video && fileType === "image") || (video && fileType === "video")) {
        previewFile(file)
        setSelectedFile(file)
        setValue(name, file)
      }
    }
  }

  const handleBrowseClick = () => {
    inputRef.current?.click()
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreviewSource("")
    setProgress(0)
    setIsProcessing(false)
    setValue(name, null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    if (viewData) {
      setPreviewSource(viewData)
    } else if (editData) {
      setPreviewSource(editData)
    }
  }, [viewData, editData])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-100" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div className="flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-richblack-500 bg-richblack-700">
        {isProcessing ? (
          <div className="flex w-full flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="mb-3 flex items-center justify-center">
                <UploadCloud className="text-4xl text-yellow-400 animate-pulse" />
              </div>
              <p className="mb-4 text-center text-sm text-richblack-300">
                Processing {!video ? "image" : "video"}...
              </p>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-richblack-600">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-richblack-400">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        ) : previewSource ? (
          <div className="flex w-full flex-col p-6">
            <div className="relative">
              {!video ? (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <video
                  src={previewSource}
                  className="h-full w-full rounded-md"
                  controls
                />
              )}
              {!viewData && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-richblack-100 hover:bg-richblack-700 transition-colors"
                >
                  <X size={20} className="text-caribbeangreen-5 border border-pink-300" />
                </button>
              )}
            </div>
            {!viewData && selectedFile && (
              <div className="mt-3 flex items-center justify-between rounded-md bg-richblack-700 p-3">
                <div className="flex items-center space-x-2">
                  <FileImage className="text-yellow-400" size={20} />
                  <p className="text-sm text-richblack-100">
                    {selectedFile.name}
                  </p>
                </div>
                <p className="text-xs text-richblack-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
            className="flex w-full flex-col items-center p-6 transition-colors"
          >
            <input
              ref={inputRef}
              id={name}
              type="file"
              accept={!video ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-richblack-700">
              <UploadCloud className="text-2xl text-yellow-400" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-300">
              Drag and drop {!video ? "an image" : "a video"}, or click to{" "}
              <span className="font-semibold text-yellow-400">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-400">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-400">
          {label} is required
        </span>
      )}
    </div>
  )
}
