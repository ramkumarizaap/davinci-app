import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class ManagerService {

	constructor(public http: Http) {   }

	getManager(id,role) {

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'managers/list?id='+id+'&role='+role,options).map(res => res.json())
            .toPromise();
    }

}