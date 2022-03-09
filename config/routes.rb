# frozen_string_literal: true

Spree::Core::Engine.routes.draw do
  # Add your extension routes here
  scope :admin do
    resources :product_bases, controller: "admin/product_bases", only: [:index, :new, :create, :show, :update, :destroy] 
  end
end
