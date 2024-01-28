import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {Subscription, switchMap} from "rxjs";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy{

  form: FormGroup | any
  post: Post | any
  submitted = false
  updateSubscription: Subscription | any

  constructor(
    private route: ActivatedRoute,  //тип - активйтедроут
    private postsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.updateSubscription = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false
      this.alert.success('Пост был обновлен')
    })
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

}
