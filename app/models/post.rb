class Post < ApplicationRecord
  belongs_to :user
  has_many :post_applications
  has_many :applicants, through: :post_applications, source: :user
  has_many :assignments

  scope :created_by_user_with_status, -> (user, status) { joins(:assignments).where(assignments: {status: status}).find_by(user_id: user.id)}

  def self.active_posts
    self.where(active: true)
  end

  def toggle_status(flag)
    if (flag == 'cancelled' || flag == 'completed') && self.active?
      self.update("#{flag}": !self[flag], active: false)
    else
      self.update("#{flag}": !self[flag])
    end
  end

end
