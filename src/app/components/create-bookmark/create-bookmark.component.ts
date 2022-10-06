import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.component.html',
  styleUrls: ['./create-bookmark.component.css']
})
export class CreateBookmarkComponent implements OnInit{

  bookmarkForm !: FormGroup;
  categoryList : any[] = [];
  newCategoryOpened : boolean = false;
  vaildUrlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor( public dialogRef: MatDialogRef<CreateBookmarkComponent>,
    public fb : FormBuilder,
    private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
  }

  createForm(): void{
    this.bookmarkForm = this.fb.group({
      title : ['', [Validators.required,Validators.maxLength(30), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      url  : ['', [Validators.required, Validators.pattern(this.vaildUrlReg)]],
      categoryId: ['', [Validators.required]],
      newCategoryName : ['', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
    });
  }

  get f(){
    return this.bookmarkForm.controls;
  }

  onClose(){
    this.dialogRef.close();
  }

  openNewCategory(){
    this.newCategoryOpened = true;

    this.bookmarkForm.controls['newCategoryName'].setValidators([Validators.required]);
    this.bookmarkForm.controls['newCategoryName'].updateValueAndValidity();

    this.bookmarkForm.controls['categoryId'].clearValidators();
    this.bookmarkForm.controls['categoryId'].updateValueAndValidity();
  }

  onCancel(){
    this.dialogRef.close();
  }

  saveBookmark(){
    this.dialogRef.close(this.bookmarkForm.value);
  }

  getCategories(){
    this.categoryList = this.bookmarkService.getCategories();
    console.log(this.categoryList);
  }

}
