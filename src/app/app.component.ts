import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'photos';

  public searchText = '';

  public photos: Array<any> = [];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.setList();
  }

  public getList(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/photos');
  }

  public setList(): Observable<any> | void {
    this.getList().subscribe(result => {
      console.log(result);
    });
  }

  public getResults(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/photos' + '?albumId=' + this.searchText);
  }

  public setResults(): Observable<any> | void {
    this.getResults().subscribe(result => {
      console.log(result);
      const array = [];
      for (let i = 0; i < result.length; i++) {
        this.photos = result[i];
        array.push(this.photos);
        console.log(this.photos);
        this.photos = array;
      }
    });
  }
}
