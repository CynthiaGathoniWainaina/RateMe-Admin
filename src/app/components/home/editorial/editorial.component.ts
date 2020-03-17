import { Component, OnInit } from '@angular/core';
import { InterestService } from 'src/app/shared/services/interest.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { RatingRangeService } from 'src/app/shared/services/ratingRange.service';
import { TemplateService } from 'src/app/shared/services/template.service';
import { ResponseService } from 'src/app/shared/services/response.service';
import { PossibleSolutionService } from 'src/app/shared/services/possibleSolution.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {





  constructor(
    private notification: NotificationService,
    private interestService: InterestService,
    private questionService: QuestionService,
    private industryService: IndustryService,
    private ratingRangeService: RatingRangeService,
    private templateService: TemplateService,
    private resposeService: ResponseService,
    private possibleSolutionService: PossibleSolutionService

  ) { }


public interestForm;
public industryForm;
public ratingRangeForm;
public templateForm;
public questionForm;
public responseForm;
public possibleSolutionForm;

public AllInterests = [];
public AllIndustries = [];
public AllRatingRanges = [];
public AllTemplates = [];
public AllQuestions = [];
public AllResponses = [];
public AllPossibleSolutions = [];



  ngOnInit() {
    this.updatePage();
    this.interestForm = {
      interestName: '',
    };
    this.industryForm = {
      industryName: '',
    };
    this.ratingRangeForm = {
      minimumRange: null,
      maximumRange: null,
      rangeName: ''
    };
    this.templateForm = {
      industryId: '',
      templateName: ''
    };
    this.questionForm = {
      industryId: '',
      templateId: '',
      ratingRangeId: '',
      question: ''
    };
    this.responseForm = {
      questionId: '',
      response: ''
    };
    this.possibleSolutionForm = {
      responseId: '',
      solution: ''
    };
  }


  updatePage() {
    this.interestService.getAllInterests().subscribe(
      data => {
        this.AllInterests = data;
      },
      error => console.log('Error')
    );
    this.industryService.getAllIndustries().subscribe(
      data => {
        this.AllIndustries = data;
      },
      error => console.log('Error')
    );
    this.templateService.getAllTemplates().subscribe(
      data => {
        this.AllTemplates = data;
      },
      error => console.log('Error')
    );
    this.questionService.getAllQuestions().subscribe(
      data => {
        this.AllQuestions = data;
      },
      error => console.log('Error')
    );
    this.possibleSolutionService.getAllPossibleSolutions().subscribe(
      data => {
        this.AllPossibleSolutions = data;
      },
      error => console.log('Error')
    );
    this.resposeService.getAllResponses().subscribe(
      data => {
        this.AllResponses = data;
      },
      error => console.log('Error')
    );
    this.ratingRangeService.getAllRatingRanges().subscribe(
      data => {
        this.AllRatingRanges = data;
      },
      error => console.log('Error')
    );
  }




  addInterest() {
    this.interestService.createInterest(this.interestForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }

  addIndustry() {
    this.industryService.createIndustry(this.industryForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }

  addRatingRange() {
    this.ratingRangeService.createRatingRange(this.ratingRangeForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }

  addTemplate() {
    console.log(this.templateForm)
    this.templateService.createTemplate(this.templateForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }

  addQuestion() {
    this.questionService.createQuestion(this.questionForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }

  addResponse() {
    this.resposeService.createResponse(this.responseForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }

  addPossibleSolution() {
    this.possibleSolutionService.createPossibleSolution(this.possibleSolutionForm).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('Item added', 'Success');
      },
      error => this.notification.showError('Coud not create item', 'Failed')
    );
  }





  removeInterest(id) {
    this.interestService.deleteInterest(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }


  removeIndustries(id) {
    this.industryService.deleteIndustry(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }

  removeRatingRange(id) {
    this.ratingRangeService.deleteRatingRange(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }

  removeTemplate(id) {
    this.templateService.deleteTemplate(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }

  removeQuestion(id) {
    this.questionService.deleteQuestion(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }

  removeResponse(id) {
    this.resposeService.deleteResponse(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }

  removeSolution(id) {
    this.possibleSolutionService.deletePossibleSolution(id).subscribe(
      data => {
        this.updatePage();
        this.notification.showSuccess('deleted', 'Success');
      },
      error => this.notification.showError('could not delete item', 'Failed')
    );
  }

}// end of class
