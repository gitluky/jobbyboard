class ApplicationController < ActionController::API
  # include ActionController::MimeResponds

  respond_to :json
  before_action :authenticate_user!, except: [:index]

  def index
    render json: { isSignedIn: user_signed_in? }
  end

end
