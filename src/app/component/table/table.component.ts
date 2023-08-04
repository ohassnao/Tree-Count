import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { record } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/service/master.service';
import { PopupComponent } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  recordlist !: record[];
  dataSource: any;
  displayedColumns: string[] = ["DateCreated", "Ref", "Culture", "Variete", "Porte_greffe", "Code_Arbre", "NomElement", "Nombre", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog, private http: HttpClient) {
    this.loadrecord();
  }

  loadrecord() {
    this.service.Getrecord().subscribe(res => {
      this.recordlist = res;
      this.dataSource = new MatTableDataSource<record>(this.recordlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;                                                                                                     
  }
  
  editrecorde(element: any) {
    console.log(element);
    
    this.Openpopup(element, 'Edit record',PopupComponent);
  }


  
  

  addrecord(){
    this.Openpopup(0, 'Add record',PopupComponent);
  }

  Openpopup(ID: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        ID: ID
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadrecord();
    })
  }
  deleteRecord(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this record?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteRecordById(id).subscribe(
          () => {
            // Successful deletion
            console.log('Record deleted successfully.');
            this.loadrecord(); // Refresh the data after deletion
          },
          (error) => {
            // Handle any errors that occur during the deletion process
            console.error('Error deleting the record:', error);
          }
        );
      }
    });
  }
  
}
