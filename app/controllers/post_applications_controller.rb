class PostApplicationsController < ApplicationController

  before_action :get_post_application, only: [:update, :destroy]

  def create
    post_application = PostApplication.create(post_application_params)
    render json: post_application
  end

  def update
    @post_application.update(post_application_params)
    if @post_application.status == 6
      @post_application.create_assignment()
    end
    render json: @post_application
  end

  def destroy
    @post_application.destroy
    post_applcations = current_user.post_applications
    render json: post_applications
  end

  private

  def get_post_applicaiton
    @post_application = PostApplication.find_by(id: params[:id])
  end

  def post_application_params
    params.require(:post_application).permit(:id, :applicant_id, :post_id, :status)
  end

end
