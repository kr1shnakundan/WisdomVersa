import Course from '../models/Course.js'
// eslint-disable-next-line no-unused-vars
import Category from '../models/Category.js'
export const searchIndex = async (req, res) => {
  try {
    // only published courses for public search
    const courses = await Course.find(
      { status: 'Published' },
      { courseName: 1, category: 1, createdAt: 1, price: 1 }
    )
      .populate('category', 'name') // fetch category name only
      .lean()

    const courseIndex = courses.map(c => ({
      id: String(c._id),
      courseName: c.courseName,
      createdAt: c.createdAt,
      price: c.price,
      categoryId: c.category ? String(c.category._id) : null,
      categoryName: c.category?.name || null,
      type: 'course'
    }))

    // Create unique category list from populated courses (no extra DB query)
    const categoryMap = new Map()
    for (const c of courseIndex) {
      if (c.categoryId && c.categoryName) {
        categoryMap.set(c.categoryId, {
          id: c.categoryId,
          categoryName: c.categoryName,
          type: 'category'
        })
      }
    }
    const categoryIndex = Array.from(categoryMap.values())

    res.json({
      courses: courseIndex,
      categories: categoryIndex
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to build search index' })
  }
}
