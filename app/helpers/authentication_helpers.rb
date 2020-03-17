module AuthenticationHelpers

  def generate_refresh_token(user)
    rti = SecureRandom.uuid
    user.update(rti: rti)
    refresh_token = JWT.encode({ id: user.id, rti: rti, iat: Time.now.to_i, exp: Time.now.to_i + 2592000, jti: user.jti }, ENV['DEVISE_JWT_SECRET_KEY'], 'HS256' )
    cookies.signed[:rt] = { value: refresh_token, expires: 1.month.from_now,  httponly: true }
  end

end
