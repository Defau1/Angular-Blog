import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import { AlertComponent } from './components/alert/alert.component';
import {NgClass, NgIf} from "@angular/common";

@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
        NgClass,
        NgIf
    ],
    exports: [
        HttpClientModule,
        QuillModule,
        AlertComponent,
        // публичный апи. другие модули могут его видеть
    ],
  declarations: [
    AlertComponent
  ]
})
export class SharedModule {

}
