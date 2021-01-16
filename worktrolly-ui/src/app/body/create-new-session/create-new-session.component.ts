import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-new-session',
  templateUrl: './create-new-session.component.html',
  styleUrls: ['./create-new-session.component.css']
})
export class CreateNewSessionComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  title: string
  todayDate: string
  description: string
  assigneeName: string
  creatorName: string
  estimatedTime: number
  category: string
  priority: string
  difficulty: string
  status: string
  sprintNumber: number
  storyPoint: number
  enableLoader: boolean = false
  valid: boolean = true;

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router, private location: Location) { }
  ngOnInit(): void {
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.todayDate = dd + "/" + mm + "/" + yyyy;
  }

  async validate(){
    let labels = ['title', 'status', 'priority', 'estimatedTime', 'difficulty', 'description', 'creator', 'category', 'assignee', 'creationDate', 'sprintNumber', 'storyPoint'];
    let values = [this.title, this.status, this.priority, this.estimatedTime, this.difficulty, this.description, this.creatorName, this.category, this.assigneeName, this.todayDate, this.sprintNumber, this.storyPoint];
    var condition = await (this.validationService.checkValidity(labels,values)).then(res => {
      return res;});
    if(condition)
    {
      console.log("Inputs are valid");
      this.createNewSession();
    }
    else
    console.log("Task not created! Validation error");
  }

  async createNewSession() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('createNewTask');

    try {
      const result = await callable({ Title: this.title, Description: this.description, Priority: this.priority, Difficulty: this.difficulty, Creator: this.creatorName, Assignee: this.assigneeName, EstimatedTime: this.estimatedTime, Status: this.status, Category: this.category, SprintNumber: this.sprintNumber, StoryPointNumber: this.storyPoint, CreationDate: this.todayDate }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  backToDashboard(){
    this.location.back()
  }

}
