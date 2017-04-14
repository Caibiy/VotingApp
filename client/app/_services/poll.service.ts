import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class PollService {

    constructor(private http:Http,private router:Router){
        console.log('Poll Service Inited');
    }

    newPoll(poll){
        var headers= new Headers();
        console.log('new poll.....');
        this.http.post('/api/newpoll',poll,{headers:headers}).subscribe(function(str){
          
               this.router.navigate(['/']);
            
        });
    }
    
}