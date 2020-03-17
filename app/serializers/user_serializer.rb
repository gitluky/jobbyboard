class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :name, :email, :avatar_url, :active_posts, :inactive_posts, :errors

end
