import { Injectable } from '@angular/core';
import { videos } from './videos-data';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private videos: Video[];
  public pagedVideos: { page: Video[] }[] = [];

  constructor() {
    this.videos = videos;

    for (let i = 0; i < this.videos.length - 3; i += 3) {
      this.pagedVideos.push({
        page: this.videos.slice(i, i + 3)
      });
    }
  }
}

export class Video {
  src: string;
}
