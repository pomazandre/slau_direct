import { Component, OnInit } from '@angular/core';
import { DecisionService } from './services/solve';
import {Message} from 'primeng/components/common/api';

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
  private _mdlVectorB: any[] = [];
  private _mdlEpsilon: number;
  cols: any[] = [];
  private _mdlMsgs: Message[] = [];

  constructor (private _decisionService: DecisionService) {
  }

  ngOnInit() {
    this.mdlRow = 1;
  }

  private setRowsCols(value: number) {
    this._mdlRow = value;
    this._mdlCol = value;
    this.changeMatrix();
  }

  public set mdlRow(value: number) {
    this.setRowsCols(value);
  }

  public get mdlRow(): number{
    return this._mdlRow;
  }

  public set mdlCol(value: number) {
    this.setRowsCols(value);
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

  public set mdlVectorB(value: any[]) {
    this._mdlVectorB = value;
  }

  public get mdlVectorB(): any[]{
    return this._mdlVectorB;
  }

  public set mdlMsgs(value: Message[]) {
    this._mdlMsgs = value;
  }

  public get mdlMsgs(): Message[]{
    return this._mdlMsgs;
  }

  changeMatrix() {
    this._mdlCoeffs = [];
    this.cols = [];
    this._mdlSolve = [];
    this._mdlVectorB = [];
    for (let i = 0; i < this._mdlCol; i++ ) {
      const j: number = i + 1;
      this.cols.push({field: 'x' + j, header: ''});
    }
    let row: any;
    for (let i = 0; i < this._mdlRow; i++ ) {
      row = {};
      for (let j = 0; j < this._mdlCol; j++ ) {
        const k: number = j + 1;
        row['x' + k] = 0;
      }
      this._mdlCoeffs.push(row);
    }
    row = {};
    for (let j = 0; j < this._mdlCol; j++ ) {
      const k: number = j + 1;
      row['x' + k] = 0;
    }
    this._mdlVectorB.push(row);
    row = {};
    for (let j = 0; j < this._mdlCol; j++ ) {
      const k: number = j + 1;
      row['x' + k] = 0;
    }
    this._mdlSolve.push(row);
  }

  onSolve() {
    this._decisionService.solve(this._mdlRow, this._mdlEpsilon, this._mdlCoeffs, this._mdlVectorB)
      .subscribe(resp => this.setSolve(resp as number[]));
  }

  setSolve(resp: number[]) {
    if (resp.length !== 0) {
    const row_ = this._mdlSolve[0];
    for (let i = 1; i <= this._mdlRow; i++) {
      row_['x' + i] = resp[i];
      }
    } else {
      this._mdlMsgs.push({severity: 'warn', summary: '',
                          detail: 'Итерационный процесс расходится. Численное решение не может быть найдено.'});
    }
  }



}
