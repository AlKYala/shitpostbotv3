import {Component, Input, OnInit} from '@angular/core';
import {Template} from '../../shared/template/model/Template';

@Component({
  selector: 'app-template-item',
  templateUrl: './template-item.component.html',
  styleUrls: ['./template-item.component.scss']
})
export class TemplateItemComponent implements OnInit {
  @Input() public template: Template;

  constructor() {
  }

  ngOnInit(): void {
  }

}
