import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../core/services/values.service';

@Component({
  selector: 'app-send-values',
  templateUrl: './send-values.component.html',
  styleUrls: ['./send-values.component.css']
})
export class SendValuesComponent implements OnInit {

  textToUpper: string;
  constructor(private _valuesService: ValuesService) { }

  ngOnInit() {
  }

  send() {
    this._valuesService.SendValue(this.textToUpper).subscribe(value => this.textToUpper = value);
  }

}
