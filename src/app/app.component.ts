import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { VideoWidget } from './video';
import { Observable, take } from 'rxjs';
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

  // @ViewChild(VideoWidget)
  // videoWidget: VideoWidget | any;

  @ViewChild('videoWidget', { static: false }) videoWidget!: VideoWidget;

  ngAfterViewInit() {
    if (!this.videoWidget) {
      console.error('VideoWidget directive is not initialized!');
    }
  }
  readonly VIDEO_URL = VIDEO_URL;
  name = 'Angular ' + VERSION.major;

  statusBarClick($event: MouseEvent) {
    const el = $event.target as HTMLElement;
    const clickX = $event.offsetX;
    const totalWidth = el.offsetWidth;

    this.videoWidget.duration$.pipe(take(1)).subscribe((duration: number) => {
      const percentComplete = clickX / totalWidth;
      this.videoWidget.seek(duration * percentComplete);
    });
  }
  skip(value: number) {
    debugger;
    if (this.videoWidget) {
      this.videoWidget.seek(
        (this.videoWidget.el.nativeElement.currentTime * 1000) + value * 1000
      );
    }
  }
}
