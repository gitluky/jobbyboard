class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :create, :update]
  before_action :set_post, only: [:deactivate, :destroy, :update]

  def create
    post = current_user.posts.new(post_params)
    if post.save
      render json: {notifications: ['The post was successfully created.']}
    else
      render json: { errors: post.errors }
    end
  end

  def update
    if @post.update(post_params)
        render json: { notifications: ['The post was successfully updated.']}
    else
      render json: { errors: @post.errors }
    end
  end

  def search
    posts = Post.find_by_query_params(params[:q], params[:location], params[:distance])
    render json: PostSerializer.new(posts)
  end

  def deactivate
      @post.update(expiration_datetime: DateTime.now)
    render json: PostSerializer.new(@post)
  end

  def destroy
    @post.destroy
    render json: { notifications: ['The post has been deleted.']}
  end

  private

  def set_post
    @post = Post.find_by(id: post_params[:id])
  end

  def post_params
    params.require(:post).permit(:id, :title, :description, :city, :state, :start_datetime, :expiration_datetime, :payment)
  end

end
