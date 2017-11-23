import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {SERVER_URL} from './config';

let apiUrl = SERVER_URL;

@Injectable()
export class ProjectService {
    
    constructor(public http: Http) {   }

    getProjects(id,type) {

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'project/list?id='+id+'&type='+type ,options).map(res => res.json())
            .toPromise();

    }

    getMilestones(project_id,cont_id,type) {

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'project/project_milestones?id='+cont_id+'&project_id='+project_id+'&type='+type ,options)
        .map(res => res.json())
        .toPromise();
    }

    getWorkItems(project_id){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'project/work_items?project_id='+project_id ,options).map(res => res.json())
        .toPromise();
    }

    updateMilestoneStatus(formdata:any){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(apiUrl + 'project/milestone_update', formdata, options).map(res => res.json())
        .toPromise();
    }

    getCompletedMilestone(id){

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(apiUrl + 'project/milestone_status?id='+ id, options).map(res => res.json())
        .toPromise();
    }
    getOngoingProjects(id)
    {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(apiUrl + 'project/get_ongoing_projects_by_manager?id='+ id, options).map(res => res.json())
        .toPromise();
    }

}
