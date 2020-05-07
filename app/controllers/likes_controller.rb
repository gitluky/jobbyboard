class LikesController < ApplicationController

  before_action :get_like, only: [:update, :destroy]

  def create
    post = Post.find_by(id: like_params[:post_id])
    like = post.likes.find_or_create_by(like_params)
    render json: {notifications: ['Liked!']}
  end

  def destroy
    @like.destroy
    likes = current_user.likes
    render json: {notifications: ['Unliked!']}
  end

  private

  def get_like
    @like = Like.find_by(user_id: like_params[:user_id], post_id: like_params[:post_id])
  end

  def like_params
    params.require(:like).permit(:id, :user_id, :post_id)
  end

end
