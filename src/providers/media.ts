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

  //uploading the media to server and takes formdata as parameter
  /*********
   * 
   * These are for the Posting the media and setting filters to them and also getting posts to front and mediaplayer
   * 
   *********/

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

   /*********
   * 
   * These are for the user defined tags and it is not implemented yet
   * 
   *********/

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

  /*********
   * 
   * These are for the Like button and likecount
   * 
   *********/

  getFavorites = (id: number) => {
    return this.http.get(this.url + `/favourites/file/${id}`)
      .map(
        resp => 
        resp.json()
      );
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

   /*********
   * 
   * These are for the Posting and getting comments 
   * 
   *********/


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

   /*********
   * 
   * These are for the Posting rating and getting rating in the posts
   * 
   *********/

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

  deleteOwnPost = (fileid: any) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;
    return this.http.delete(this.url + '/media/' + fileid + '?token=' + this.token)
    .map(
      res=>
        res.json()
    );
  }


}
