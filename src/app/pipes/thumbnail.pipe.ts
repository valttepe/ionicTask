import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args == "") {
      return value;
    }

    else if (args == "small") {
      let filename = value.substring(0, value.length - 4);
      let tb = "-tn160.png";
      return filename + tb;
    }

    else if (args == "medium") {
      let filename = value.substring(0, value.length - 4);
      let tb = "-tn320.png";
      return filename + tb;
    }

    else if (args == "large") {
      let filename = value.substring(0, value.length - 4);
      let tb = "-tn640.png";
      return filename + tb;
    }



  }

}
