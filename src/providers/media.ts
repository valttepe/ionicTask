import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Media provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Media {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: any = {};

  constructor(public http: Http) {
    console.log('Hello Media Provider');
  }

  getMedia = () => {
    return this.http.get(this.url + '/media')
      .map(
      res =>
        res.json()

      );
  }

  //this is used to get more media to front page

  getNew = (amount: number) => {
    //GET http://[BASE-URL]/media?start=10&limit=10
    return this.http.get(this.url + `/media?limit=${amount}`);
  };

  //uploading the media to server and takes formdata as parameter

  postMedia = (formContent: any) => {
    // this.http.post(this.url, this.user,.....)
    return this.http.post(this.url + '/media?token=' + JSON.parse(localStorage.getItem("user")).token, formContent)
      .map(
      resp => 
        resp.json()
     );
  }

  postTagFilter = (filetag: any) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;
    return this.http.post(this.url + '/tags?token=' + this.token, filetag )
      .map(
        resp =>
          resp.json()
      );
  }

  getTagFilter = () => {
    return this.http.get(this.url + '/tags/%23HereForBeer')
      .map(
        res => 
          res.json()
      );
  }

  postUserTags = (tags: any) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;
    return this.http.post(this.url + '/tags?token=' + this.token, tags)
  }


  //get one mediafile to media display page and needs file_id as parameter

  getMediaFile = (fileid: any) => {
    return this.http.get(this.url + '/media/' + fileid)
      .map(
      respo =>
        respo.json()

      );

  }

  //gets all userdata from server and needs user_id as parameter

  getUserInfo = (userid: any) => {
    console.log(localStorage.getItem("user"));
    return this.http.get(this.url + '/users/' + userid + '?token=' + JSON.parse(localStorage.getItem("user")).token)
      .map(
      re =>
        re.json()
      );
  }

  //gets favorites to specific mediafile and needs file_id as parameter

  getFavorites = (id: number) => {
    return this.http.get(this.url + `/favourites/file/${id}`);
  }

  //liking media and needs file_id as parameter

  likeMedia = (id: number) => {
    console.log("liking: " + id);
    this.token = JSON.parse(localStorage.getItem("user")).token;
    console.log(this.token);
    return this.http.post(this.url + `/favourites?token=` + this.token, {"file_id": id});
  }

  //disliking media and needs file_id as parameter

  dislikeMedia = (id: number) => {
    console.log("disliking: " + id);
    this.token = JSON.parse(localStorage.getItem("user")).token;
    console.log(this.token);
    return this.http.delete(this.url + `/favourites/file/${id}?token=` + this.token);
  }

  postComment = (comment: any) => {
    console.log("postComment" + comment);
    this.token = JSON.parse(localStorage.getItem("user")).token;
    console.log(this.token);
    return this.http.post(this.url + '/comments?token=' + this.token, comment)
    .map(
      re =>
        re.json()
      );
  }

  getComments = (id: number) => {
    console.log("getComments");
    return this.http.get(this.url + '/comments/file/' + id)
    .map(
      res =>
        res.json()
    );
  }

  getRating = (id: number) => {
    return this.http.get(this.url + '/ratings/file/' + id)
    .map(
      res =>
        res.json()
    );
  }

  postRating = (filerate: any) => {
      this.token = JSON.parse(localStorage.getItem("user")).token;
      return this.http.post(this.url + '/ratings?token=' + this.token, filerate)
      .map(
        res =>
          res.json()
      );
  }
}
