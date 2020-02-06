Rails.application.routes.draw do

  get 'users/show'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get 'users/:id', to: 'users#show'

  root 'application#index'
end
