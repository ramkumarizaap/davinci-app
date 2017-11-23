import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class ContractorService {

	constructor(public http: Http) {   }

	getContractors(id) {

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'contractors/list?id='+id,options).map(res => res.json())
            .toPromise();
    }

    getContractorById(id)
    {
    	let headers = new Headers();
      let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'contractors/get_contractor_by_id?id='+id,options).map(res => res.json())
            .toPromise();
    }
}