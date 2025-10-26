module.exports = {
  // Apply this layout to all .md files in this directory
  layout: "course-layout.njk",
  
  // Add a "course" tag to all items
  tags: "course",

  // Use Eleventy Computed Data to find and attach the correct
  // course object from _data/courses.json to each page.
  eleventyComputed: {
    
    // The 'course' variable will be populated with the matching object
    course: (data) => {
      // 'data.page.fileSlug' is the filename without extension (e.g., "sat")
      const slug = data.page.fileSlug;
      // Find the course in the global data
      return data.courses.find(c => c.slug === slug);
    },

    // Set the page title from the course data
    title: (data) => {
      // 'data.course' is available because it was computed above
      return data.course ? data.course.title : "Course Details";
    },

    // Set the permalink (URL)
    permalink: (data) => {
      return data.course ? `/courses/${data.course.slug}/` : false;
    }
  }
};