class UsersController < ApplicationController

  before_action :authenticate_user!, only: [:edit, :update]
  before_action :get_user

  def show
    if @user
      render json: UserSerializer.new(@user)
    else
      render json: { errors: 'User not found.'}, status: 404
    end
  end

  def update
    @user.update(user_params)
    render json: @user
  end

  private

  def get_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :city, :state, :password, :avatar)
  end
end
