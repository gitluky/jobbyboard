class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.references :reviewer
      t.references :reviewee
      t.float :rating, precision: 2, scale: 1
      t.string :title
      t.text :content
      t.timestamps
    end
  end
end
