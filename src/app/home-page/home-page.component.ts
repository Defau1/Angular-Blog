import {Component, OnInit} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  posts$?: Observable<Post[]> //тут произошел фикс ошибки: добавил ?. Была ошибка в хом-пэйдж-хтмл. А именно на *ngFor подсвечивался of.

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.posts$ = this.postsService.getAll()  // без подписки, тк юзаем асинк пайп
  }

}
