Rails.application.routes.draw do
  
  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
  }

  root 'application#index'
end
