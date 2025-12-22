// import { useParams } from "react-router-dom";
// import Course_Card from "../components/core/Catalog/Course_Card";
// import CourseSlider from "../components/core/Catalog/CourseSlider";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { category } from "../services/apis";
// import Error from "./Error"
// import { apiConnector } from '../services/apiconnector';
// import {getCatalogPageData} from '../services/operations/catalogAPI'
// import Footer from '../components/common/Footer'
// export default function Catalog (){

//     const {catalogName} = useParams()
//     const {loading} = useSelector((state)=>state.profile)
//     const [active , setActive] = useState(1)
//     const [catalogPageData , setCatalogPageData] = useState(null);
//     const [categoryId,setCategoryId] = useState("");

//     // console.log("catalogName:..........",catalogName)
//     // console.log("catalogPageData:.....",catalogPageData)
//     // console.log("categoryId:..........",categoryId)

//     useEffect(() => {
//         const slugify = (text) =>
//             text
//             .toLowerCase()
//             .trim()
//             .replace(/\+/g, "plus")       // handle C++
//             .replace(/[^a-z0-9\s-]/g, "") // remove special characters
//             .replace(/\s+/g, "-")         // spaces → hyphen
//             .replace(/-+/g, "-");         // collapse multiple hyphens

//         const getCategories = async () => {
//             try {
//             const res = await apiConnector("GET", category.CATEGORY_URL);

//             const categories = res?.data?.data;
//             console.log("Categories in res in get Categories....:", categories)
//             if (!Array.isArray(categories)) {
//                 console.error("Invalid categories response");
//                 return;
//             }


//             // Decode the catalogName in case it's URL encoded
//             const decodedCatalogName = decodeURIComponent(catalogName);
//             console.log("Decoded catalogName:", decodedCatalogName);

//             const matchedCategory = categories.find(
//                 (ct) => slugify(ct.name) === slugify(decodedCatalogName)
//             );

//             // const matchedCategory = categories.find(
//             //     (ct) => slugify(ct.name) === catalogName
//             // );

//             if (!matchedCategory) {
//                 console.error("No category found for:", catalogName);
//                 return;
//             }

//             setCategoryId(matchedCategory._id);
//             } catch (error) {
//             console.error("Error fetching categories:", error);
//             }
//         };

//         getCategories();
//     }, [catalogName]);


//     useEffect(()=>{
//         const getCategoriesDetail = async()=>{
//             try{
//                 const res = await getCatalogPageData(categoryId);
//                 console.log("PRinting res: ", res);
//                 setCatalogPageData(res);
//             }
//             catch(error) {
//                 console.log(error)
//             }
//         }

//         if(categoryId){
//             getCategoriesDetail();
//         }
//     },[categoryId])

//     if (loading || !catalogPageData) {
//         return (
//           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//             <div className="spinner"></div>
//           </div>
//         )
//     }
//     if (!loading && !catalogPageData.success) {
//         return <Error />
//     }


//     console.log("mostSellingCourses: ",catalogPageData?.data?.mostSellingCourse)

//     console.log("SEelectd category?>>>>>>>>>.",catalogPageData?.data?.selectedCategory)
//     return(
//         <div className="mx-auto w-11/12 max-w-maxContent text-richblack-5">
  
//         {/* ===== HEADER ===== */}
//         <section className="py-10">
//             <p className="text-sm text-richblack-300">
//             Home / Catalog /{" "}
//             <span className="text-yellow-25">
//                 {catalogPageData?.data?.selectedCategory?.name}
//             </span>
//             </p>

//             <h1 className="mt-2 text-3xl font-semibold">
//             {catalogPageData?.data?.selectedCategory?.name}
//             </h1>

//             <p className="mt-3 max-w-[800px] text-richblack-200">
//             {catalogPageData?.data?.selectedCategory?.description}
//             </p>
//         </section>

//         {/* ===== SECTION 1 ===== */}
//         <section className="py-10 text-richblack-5">
//             <div className="mb-6 flex items-center justify-between">
//             <h2 className="text-2xl font-semibold">
//                 Courses to get you started
//             </h2>

//             <div className="flex gap-6 text-sm">
//                 <button
//                 onClick={() => setActive(1)}
//                 className={`pb-1 ${
//                     active === 1
//                     ? "border-b-2 border-yellow-25 text-yellow-25"
//                     : "text-richblack-300"
//                 }`}
//                 >
//                 Most Popular
//                 </button>

//                 <button
//                 onClick={() => setActive(2)}
//                 className={`pb-1 ${
//                     active === 2
//                     ? "border-b-2 border-yellow-25 text-yellow-25"
//                     : "text-richblack-300"
//                 }`}
//                 >
//                 New
//                 </button>
//             </div>
//             </div>

//             <CourseSlider
//             Courses={catalogPageData?.data?.selectedCategory?.courses}
//             />
//         </section>

//         {/* ===== SECTION 2 ===== */}
//         <section className="py-10">
//             <h2 className="mb-6 text-2xl font-semibold">
//             Top courses in{" "}
//             {catalogPageData?.data?.differentCategory?.name}
//             </h2>

//             <CourseSlider
//             Courses={catalogPageData?.data?.differentCategory?.courses}
//             />
//         </section>

