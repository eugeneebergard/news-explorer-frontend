export default class SavedArticles {
  constructor(savedArticlesElements) {
    this.savedArticlesElements = savedArticlesElements;
  }

  render(articles) {
    const actualUser = localStorage.getItem('username');
    const articlesLength = articles.length;
    let keywordsString = '';
    this.savedArticlesElements.userName.textContent = actualUser;
    console.log(articlesLength)
    if(articlesLength > 0) {
      if(articlesLength > 2) {
        for(let i = 0; i < 2; i++) {
          if(i === 1) keywordsString += `${articles[i].keyword}`;
          else keywordsString += `${articles[i].keyword}, `
        }
        this.savedArticlesElements.others.textContent = `${articlesLength - 2} другим`;
      } else {
        for(let i = 0; i < articlesLength; i++) {
          if(i === 1 || articlesLength === 1) keywordsString += `${articles[i].keyword}`;
          else keywordsString += `${articles[i].keyword}, `
        }
        this.savedArticlesElements.others.textContent = '';
      }
      this.savedArticlesElements.length.textContent = articlesLength;
      this.savedArticlesElements.keywords.textContent = keywordsString;

      console.log(this.savedArticlesElements);
      console.log(articles);
    } else {
      this.savedArticlesElements.others.textContent = '';
      this.savedArticlesElements.length.textContent = 'нет';
      this.savedArticlesElements.keywords.textContent = '';
    }
  }
}
