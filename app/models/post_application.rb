class PostApplication < ApplicationRecord
  belongs_to :user
  belongs_to :post

  def toggle_status(flag)
    self.update("#{flag}": !self[flag])
  end

end
