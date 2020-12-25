import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user/service/user.service';
import {TemplateService} from '../../shared/template/service/template.service';
import {Template} from '../../shared/template/model/Template';
import {first} from 'rxjs/operators';
import {Image} from '../../shared/image/model/Image';

@Component({
  selector: 'app-template-gallery',
  templateUrl: './template-gallery.component.html',
  styleUrls: ['./template-gallery.component.css']
})
export class TemplateGalleryComponent implements OnInit {
  public templates: Template[];

  constructor(private readonly router: Router,
              private readonly userService: UserService,
              private readonly templateService: TemplateService) { }
  ngOnInit(): void {
    this.loadAllTemplates();
  }
  private loadAllTemplates(): void {
    this.templateService.findAll()
      .pipe(first())
      .subscribe((templates: Template[]) => {
        this.templates = templates;
        console.log(this.templates.length);
      });
  }
}
