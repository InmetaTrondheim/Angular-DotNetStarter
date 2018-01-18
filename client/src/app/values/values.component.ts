import { Component, OnInit } from '@angular/core';
import { ValuesService } from '../core/services/values.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css'],
  providers: [ValuesService]
})
export class ValuesComponent implements OnInit {

  values: string[];
  constructor(private _valuesService: ValuesService) { }

  ngOnInit() {
    this._valuesService.GetValues().subscribe(val => this.values = val);
  }

}
