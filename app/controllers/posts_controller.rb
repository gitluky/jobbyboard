class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :create]

  def index
    posts = current_user.posts
    render json: PostSerializer.new(posts)
  end

  def show

  end

  def create
    post = current_user.posts.create(post_params)
    render json: PostSerializer.new(post), status: 200
  end

  def update

  end

  def search
    posts = Post.find_by_query_params(params[:q], params[:location], params[:distance])
    render json: PostSerializer.new(posts)
  end

  def activate

  end

  def deactivate

  end

  def cancel

  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :city, :state, :start_datetime, :expiration_datetime, :payment)
  end

end
