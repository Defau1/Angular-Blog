import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PostPageComponent} from "./post-page/post-page.component";


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
    ]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)}//для лейзи пишем лоадчилдрен"переходим в папку адм+адм.модуль".Это новый синтаксис с 9 version
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // на фоне 'загрузится' админка. будет доступна как зайдем
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
