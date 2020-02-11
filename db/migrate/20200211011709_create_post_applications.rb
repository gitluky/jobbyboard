class CreatePostApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :post_applications do |t|
      t.references :user
      t.references :post
      t.boolean :accepted
      t.boolean :confirmed

      t.timestamps
    end
  end
end
