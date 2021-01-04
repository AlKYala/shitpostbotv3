import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../shared/services/localstorage.service';
import {ImageService} from '../../shared/image/service/image.service';
import {TemplateService} from '../../shared/template/service/template.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Image} from '../../shared/image/model/Image';
import {Template} from '../../shared/template/model/Template';
import {UserService} from '../../shared/user/service/user.service';
import {User} from '../../shared/user/model/User';
import {UserToken} from '../../shared/interfaces/UserToken';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private images: Image[];
  private templates: Template[];
  private posterId: number;
  private poster: User;

  constructor(private readonly localStorageService: LocalStorageService,
              private readonly imageService: ImageService,
              private readonly templateService: TemplateService,
              private readonly userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.resolveRouterParam();
    this.initTemplates();
    this.initImages();
    this.initUser();
  }

  ngOnDestroy(): void {
  }

  private resolveRouterParam(): void {
    this.route.paramMap.pipe().subscribe((params: ParamMap) => {
      this.posterId = (parseInt(params.get('id'), 10));
    });
  }
  private initTemplates(): void {
    this.templateService.findAll().pipe().subscribe((templates: Template[]) => {
      this.templates = templates.filter((template: Template) => template.poster.id === this.posterId);
    });
  }
  private initImages(): void {
    this.imageService.findAll().pipe().subscribe((images: Image[]) => {
      this.images = images.filter((image: Image) => image.poster.id === this.posterId);
    });
  }
  private initUser(): void {
    this.userService.findById(this.posterId).pipe().subscribe((user: User) => {
      this.poster = user;
    });
  }
  private routeToImage(image: Image): Promise<boolean> {
    return this.router.navigateByUrl(`/images/${image.id}`);
  }
  private routeToTemplate(template: Template): Promise<boolean> {
    return this.router.navigateByUrl(`/templates/${template.id}`);
  }
}
