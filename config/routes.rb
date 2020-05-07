Rails.application.routes.draw do

  resources :reviews, only: [:create]

  root 'application#index'

  resources :posts, only: [:create, :show, :edit, :update]

  post 'users/:id/review', to: 'reviews#create'
  post 'posts/:id/like', to: 'likes#create'
  delete 'posts/:id/unlike', to: 'likes#destroy'
  get 'dashboard', to: 'posts#index'
  get 'posts/:id/deactivate', to: 'posts#deactivate'
  delete 'posts/:id/delete', to: 'posts#destroy'
  get 'search', to: 'posts#search'



  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get 'refresh_session', to: 'users/sessions#refresh_session'
  end

  get 'users/:id', to: 'users#show'
  patch 'users/:id', to: 'users#update'
  post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'


end
