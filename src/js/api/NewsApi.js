export default class NewsApi {
  getNews(keyWord, actualDate) {
    return fetch(
      'https://nomoreparties.co/news/v2/everything?'
      + `q=${keyWord}&`
      + `from=${actualDate}&`
      + 'sortBy=publishedAt&'
      + 'pageSize=100&'
      + 'apiKey=813e48160d554954a0d15a3daee22c96',
    )
      .then((res) => {
        if (res.ok) return res.json();

        return Promise.reject(new TypeError(`Ошибка: ${res.status}`));
      });
  }
}


