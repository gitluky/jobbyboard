class ApplicationController < ActionController::API
  # include ActionController::MimeResponds

  respond_to :json
  before_action :authenticate_user!, except: [:index]

  def index
    search_location] = 'New York, NY'
    distance = 25
    posts = Post.near(search_location, distance)
    render json: PostSerializer.new(posts), status: 200
  end

end
