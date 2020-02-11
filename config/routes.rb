Rails.application.routes.draw do

  root 'application#index'

  resources :posts, only: [:index, :new, :create, :show, :edit, :update]
  get 'posts/:id/activate', to: 'posts#activate'
  get 'posts/:id/deactivate', to: 'posts#deactivate'
  get 'posts/:id/cancel', to: 'posts#cancel'

  get 'users/:id', to: 'users#show'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

end
