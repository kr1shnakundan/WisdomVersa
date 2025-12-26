
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
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/\+/g, "plus")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    const getCategories = async () => {
      try {
        setIsLoading(true);
        const res = await apiConnector("GET", category.CATEGORY_URL);

        const categories = res?.data?.data;
        console.log("Categories in res in get Categories....:", categories);
        
        if (!Array.isArray(categories)) {
          console.error("Invalid categories response");
          setError(true);
          return;
        }

        const decodedCatalogName = decodeURIComponent(catalogName);
        console.log("Decoded catalogName:", decodedCatalogName);

        const matchedCategory = categories.find(
          (ct) => slugify(ct.name) === slugify(decodedCatalogName)
        );

        if (!matchedCategory) {
          console.error("No category found for:", catalogName);
          setError(true);
          return;
        }

        setCategoryId(matchedCategory._id);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      }
    };

    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoriesDetail = async () => {
      try {
        setIsLoading(true);
        const res = await getCatalogPageData(categoryId);
        console.log("Printing res: ", res);
        
        if (!res.success) {
          setError(true);
        } else {
          setCatalogPageData(res);
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      getCategoriesDetail();
    }
  }, [categoryId]);

  // Filter courses based on active tab
  const filteredCourses = useMemo(() => {
    const courses = catalogPageData?.data?.selectedCategory?.courses || [];
    
    if (!courses.length) return [];

    if (active === 1) {
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

        if (avgRatingB !== avgRatingA) {
          return avgRatingB - avgRatingA;
        }

        const reviewCountA = a.ratingAndReview?.length || 0;
        const reviewCountB = b.ratingAndReview?.length || 0;
        return reviewCountB - reviewCountA;
      });
    } else if (active === 2) {
      return [...courses].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
    }

    return courses;
  }, [catalogPageData, active]);

  // Loading State
  if (isLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>
          <p className="text-richblack-300 text-lg">Loading catalog...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !catalogPageData?.success) {
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

        {/* Show loading for filtered courses if switching tabs */}
        {filteredCourses.length > 0 ? (
          <CourseSlider Courses={filteredCourses} />
        ) : (
          <div className="py-10 text-center text-richblack-300">
            No courses available
          </div>
        )}
      </section>

      {/* ===== SECTION 2 ===== */}
      <section className="py-10">
        <h2 className="mb-6 text-2xl font-semibold">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </h2>

        {catalogPageData?.data?.differentCategory?.courses?.length > 0 ? (
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        ) : (
          <div className="py-10 text-center text-richblack-300">
            No courses available in this category
          </div>
        )}
      </section>

      {/* ===== SECTION 3 ===== */}
      <section className="py-10">
        <h2 className="mb-6 text-2xl font-semibold">Frequently Bought Together</h2>

        {catalogPageData?.data?.mostSellingCourse?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourse?.slice(0, 4).map((course) => (
              <Course_Card key={course._id} course={course} Height="h-[400px]" />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-richblack-300">
            No frequently bought courses available
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}