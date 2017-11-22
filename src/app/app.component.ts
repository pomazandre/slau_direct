import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private _mdlRow: number;
  private _mdlCol: number;
  private _mdlCoeffs: any[] = [];
  private _mdlSolve: any[] = [];
  private _mdlEpsilon: number;
  cols: any[] = [];

  ngOnInit() {
    this._mdlRow = 1;
    this._mdlCol = 1;
    this.changeMatrix();
  }

  public set mdlRow(value: number) {
    this._mdlRow = value;
  }

  public get mdlRow(): number{
    return this._mdlRow;
  }

  public set mdlCol(value: number) {
    this._mdlCol = value;
  }

  public get mdlCol(): number{
    return this._mdlCol;
  }

  public set mdlCoeffs(value: any[]) {
    this._mdlCoeffs = value;
  }

  public get mdlCoeffs(): any[] {
    return this._mdlCoeffs;
  }

  public set mdlSolve(value: any[]) {
    this._mdlSolve = value;
  }

  public get mdlSolve(): any[]{
    return this._mdlSolve;
  }

  public set mdlEpsilon(value: number) {
    this._mdlEpsilon = value;
  }

  public get mdlEpsilon(): number{
    return this._mdlEpsilon;
  }


  onSolve() {
   console.log(this._mdlSolve);
  }

  changeMatrix() {
    this._mdlCoeffs = [];
    this.cols = [];
    this._mdlSolve = [];
    for (let i = 0; i < this._mdlCol; i++ ) {
      const j: number = i + 1;
      this.cols.push({field: 'x' + j, header: ''});
    }
    for (let i = 0; i < this._mdlRow; i++ ) {
      let row: any = {};
      for (let j = 0; j < this._mdlCol; j++ ) {
        const k: number = j + 1;
        row['x' + k] = 0;
      }
      this._mdlCoeffs.push(row);
      console.log(row);
    }
    let row: any = {};
    for (let j = 0; j < this._mdlCol; j++ ) {
      const k: number = j + 1;
      row['x' + k] = 0;
    }
    this._mdlSolve.push(row);
  }

}
