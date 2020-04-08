class ApplicationController < ActionController::API
  include ActionController::Cookies
  include AuthenticationHelpers

  respond_to :json
  # before_action :authenticate_user!, except: [:index]

  def index
    if !!location_param[:location]
      search_location = location_param[:location]
    else
      search_location = 'New York, NY'
    end
    distance = 25
    search = Post.near(search_location, distance)
    posts = search.select {|post| post.active?}
    render json: PostSerializer.new(posts, params: {search_location: search_location, distance: distance})
  end

  private

  def location_param
    params.permit(:location)
  end

end
