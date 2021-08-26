class AddFirstLoginToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :first_login, :boolean, default: false
  end
end
