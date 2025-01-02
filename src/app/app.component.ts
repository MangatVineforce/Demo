import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { VideoWidget } from './video';
import { RouterOutlet } from '@angular/router';
//const VIDEO_URL ='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_URL = 'assets/images/AccountsPermission.mp4';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  defaultProfilePicture = 'assets/images/Camera.jpg';

  @ViewChild(VideoWidget)
  videoWidget: VideoWidget | any;
  readonly VIDEO_URL = VIDEO_URL;
  name = 'Angular ' + VERSION.major;

  skip(value: number) {

    if (this.videoWidget) {
      this.videoWidget.seek(
        this.videoWidget.el.nativeElement.currentTime * 1000 + value * 1000
      );
    }
  }
}
