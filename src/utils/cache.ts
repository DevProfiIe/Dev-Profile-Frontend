import axios from 'axios';

class CacheModule {
  public localStorage: any;

  constructor() {
    this.localStorage = window.localStorage; // 브라우저 환경에서 사용
  }

  setCache(key: string, data: string) {
    this.localStorage.setItem(key, JSON.stringify(data));
  }

  getCache(key: string) {
    const cachedData = this.localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async fetchWithCache(url: string, cacheKey: string, useCache = true) {
    if (useCache) {
      const cachedData = this.getCache(cacheKey);
      if (cachedData) {
        console.log('데이터를 캐시에서 가져옵니다.');
        return cachedData;
      }
    }

    try {
      const response = await axios.get(url);
      const data = response.data;

      this.setCache(cacheKey, data);

      console.log('데이터를 서버에서 가져옵니다.');
      return data;
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      return null;
    }
  }
}

const cache = new CacheModule();

const apiUrl = `${import.meta.env.VITE_SERVER}`;
const cacheKey = 'cachedData';

cache.fetchWithCache(apiUrl, cacheKey).then((data) => {
  if (data) {
    console.log('데이터 사용:', data);
  } else {
    console.log('데이터를 가져오지 못했습니다.');
  }
});
