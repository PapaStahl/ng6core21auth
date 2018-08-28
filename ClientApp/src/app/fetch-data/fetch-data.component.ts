import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user-service.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];
  apiUrl: string;
  Msg: string

  constructor(public http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    public userService: UserService
  ) {
    this.apiUrl = baseUrl + 'api/';
  }

  ngOnInit() {
    if (!this.userService.token) {
      this.Msg = 'Please log in.'
      return;
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'bearer ' + this.userService.token.access_token);
    let requestOptions = { headers: headers };

    this.http.get<WeatherForecast[]>(this.apiUrl + 'SampleData/WeatherForecasts', requestOptions)
      .subscribe(
        result => {
        this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
