class CreateSpreeProductBases < ActiveRecord::Migration[6.1]
  def change
    create_table :spree_product_bases do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
