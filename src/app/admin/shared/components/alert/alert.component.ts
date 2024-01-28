import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../../../shared/services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000

  public text: string | any
  public type = 'success'

  alertSub: Subscription  | any

  constructor(private alertService: AlertService) {}

  ngOnDestroy() {
      if (this.alertSub) {
        this.alertSub.unsubscribe()
      }
    }

  ngOnInit() {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timout = setTimeout(() => {
        clearTimeout(timout)
        this.text = ''
      }, this.delay)
    })
  }

}
