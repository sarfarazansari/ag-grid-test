import { Injectable } from '@angular/core';
import { HttpWrapperService } from './httpwrapper.service';
import { BaseResponse } from '../models';
import { IRootObj } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(
    private _http: HttpWrapperService,
  ) { }

  getData(): Promise<BaseResponse<IRootObj, any>> {
    // tslint:disable-next-line: max-line-length
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john`;
    return this._http.get(url);
  }
}
