module.exports = function(eleventyConfig) {

  // Passthrough copy for static assets in the 'public' directory
  eleventyConfig.addPassthroughCopy("public");

  // Shortcode to get the current year for the footer
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add a 'min' filter to Nunjucks (from previous fix)
  eleventyConfig.addNunjucksFilter("min", function(a, b) {
    return Math.min(a, b);
  });

  // *** THIS IS THE FIX FOR THE MARKDOWN ERROR ***
  // Set the markdown-it library instance
  eleventyConfig.setLibrary("md", require("markdown-it")());

  return {
    // Set the input directory to the root
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    // Specify template formats
    templateFormats: ["njk", "md"],
    // Use Nunjucks for markdown files (so they can process data)
    markdownTemplateEngine: "njk",
    // Use Nunjucks for HTML files
    htmlTemplateEngine: "njk"
  };
};