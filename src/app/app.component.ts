import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormArray } from '@angular/forms';
import { FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactiveform';
  reactiveform:FormGroup;
  notsamepassword:boolean=false;
  ngOnInit(){
    this.reactiveform = new FormGroup({
      name: new FormControl(null,Validators.required),
      password: new FormControl(null,[Validators.required]),
      confirmpassword: new FormControl(null,Validators.required),
      emails: new FormArray([
        new FormControl(null,[Validators.email,Validators.required])
      ])
    },{validators:[this.passwordMatchValidator]})
  }
  passwordMatchValidator(group: AbstractControl){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }
  submit(){
    console.log(this.reactiveform);
  }
  addmail(){
    (<FormArray>this.reactiveform.get('emails')).push(new FormControl(null,[Validators.email,Validators.required]));
  }
  delete(i:number){
    (<FormArray>this.reactiveform.get('emails')).removeAt(i);
  }
}
