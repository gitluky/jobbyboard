class PostsController < ApplicationController
  # before_action :authenticate_user!

  def index

  end

  def show

  end

  def new

  end

  def create

  end

  def edit

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

  end

end
