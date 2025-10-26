const metadata = require('./_data/metadata.json');

module.exports = function(eleventyConfig) {

  // Passthrough copy for static assets in the 'public' directory
  eleventyConfig.addPassthroughCopy("public");

  // Shortcode to get the current year for the footer
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add a 'min' filter to Nunjucks
  eleventyConfig.addNunjucksFilter("min", function(a, b) {
    return Math.min(a, b);
  });

  // Set the markdown-it library instance
  eleventyConfig.setLibrary("md", require("markdown-it")());

  // Check if we are in 'production' or 'development'
  const isProduction = process.env.NODE_ENV === 'production';

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
    // Use Nunjucks for markdown files
    markdownTemplateEngine: "njk",
    // Use Nunjucks for HTML files
    htmlTemplateEngine: "njk",
    
    // Conditionally set the path prefix
    // Uses the prefix for production (GitHub)
    // Uses "/" for development (local)
    pathPrefix: isProduction ? metadata.pathPrefix : "/"
  };
};