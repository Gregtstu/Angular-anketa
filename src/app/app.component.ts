import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form!: FormGroup;
  public oldValue: number;
  public index: number;
  public checkArr1: { cheked: boolean, value: string }[];
  public checkArr2: { cheked: boolean, value: string }[];
  public universatyArray: string[];
  public lastIndex: number;
  public allCheked: boolean;

  constructor() {
    this.oldValue = 1;
    this.universatyArray = [];
    this.allCheked = false;
    this.checkArr1 = [
      {cheked: false, value: 'Общение'},
      {cheked: false, value: 'Иностранные языки'},
      {cheked: false, value: 'Бег с препятствиями'},
      {cheked: false, value: 'Быстрое чтение'},
      {cheked: false, value: 'Самозащита'},
    ];
    this.checkArr2 = [
      {cheked: false, value: 'Вождение'},
      {cheked: false, value: 'Программирование'},
      {cheked: false, value: 'Управление вертолетом'},
      {cheked: false, value: 'Оперное пении'},
      {cheked: false, value: 'Выделить все'},
    ];

    this.lastIndex = this.checkArr2.length - 1;
    this.index = this.universatyArray.indexOf(this.universatyArray[this.universatyArray.length - 1]);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nameUser: new FormControl('',),
      oldUser: new FormControl(this.oldValue,),
      familyUser: new FormControl('Не женат / не замужем'),
      universaty: new FormArray([]),
      placeBornUser: new FormControl('Не важно'),
      skillUser: new FormArray([]),
    });
  }

  onIncriment(): void {
    this.oldValue++;
  }

  onDecriment(): void {
    this.oldValue--;
    if (this.oldValue <= 0) this.oldValue = 1;
  }


  addUniversaty(universatyValue: HTMLInputElement): void {
    const control = new FormControl(universatyValue.value, Validators.required);
    (this.form.get('universaty') as FormArray).push(control)
    universatyValue.value = '';
  }


  getControls() {
    return (this.form.get('universaty') as FormArray).controls;
  }

  deleteUniversaty(): void {
    (this.form.get('universaty') as FormArray).removeAt(this.index);
  }

  subbmit(): void {
    if (this.form.valid) console.log(this.form.value);
  }

  checked(checkbox: any) {
    if(checkbox.value == 'Выделить все' ){
      this.allCheked = true;
      this.checkArr1.forEach(item => {
        this.form.value.skillUser.push(item.value)
      });
      this.checkArr2.forEach(item => {
        this.form.value.skillUser.push(item.value)
      });
    }
    this.form.value.skillUser.push(checkbox.value)
    console.log(this.form.value)
  }
}
