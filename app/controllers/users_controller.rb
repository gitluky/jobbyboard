class UsersController < ApplicationController

  # before_action :authenticate_user!
  before_action :get_user, only: [:show]

  def show
    render json: UserSerializer.new(@user)
  end

  private

  def get_user
    @user = User.find_by(id: params[:id])
  end
end
