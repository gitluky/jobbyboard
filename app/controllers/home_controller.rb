class HomeController < ApplicationController

  def dashboard
    render json: current_user
  end

end
