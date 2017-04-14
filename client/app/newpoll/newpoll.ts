import { Component, OnInit } from '@angular/core';
import {poll} from '../../poll';
import {PollService} from '../services/poll.service';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'newpoll',
    templateUrl: 'app/components/newpoll.html'
})
export class NewPollComponent implements OnInit {
    private poll :poll;
    private option1:string;
    private option2:string;
    private option3:string;
    private title:string;
    constructor(private pollService:PollService) {

     }

    ngOnInit() { 
        
    }
    newPoll(event){
        event.preventDefault();
        var options=[{
            item:this.option1,
            voted:0},{
                item:this.option2,
                voted:0
            },{
                item:this.option3,
                voted:0
            }];
        var poll={
            options:options,
            title:this.title
        };
            this.pollService.newPoll(poll);
            console.log('poll: '+poll);
    }
}