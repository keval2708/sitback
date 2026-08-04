
export default async function sitemap() {


  const url = process.env.APPLE_REDIRECT_URL;
  const today = new Date();



  return [
    {
      url: url,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: url + "/spas",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: url + "/services",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: url + "/blog",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: url + "/about-us",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: url + "/contact-us",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: url + "/terms-and-condition",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.64,
    },
    {
      url: url + "/privacy-policy",
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.64,
    },
  ];
}
