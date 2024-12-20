
export default function (eleventyConfig) {
    // Copy static files
    eleventyConfig.addPassthroughCopy("src/css/");
    eleventyConfig.addPassthroughCopy("src/js");

    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/js");
    eleventyConfig.addCollection("testimonials", (collection) => {
      return collection.getFilteredByGlob("./src/testimonials/*.md");
    });
  
    // Return configuration object
    return {
      dir: {
        input: "src",
        includes: "_includes",
        data: "_data",
        output: "_site",
      },
      templateFormats: ['md', 'njk', 'html'],
      markdownTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
    };
}
