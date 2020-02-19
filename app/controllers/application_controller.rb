class ApplicationController < ActionController::API
  # include ActionController::MimeResponds

  respond_to :json
  before_action :authenticate_user!, except: [:index]

  def index
    posts = Post.near('New York, NY',50)
    render json: PostSerializer.new(posts), status: 200
  end

end
