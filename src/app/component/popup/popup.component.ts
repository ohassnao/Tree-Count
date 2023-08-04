import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { record, tree } from 'src/app/Model/Customer';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  
  cropPlotsOptions: any[] = [];
  TreesOptions: any[] = [];
  elementsOptions: any[] = [];
  allTreesOptions: any[] = [];
  selectedParcelleCulturalId: number | null = null;
  
  

  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(MAT_DIALOG_DATA) public data2: any, private ref: MatDialogRef<PopupComponent>, private buildr: FormBuilder,
    private service: MasterService,private http: HttpClient) {

  } 

  ngOnInit(): void {
    this.getAllCropPlotsOptions();
    this.getAllTreeOptions();
    this.getAllElementsOptions();
    this.inputdata = this.data;
   // console.log("inputdata ", this.inputdata);
    
    if (this.inputdata) {
      this.setpopupdata(this.inputdata);
    }
  }



  setpopupdata(record: any) {
    this.editdata = record;
   
    console.log("setpopupdata ", this.inputdata);
      this.myform.setValue({
        DateCreated: this.inputdata.ID.DateCreated,
        Nombre: this.inputdata.ID.Nombre,
        ID_ParcelleCulturale: this.inputdata.ID.id_parcelle,
        ID_Element: this.inputdata.ID.id_element,
        ID_Arbre: this.inputdata.ID.id_arbre,
      });
    
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


  myform = this.buildr.group({
    DateCreated: ['', Validators.required],
    ID_ParcelleCulturale: ['', Validators.required],
    ID_Arbre: ['', Validators.required],
    ID_Element: ['', Validators.required],
    Nombre: ['', Validators.required]
  });

  Saveinfo() {
    if (this.myform.valid) {
      if (this.inputdata.ID.ID > 0) {
        console.log("edit", this.inputdata);
        
        // Updating existing record
        this.service.updateRecord(this.inputdata.ID.ID, this.myform.value).subscribe(
          () => {
            this.closepopup();
          },
          error => {
            console.error('Error updating data:', error);
          }
        );
      } else {
        // Adding new record
        this.service.Saverecord(this.myform.value).subscribe(
          () => {
            this.closepopup();
          },
          error => {
            console.error('Error adding new record:', error);
          }
        );
      }
    } else {
      console.log('Form is not valid. Please fill in all the required fields.');
    }
  }
  
  



  getAllCropPlotsOptions() {
    this.service.getallcropplot().subscribe(
      (data) => {
        this.cropPlotsOptions = data;
      },
      (error) => {
        console.error('Error fetching crop plot options:', error);
      }
    );
  }
  getAllTreeOptions() {
    this.service.getalltree().subscribe(
      (data) => {
        this.TreesOptions = data;

      },
      (error) => {
        console.error('Error fetching crop plot options:', error);
      }
    );
  }

  getAllElementsOptions() {
    this.service.getallelement().subscribe(
      (data) => {
        this.elementsOptions = data;
      },
      (error) => {
        console.error('Error fetching crop plot options:', error);
      }
    );
  }

// icanselecttree = false;
  onchange(event: any) {
   // this.selectedParcelleCulturalId = event.target.value;
    console.log("event", event);
    // this.icanselecttree = true;
    // Filter the treesOptions based on the selectedParcelleCulturalId
      this.TreesOptions = this.TreesOptions.filter(
        (arbre) => arbre.ID_ParcelleCulturale === event
      );
  }
} 
  


