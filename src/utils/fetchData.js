export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': '227f629196msh5dc3a8cbff63aedp1cd995jsnfd3678dca430',
    }
  };

export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '227f629196msh5dc3a8cbff63aedp1cd995jsnfd3678dca430',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  };

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}