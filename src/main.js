const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=15&key=${API_KEY}`;

// Fetch & display trending videos
async function fetchTrendingVideos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(`YouTube Data API error: ${data.error.message}`);
    }
    if (data.items) {
      data.items.forEach((video, index) => {
        const title = video.snippet.title;
        const videoId = video.id;
        const viewCount = video.statistics ? video.statistics.viewCount : 'N/A';
        console.log(`${index + 1}. ${title} - https://www.youtube.com/watch?v=${videoId} (Views: ${viewCount})`);
      });
    } else {
      console.error('No items found in response.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchTrendingVideos();
