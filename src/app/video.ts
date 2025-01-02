import { CommonModule } from '@angular/common';
import { Directive, ElementRef, inject, NgModule, Output } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { map, filter, startWith, mapTo } from 'rxjs/operators';

enum VideoState {
  PLAYING = 1,
  STOPPED,
}

function observeProperty(
  el: HTMLElement | any,
  propertyName: string,
  eventName: string
) {
  return fromEvent(el, eventName, { passive: true }).pipe(
    startWith(el[propertyName]),
    map(() => el[propertyName]),
    filter((v) => !isNaN(v))
  );
}

@Directive({
  selector: 'video[fireVideo]',
})
export class VideoWidget {
  readonly el = inject(ElementRef<HTMLVideoElement>);
  @Output('playing')
  readonly play$ = fromEvent(this.el.nativeElement, 'play');

  @Output('paused')
  readonly pause$ = fromEvent(this.el.nativeElement, 'pause');

  /** The current playback position of the video in MS */
  @Output('currentTimeChanged')
  readonly currentTime$ = observeProperty(
    this.el.nativeElement,
    'currentTime',
    'timeupdate'
  ).pipe(map((v) => v * 1000));

  /** The current duration of the video in MS */
  @Output('durationChanged')
  duration$ = observeProperty(
    this.el.nativeElement,
    'duration',
    'durationchange'
  ).pipe(map((v) => v * 1000));

  /** Returns the current state of the element */
  readonly state$ = merge(
    this.play$.pipe(mapTo(VideoState.PLAYING)),
    this.pause$.pipe(mapTo(VideoState.STOPPED))
  ).pipe(startWith(VideoState.STOPPED));

  constructor() {
    this.state$.subscribe((v) => console.log(v));
    this.duration$.subscribe(console.log);

    this.currentTime$.subscribe((v) => console.log(v));
  }

  /** Seeks to specified time (in MS) */
  seek(to: number) {
    // Current time is expressed in S, but MS makes more sense.
    this.el.nativeElement.currentTime = to / 1000;
  }

  /** pause */
  pause() {
    this.el.nativeElement.pause();
  }

  play() {
    this.el.nativeElement.play();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [VideoWidget],
  exports: [VideoWidget],
})
export class VideoWidgetModule {}