//         {/* ===== SECTION 3 ===== */}
//         <section className="py-10">
//             <h2 className="mb-6 text-2xl font-semibold">
//             Frequently Bought Together
//             </h2>

//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//             {catalogPageData?.data?.mostSellingCourse
//                 ?.slice(0, 4)
//                 .map((course) => (
//                 <Course_Card
//                     key={course._id}
//                     course={course}
//                     Height="h-[400px]"
//                 />
//                 ))}
//             </div>
//         </section>

//         <Footer />
//         </div>

//     )
// }



import { useParams } from "react-router-dom";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { category } from "../services/apis";
import Error from "./Error";
import { apiConnector } from "../services/apiconnector";
import { getCatalogPageData } from "../services/operations/catalogAPI";
import Footer from "../components/common/Footer";

export default function Catalog() {
  const { catalogName } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/\+/g, "plus") // handle C++
        .replace(/[^a-z0-9\s-]/g, "") // remove special characters
        .replace(/\s+/g, "-") // spaces → hyphen
        .replace(/-+/g, "-"); // collapse multiple hyphens

    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", category.CATEGORY_URL);

        const categories = res?.data?.data;
        console.log("Categories in res in get Categories....:", categories);
        if (!Array.isArray(categories)) {
          console.error("Invalid categories response");
          return;
        }

        // Decode the catalogName in case it's URL encoded
        const decodedCatalogName = decodeURIComponent(catalogName);
        console.log("Decoded catalogName:", decodedCatalogName);

        const matchedCategory = categories.find(
          (ct) => slugify(ct.name) === slugify(decodedCatalogName)
        );

        if (!matchedCategory) {
          console.error("No category found for:", catalogName);
          return;
        }

        setCategoryId(matchedCategory._id);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoriesDetail = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("Printing res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryId) {
      getCategoriesDetail();
    }
  }, [categoryId]);

  // Filter courses based on active tab (Most Popular or New)
  const filteredCourses = useMemo(() => {
    const courses = catalogPageData?.data?.selectedCategory?.courses || [];
    
    if (!courses.length) return [];

    if (active === 1) {
      // Most Popular - Sort by rating and review count
      return [...courses].sort((a, b) => {
        const avgRatingA =
          a.ratingAndReview?.length > 0
            ? a.ratingAndReview.reduce((acc, cur) => acc + cur.rating, 0) /
              a.ratingAndReview.length
            : 0;
        const avgRatingB =
          b.ratingAndReview?.length > 0
            ? b.ratingAndReview.reduce((acc, cur) => acc + cur.rating, 0) /
              b.ratingAndReview.length
            : 0;

        // First sort by average rating
        if (avgRatingB !== avgRatingA) {
          return avgRatingB - avgRatingA;
        }

        // If ratings are equal, sort by number of reviews
        const reviewCountA = a.ratingAndReview?.length || 0;
        const reviewCountB = b.ratingAndReview?.length || 0;
        return reviewCountB - reviewCountA;
      });
    } else if (active === 2) {
      // New - Sort by creation date (most recent first)
      return [...courses].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    }

    return courses;
  }, [catalogPageData, active]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  console.log("mostSellingCourses: ", catalogPageData?.data?.mostSellingCourse);
  console.log("Selected category?>>>>>>>>>.", catalogPageData?.data?.selectedCategory);
  console.log("Filtered Courses:", filteredCourses);

  return (
    <div className="mx-auto w-11/12 max-w-maxContent text-richblack-5">
      {/* ===== HEADER ===== */}
      <section className="py-10">
        <p className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-25">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>

        <h1 className="mt-2 text-3xl font-semibold">
          {catalogPageData?.data?.selectedCategory?.name}
        </h1>

        <p className="mt-3 max-w-[800px] text-richblack-200">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </section>

      {/* ===== SECTION 1 ===== */}
      <section className="py-10 text-richblack-5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Courses to get you started</h2>

          <div className="flex gap-6 text-sm">
            <button
              onClick={() => setActive(1)}
              className={`pb-1 transition-all duration-200 ${
                active === 1
                  ? "border-b-2 border-yellow-25 text-yellow-25"
                  : "text-richblack-300 hover:text-richblack-5"
              }`}
            >
              Most Popular
            </button>

            <button
              onClick={() => setActive(2)}
              className={`pb-1 transition-all duration-200 ${
                active === 2
                  ? "border-b-2 border-yellow-25 text-yellow-25"
                  : "text-richblack-300 hover:text-richblack-5"
              }`}
            >
              New
            </button>
          </div>
        </div>

        <CourseSlider Courses={filteredCourses} />
      </section>

      {/* ===== SECTION 2 ===== */}
      <section className="py-10">
        <h2 className="mb-6 text-2xl font-semibold">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </h2>

        <CourseSlider
          Courses={catalogPageData?.data?.differentCategory?.courses}
        />
      </section>

      {/* ===== SECTION 3 ===== */}
      <section className="py-10">
        <h2 className="mb-6 text-2xl font-semibold">Frequently Bought Together</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {catalogPageData?.data?.mostSellingCourse?.slice(0, 4).map((course) => (
            <Course_Card key={course._id} course={course} Height="h-[400px]" />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}