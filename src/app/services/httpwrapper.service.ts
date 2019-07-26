import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  constructor(
    private _http: HttpClient,
  ) { }

  public get = (url: string, params?: any, options?: any): Promise<any> => {
    options = this.prepareOptions(options);
    options.params = params;
    return this._http.get(url, options).toPromise();
  }
  public post = (url: string, body: any, options?: any): Promise<any> => {
    options = this.prepareOptions(options);
    return this._http.post(url, body, options).toPromise();
  }
  public put = (url: string, body: any, options?: any): Promise<any> => {
    options = this.prepareOptions(options);
    return this._http.put(url, body, options).toPromise();
  }
  public delete = (url: string, params?: any, options?: any): Promise<any> => {
    options = this.prepareOptions(options);
    options.search = this.objectToParams(params);
    return this._http.delete(url, options).toPromise();
  }
  public patch = (url: string, body: any, options?: any): Promise<any> => {
    options = this.prepareOptions(options);
    return this._http.patch(url, body, options).toPromise();
  }

  private prepareOptions(options: any): any {
    options = options || {};

    if (!options.headers) {
      options.headers = {} as any;
    }

    if (!options.headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json';
    }

    options.headers = new HttpHeaders(options.headers);

    if (!options.observe) {
      options.observe = 'response';
    }
    options.responseType = 'json';
    return options;
  }

  private isPrimitive(value) {
    return value == null || (typeof value !== 'function' && typeof value !== 'object');
  }

  private objectToParams(object = {}) {
    return Object.keys(object).map(value => {
      const objectValue = this.isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
      return `${value}=${objectValue}`;
    }).join('&');
  }
}
