import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, DialogPosition  } from '@angular/material/dialog';
import { CreateBookmarkComponent } from '../create-bookmark/create-bookmark.component';
import { BookmarkService } from 'src/app/services/bookmark.service';
import * as _ from 'lodash';
import { BookmarkDetailsComponent } from '../bookmark-details/bookmark-details.component';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {

  bookmarkList : any[] = [];
  categoryWiseBookmarks !: any;
  bookmarkGroups : any[][] = [];
  categoryList : any[] = [];

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private bookmarkService : BookmarkService
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.getBookmarks();
  }

  handleDialog():void{
    const dialogRef = this.matDialog.open(CreateBookmarkComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(formValue=> {
      if (!formValue) {
        return;
      }

      if(formValue?.newCategoryName.trim()){
        let lastSavedId = this.bookmarkService.saveCategory(formValue);
        if(lastSavedId){
          formValue.categoryId = lastSavedId;
          this.bookmarkService.saveBookmark(formValue);
        }

      }else{
        this.bookmarkService.saveBookmark(formValue);
      }

      alert('saved Successfully');
      this.getCategoryList();
      this.getBookmarks();
    });
  }

  getBookmarks():void{
    this.bookmarkList = this.bookmarkService.getBookmark();

    this.bookmarkList.forEach((resElememt:any) => {
      let catId = resElememt?.categoryId;
      let catDetails = this.categoryList.find((element:any) => element.id === catId);
      resElememt.catActualName = catDetails?.name;
    });

    if(this.bookmarkList.length > 0){

    }
    this.categoryWiseBookmarks = _.groupBy(this.bookmarkList, "categoryId");
    for (let key in this.categoryWiseBookmarks) {
      let bookmarks = [];
      let keyNumber = Number(key);
      for(let i=0; i<this.categoryWiseBookmarks[key]?.length; i++){
        bookmarks.push(this.categoryWiseBookmarks[key][i]);
      }
      this.bookmarkGroups[keyNumber] = bookmarks;
    }

  }

  getCategoryList(){
    this.categoryList = this.bookmarkService.getCategories();
  }

  handleDetailsDialog(bookmarkDetails : any){
    const dialogPosition: DialogPosition = {
      top: '50px',
      left:'700px'
    };
    const dialogRef = this.matDialog.open(BookmarkDetailsComponent, {
      width: '700px',
      data: bookmarkDetails,
      position : dialogPosition
    });
  }

  openLinkNewTab(url:any){
    window.open(url, "_blank");
  }

}
