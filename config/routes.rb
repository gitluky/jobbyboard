Rails.application.routes.draw do

  root 'application#index'

  resources :posts, only: [:new, :create, :show, :edit, :update]
  get 'dashboard', to: 'posts#index'
  get 'posts/:id/activate', to: 'posts#activate'
  get 'posts/:id/deactivate', to: 'posts#deactivate'
  get 'posts/:id/cancel', to: 'posts#cancel'
  get 'search', to: 'posts#search'



  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get 'refresh_session', to: 'users/sessions#refresh_session'
  end

  get 'users/:id', to: 'users#show'

end
