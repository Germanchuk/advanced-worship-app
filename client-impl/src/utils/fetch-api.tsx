import qs from "qs";

export function getStrapiURL(path = '') {
  return `${process.env?.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject: any = {},
  options = {}
) {


  const token = "2617389405e4ccfa460cd79db4f210344f2c239f3d9e09b59768608684b0d9bfaa2175fd721c5f143160a08fce023878c03c9535a634ead226dede7befa1f1c1465174faf2b3eef21957bfbc23aab484c6c98a2e0af2c137cea767bb218a1039b984ae23ae607f38c56de5671da792dc3e06a54b769a148737073076f0cd7b93";
  
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");
  
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);


    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
