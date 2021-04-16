export default class SavedArticles {
  constructor(savedArticlesElements) {
    this.savedArticlesElements = savedArticlesElements;
  }

  render(articles) {
    const actualUser = localStorage.getItem('username');
    const articlesLength = articles.length;
    let keywordsArr = [];
    this.savedArticlesElements.userName.textContent = actualUser;
    if(articlesLength > 0) {
      this.savedArticlesElements.description.classList.add('saved-articles__description_show');
      articles.forEach(elem => keywordsArr.push(elem.keyword));
      this._sortKeywords(keywordsArr);


      if(articlesLength === 1) {
        this.savedArticlesElements.howMatch.textContent = ' сохранённая статья';
      } else if (articlesLength > 1 && articlesLength < 5) {
        this.savedArticlesElements.howMatch.textContent = ' сохранённых статьи';
      } else {
        this.savedArticlesElements.howMatch.textContent = ' сохранённых статей';
      }

      if(this._sortKeywords(keywordsArr).length <= 2) {
        this.savedArticlesElements.and.textContent = '';
        this.savedArticlesElements.others.textContent = '';
      } else if (this._sortKeywords(keywordsArr).length === 3) {
        this.savedArticlesElements.and.textContent = ' и ';
        this.savedArticlesElements.others.textContent = `1 другому`;
      } else {
        this.savedArticlesElements.and.textContent = ' и ';
        this.savedArticlesElements.others.textContent = `${this._sortKeywords(keywordsArr).length - 2} другим`;
      }

      const keywordsShow = this._sortKeywords(keywordsArr).splice(0, 2);
      this.savedArticlesElements.keywords.textContent = keywordsShow.join(', ');
      this.savedArticlesElements.length.textContent = articlesLength;
    } else {
      this.savedArticlesElements.howMatch.textContent = ' сохранённых статей';
      this.savedArticlesElements.length.textContent = 'нет';
      this.savedArticlesElements.description.classList.remove('saved-articles__description_show');
    }
  }

  _sortKeywords(arr) {
    let result = [];

    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }
}
