class ApplicationController < ActionController::API
  include ActionController::Cookies

  respond_to :json
  # before_action :authenticate_user!, except: [:index]



  def index
    search_location = 'New York, NY'
    distance = 25
    posts = Post.near(search_location, distance)
    render json: PostSerializer.new(posts, params: {search_location: search_location, distance: distance})
  end

end
