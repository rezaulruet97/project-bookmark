import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.css']
})
export class BookmarkDetailsComponent implements OnInit {

  bookmarkDetails !:any;

  constructor(public dialogRef: MatDialogRef<BookmarkDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.bookmarkDetails = this.data;
  }

  onClose(){
    this.dialogRef.close();
  }


}
