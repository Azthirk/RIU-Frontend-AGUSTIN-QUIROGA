import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfig } from './app.config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appName = AppConfig.appName;
  appVersion = AppConfig.appVersion;

  ngOnInit(): void {
    console.log(this.appName, this.appVersion)
  }
}
