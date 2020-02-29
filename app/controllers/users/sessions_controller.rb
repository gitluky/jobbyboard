# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include ActionController::Cookies
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    if sign_in(resource_name, resource)
      generate_refresh_token
    end
    # yield resource if block_given?
    respond_with resource
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def refresh_session
    if !!cookies.signed[:rt]
      refresh_token = JWT.decode(cookies.signed[:rt], ENV['DEVISE_JWT_SECRET_KEY'], 'HS256')[0]
      if refresh_token['exp'] > Time.now.to_i
        self.resource = User.find_by(id: refresh_token['id'] )
        if resource.rti == refresh_token['rti'] && resource.jti == refresh_token['jti']
          if sign_in(resource_name, resource)
            generate_refresh_token
          end
        end
      end
    else
      self.resource == { loginRequired: true }
    end
    respond_with resource
  end

  private

  def generate_refresh_token
    rti = SecureRandom.uuid
    current_user.update(rti: rti)
    refresh_token = JWT.encode({ id: current_user.id, rti: rti, iat: Time.now.to_i, exp: Time.now.to_i + 2592000, jti: current_user.jti }, ENV['DEVISE_JWT_SECRET_KEY'], 'HS256' )
    cookies.signed[:rt] = { value: refresh_token, expires: 1.month.from_now,  httponly: true }
  end

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end

end
