import { Component, OnInit } from '@angular/core';
import { InterestService } from 'src/app/shared/services/interest.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionService } from 'src/app/shared/services/question.service';
import { IndustryService } from 'src/app/shared/services/industry.service';
import { RatingRangeService } from 'src/app/shared/services/ratingRange.service';
import { TemplateService } from 'src/app/shared/services/template.service';
import { ResponseService } from 'src/app/shared/services/response.service';
import { PossibleSolutionService } from 'src/app/shared/services/possibleSolution.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmojiService } from 'src/app/shared/services/emoji.service';
import { RewardService } from 'src/app/shared/services/reward.service';
import { OrgProfileService } from 'src/app/shared/services/orgProfile.service';


@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {





  constructor(
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private interestService: InterestService,
    private questionService: QuestionService,
    private industryService: IndustryService,
    private ratingRangeService: RatingRangeService,
    private templateService: TemplateService,
    private resposeService: ResponseService,
    private possibleSolutionService: PossibleSolutionService,
    private rewardService: RewardService,
    private orgProfileService: OrgProfileService,
    private emojiService: EmojiService

  ) { }


public faTrash = faTrash;

public interestForm: any;
public industryForm: any;
public ratingRangeForm: any;
public emojiForm: any;
public questionForm: any;
public responseForm: any;
public possibleSolutionForm: any;
public rewardForm: any;

public AllInterests = [];
public AllIndustries = [];
public AllRatingRanges = [];
public AllTemplates = [];
public AllQuestions = [];
public AllResponses = [];
public AllPossibleSolutions = [];
public AllRewards = [];
public AllEmojis = [];
public AllOrgProfiles = [];



  ngOnInit() {
    this.updatePage();
    this.interestForm = {
      interestName: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.industryForm = {
      industryName: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.ratingRangeForm = {
      minimumRange: null,
      maximumRange: null,
      rangeName: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.emojiForm = {
      emojiName: '',
      rangeId: '',
      emojiJson: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.questionForm = {
      industryId: '',
      ratingRangeId: '',
      question: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.responseForm = {
      questionId: '',
      response: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.possibleSolutionForm = {
      responseId: '',
      solution: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.rewardForm = {
      orgId: '',
      points: null,
      reward: '',
      createdAt: new Date(),
      updatedAt: new Date ()
    };
  }


  updatePage() {
    return new Promise((resolve, reject) => {
    this.emojiService.getAllEmojis().subscribe(
      data => {
        this.AllEmojis = data;
      },
      error => console.log('Error')
    );

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
    this.rewardService.getAllRewards().subscribe(
      data => {
        this.AllRewards = data;
      },
      error => console.log('Error')
    );
    this.orgProfileService.getAllOrgProfiles().subscribe(
      data => {
        this.AllOrgProfiles = data;
      },
      error => console.log('Error')
    );
    this.ratingRangeService.getAllRatingRanges().subscribe(
      data => {
        this.AllRatingRanges = data; resolve();
      },
      error => console.log('Error')
    );

    });
  }




  addInterest() {
    this.spinner.show();
    this.interestService.createInterest(this.interestForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.interestForm = {
            interestName: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addIndustry() {
    this.spinner.show();
    this.industryService.createIndustry(this.industryForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.industryForm = {
            industryName: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addRatingRange() {
    this.spinner.show();
    this.ratingRangeService.createRatingRange(this.ratingRangeForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.ratingRangeForm = {
            minimumRange: null,
            maximumRange: null,
            rangeName: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };

        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addTemplate() {
  }

  addEmoji() {
    this.spinner.show();
    this.emojiService.createEmoji(this.emojiForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.emojiForm = {
            emojiName: '',
            rangeId: '',
            emojiJson: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addQuestion() {
    this.spinner.show();
    this.questionService.createQuestion(this.questionForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.questionForm = {
            industryId: '',
            ratingRangeId: '',
            question: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addResponse() {
    this.spinner.show();
    this.resposeService.createResponse(this.responseForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.responseForm = {
            questionId: '',
            response: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };

        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addPossibleSolution() {
    this.spinner.show();
    this.possibleSolutionService.createPossibleSolution(this.possibleSolutionForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.possibleSolutionForm = {
            responseId: '',
            solution: '',
            createdAt: new Date(),
            updatedAt: new Date()
          };
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }

  addReward() {
    this.spinner.show();
    this.rewardService.createReward(this.rewardForm).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item added', 'Success');
          this.rewardForm = {
            orgId: '',
            points: null,
            reward: '',
            createdAt: new Date(),
            updatedAt: new Date ()
          };
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not create item', 'Failed'); }
    );
  }











  // Remove Functions
  removeInterest(id) {
    this.spinner.show();
    this.interestService.deleteInterest(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }


  removeIndustries(id) {
    this.spinner.show();
    this.industryService.deleteIndustry(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }

  removeRatingRange(id) {
    this.spinner.show();
    this.ratingRangeService.deleteRatingRange(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }

  // removeTemplate(id) {
  //   this.templateService.deleteTemplate(id).subscribe(
    // data => {
    //   this.updatePage().then(() => {
    //     this.spinner.hide();
    //     this.notification.showSuccess('Item Removed', 'Success');
    //   });

    // },
    // error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
  //   );
  // }

  removeEmoji(id) {
    this.spinner.show();
    this.emojiService.deleteEmoji(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }


  removeQuestion(id) {
    this.spinner.show();
    this.questionService.deleteQuestion(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }

  removeResponse(id) {
    this.spinner.show();
    this.resposeService.deleteResponse(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }

  removeSolution(id) {
    this.spinner.show();
    this.possibleSolutionService.deletePossibleSolution(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }

  removeReward(id) {
    this.spinner.show();
    this.rewardService.deleteReward(id).subscribe(
      data => {
        this.updatePage().then(() => {
          this.spinner.hide();
          this.notification.showSuccess('Item Removed', 'Success');
        });

      },
      error => {this.spinner.hide(); this.notification.showError('Coud not remove item', 'Failed'); }
    );
  }

}// end of class
