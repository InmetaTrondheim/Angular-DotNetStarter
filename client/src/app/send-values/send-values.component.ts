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
    const formData = new FormData(this.textToUpper);
    this._valuesService.SendValue(formData).subscribe(value => this.textToUpper = value.value);
  }
}

export class FormData {
  value: string;

  constructor(value: string){ this.value = value; }
}
