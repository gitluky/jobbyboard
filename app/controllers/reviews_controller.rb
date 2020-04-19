class ReviewsController < ApplicationController

  before_action :set_review, only: [:update, :destroy]

  def create
    review = Review.new(review_params)
    if review.save
      render json: review
    else
      render json: { errors: review.errors }
    end
  end

  def update

  end

  def destroy

  end

  private

  def set_review
    @review = Review.find_by(reviewee_id: review_params[:reviewee_id], reviewer_id: review_params[:reviewer_id])
  end

  def review_params
    params.require(:review).permit(:rating, :title, :content, :reviewee_id, :reviewer_id)
  end
end
