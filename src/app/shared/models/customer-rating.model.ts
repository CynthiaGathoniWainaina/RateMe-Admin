
export class CustomerRatingModel {
  _id: String;
  userProfileId: String;
  orgProfileId: String;
  questionId: String;
  responseId: String;
  possibleSolutionId: String;
  ratingNumber: Number;
  RatingState: String;
  createdAt: Date;
  updatedAt: Date;
}
