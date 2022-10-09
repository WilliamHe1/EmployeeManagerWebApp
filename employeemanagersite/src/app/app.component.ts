import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { observable } from 'rxjs';
import {Employee} from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees!: Employee[];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService){}

  //Override OnInit runs when this component is initialized
  ngOnInit() {
    this.getEmployees();
  }

  public searchEmployees(key: string): void {

    console.log(key);
    
    const results: Employee[] = [];

    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }

    }

    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

  public getEmployees(): void {
      const myObserver = {
        next: (response: Employee[]) => this.employees = response,
        error: (err: HttpErrorResponse) => alert(err.message)
      }

      this.employeeService.getEmployees().subscribe(myObserver);
   }


   public onDeleteEmployee(employeeId: number): void {

    const myObserver = {
      next: (response: void) => {
      
      console.log(response);
      this.getEmployees()
    
    },

      error: (err: HttpErrorResponse) => 
      
      alert(err.message)

    }
    this.employeeService.deleteEmployee(employeeId).subscribe(myObserver);
   }

   public onUpdateEmployee(employee: Employee): void {

    const myObserver = {
      next: (response: Employee) => {
      
      console.log(response);
      this.getEmployees()
    
    },

      error: (err: HttpErrorResponse) => 
      
      alert(err.message)

    }
    this.employeeService.updateEmployee(employee).subscribe(myObserver);
   }


   public onAddEmployee(addForm: NgForm): void {

    document.getElementById('add-employee-form')?.click(); /*closes form when you add the employee (after finishing the form).
    by clicking on Save changes. */

    const myObserver = {
      next: (response: Employee) => {
      
      console.log(response);
      this.getEmployees();
      addForm.reset();
    
    },

      error: (err: HttpErrorResponse) => {
        alert(err.message);
        addForm.reset();
      }

    }

    this.employeeService.addEmployee(addForm.value).subscribe(myObserver);
   }

   public onOpenModal(mode: string, employee?: Employee): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button); //get button to exist in app.component.html
    button.click();
    //container?.removeChild(button);

    //num: Number :0;
   }
  }
