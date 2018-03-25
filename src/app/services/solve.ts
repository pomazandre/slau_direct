import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DecisionService {
private _urlAPI: string;

constructor(private http: HttpClient) {
  this._urlAPI = '/scripts/solve.php';
}

solve(size: number, eps: number, coeffs: any[], vector_b: any[]): Observable<any> {
  const query_args: string[] = new Array();
  let query_: string;

  for (let i = 1; i <= size; i++) {
    const row_ = coeffs[i - 1];
    for (let j = 1; j <= size; j++) {
      const name_arg_ = 'a' + i + j;
      const value_arg_ = row_['x' + j];
      query_args.push(name_arg_ + '=' + value_arg_);
    }
  }
  for (let i = 1; i <= size; i++) {
      const name_arg_ = 'b' + i;
      const value_arg_ = vector_b[0]['x' + i];
      query_args.push(name_arg_ + '=' + value_arg_);
  }
  query_ = query_args.join('&');
  //http://pomaz.biz/scripts/solve.php?size=2&a11=2&a12=1&a21=1&a22=2&b1=2&b2=2&e=0.01
  return this.http.get(this._urlAPI + '?size=' + size + '&e=' + eps + '&' +  query_);
}

}
