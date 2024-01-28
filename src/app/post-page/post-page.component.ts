import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<any> | undefined    // был баг с выводом постов в подробнее. поставил андефайнд и убрал <Пост> + поставил эни туда

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}


  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      }))
  }

}
