import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import {record, tree } from '../Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }


  Getrecord():Observable<record[]>{
    return this.http.get<record[]>("http://agridata.hopto.org:9010/agridata-lga-backend/api/comptageArbre/load/_getall");
  }

  Saverecord(data:any){
    console.log(data)
    return this.http.post("http://agridata.hopto.org:9010/agridata-lga-backend/api/comptageArbre/_create",data);
  }
  updateRecord(ID: number, data: any): Observable<any> {
    const url = `http://agridata.hopto.org:9010/agridata-lga-backend/api/comptageArbre/_update`;
    
    return this.http.post(url, { ID, ...data });
  }

  getallcropplot():Observable<any[]>
  {
    return this.http.get<any[]>('http://agridata.hopto.org:9010/agridata-lga-backend/api/get_parcelle_cultural/1');
  }
  getalltree():Observable<any[]>
  {
    return this.http.get<any[]>('http://agridata.hopto.org:9010/agridata-lga-backend/api/arbre/trees/_allarbre');
  }
  getallelement():Observable<any[]>
  {
    return this.http.get<any[]>('http://agridata.hopto.org:9010/agridata-lga-backend/api/get_elementcomptage');
  }

  private apiUrl = 'http://agridata.hopto.org:9010/agridata-lga-backend/api/comptageArbre/_delete';

  deleteRecordById(id: number) {
    const payload = {
      ID: id
    };

    // Send the POST request with the payload to the API URL
    return this.http.post(this.apiUrl, payload);
  }

}



