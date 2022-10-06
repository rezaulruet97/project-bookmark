import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor() { }

  saveBookmark(data:any){
    let bookmarkData;
    let savedBookmarks  = localStorage.getItem('bookmarks'.toString());
    if (savedBookmarks !== null) {
      bookmarkData = JSON.parse(savedBookmarks);
      bookmarkData = [...bookmarkData, data];
    }
    else {
      bookmarkData = [data];
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkData));
  }

  getBookmark(): any{
    let bookmarkData;
    let savedbookmarkData = localStorage.getItem('bookmarks');
    if (savedbookmarkData !== null) {
      bookmarkData = JSON.parse(savedbookmarkData);
    }
    return bookmarkData;
  }

  saveCategory(data:any): any{
    let categoryData;
    let lastSavedId;
    let savedCategories  = localStorage.getItem('categories'.toString());
    if (savedCategories !== null) {
      categoryData = JSON.parse(savedCategories);
      const categoryLength = categoryData?.length;
      let categoryModel = {
        id: categoryLength + 1,
        name : data.newCategoryName
      }
      lastSavedId = categoryLength + 1;
      categoryData = [...categoryData, categoryModel];
    }
    else {
      let categoryModel = {
        id: 1,
        name : data.newCategoryName
      }
      categoryData = [categoryModel];
      lastSavedId = 1;
    }
    localStorage.setItem('categories', JSON.stringify(categoryData));
    return lastSavedId;
  }


  getCategories():any{
    let categoryData;
    let savedcategoryData = localStorage.getItem('categories');
    if (savedcategoryData !== null) {
      categoryData = JSON.parse(savedcategoryData);
    }
    return categoryData;
  }
}
