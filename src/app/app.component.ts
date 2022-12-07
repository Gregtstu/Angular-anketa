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
  public checkArr1: {id:number, cheked: boolean, value: string }[];
  public universatyArray: string[];
  public allCheked: boolean;

  constructor() {
    this.oldValue = 1;
    this.universatyArray = [];
    this.allCheked = false;
    this.checkArr1 = [
      {id:0, cheked: false, value: 'Общение'},
      {id:1, cheked: false, value: 'Иностранные языки'},
      {id:2, cheked: false, value: 'Бег с препятствиями'},
      {id:3, cheked: false, value: 'Быстрое чтение'},
      {id:4, cheked: false, value: 'Самозащита'},
      {id:5, cheked: false, value: 'Вождение'},
      {id:6, cheked: false, value: 'Программирование'},
      {id:7, cheked: false, value: 'Управление вертолетом'},
      {id:8, cheked: false, value: 'Оперное пении'},
      {id:9, cheked: false, value: 'Выделить все'},
    ];
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

  checked(checkbox: any, i:number) {
    console.log(checkbox.cheked)
    if(checkbox.value == 'Выделить все' ){
      this.allCheked = true;
      this.checkArr1.map(item => {
        if (item.cheked == false){
          item.cheked = true;
        }
      });
    }
    if (!(checkbox.value == 'Выделить все') ){
      this.checkArr1.map(item => {
        if(item.cheked == false && i == item.id){
          item.cheked = true;
        }else {
          item.cheked = false;

        }
      });
    }
    this.form.value.skillUser = this.checkArr1;

    console.log(this.form.value)
  }
}
