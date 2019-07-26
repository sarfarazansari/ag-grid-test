

export interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface IId {
  kind: string;
  videoId: string;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnails {
  default: Default;
  medium: Medium;
  high: High;
}

export interface ISnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

export interface IItem {
  kind: string;
  etag: string;
  id: IId;
  snippet: ISnippet;
}

export interface IRootObj {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: IPageInfo;
  items: IItem[];
}

