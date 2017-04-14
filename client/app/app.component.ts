import { Component, OnInit } from '@angular/core';
import {PollService} from './services/poll.service'
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers:[PollService]
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}