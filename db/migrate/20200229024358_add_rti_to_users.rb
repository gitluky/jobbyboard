class AddRtiToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :rti, :string, null: false
    add_index :users, :rti, unique: true
  end
end
