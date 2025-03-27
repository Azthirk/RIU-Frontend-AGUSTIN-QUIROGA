import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfig } from './app.config';
import { HeroHeaderComponent } from './heroes/components/hero-header/hero-header.component';
import { LoadingService } from './heroes/services/loading.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public loadingService: LoadingService){}

  appName = AppConfig.appName;
  appVersion = AppConfig.appVersion;

  ngOnInit(): void {
    console.log(this.appName, this.appVersion)
  }
}
