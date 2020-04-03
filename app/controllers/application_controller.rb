class ApplicationController < ActionController::API
  include ActionController::Cookies
  include AuthenticationHelpers

  respond_to :json
  # before_action :authenticate_user!, except: [:index]

  def index
    binding.pry
    if current_user
      search_location = current_user.location
    else
      search_location = 'New York, NY'
    end
    distance = 25
    posts = Post.near(search_location, distance)
    render json: PostSerializer.new(posts, params: {search_location: search_location, distance: distance})
  end

end
